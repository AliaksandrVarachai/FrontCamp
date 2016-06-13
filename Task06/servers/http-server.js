var http = require("http");

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/blog';
var requestCode = { //should be sync with client script
    ALL_ARTICLES: 0,
    ALL_AUTHOR_ARTICLES: 1,
    LAST_ARTICLE: 2,
    ADD_ARTICLE: 3,
    ARTICLE_ID: 4,
    DELETE_ARTICLE_ID: 5
};

//inserts element into a sorted by ascending array (equal values ignored)
function insertIntoSortedArray(arr, element) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        if (element <= arr[i]) {
            if (arr < arr[i]) {
                arr.splice(i, 0, element);
            }
            break;
        }
    }
    if (len === arr.length) {
        arr.push(element);
    }
}

//return array of authors' ID
function getAuthorIDs(articles) {
    var author_ids = [];
    articles.forEach(function(article) {
        insertIntoSortedArray(author_ids, article.author_id);
    });
    return author_ids;
}

function addAuthorNames(articles, authors) {
   articles.forEach(function(article) {
       var author = authors.find(function(author) {
           return author._id === article.author_id;
       });
       article.authorName = author.name;
   });
}

//adds to response articles with given criteria:
// * findOptions - object for finding in authors DB, optional, e.g. {'author': 'Name'}
// * sortOptions - object for finding in authors DB, optional, e.g. {'data': 1}
// * limitNumber - limit of documents added to response, optionsl, default 0 -> all documents
function requestAllArticles(request, response, db, findOptions, sortOptions, limitNumber) {

    var articlesCollection = db.collection('articles');
    if (typeof limitNumber === 'undefined') {
        limitNumber = 0;
    }

    function requestAuthors(articles) {
        var authorsCollection = db.collection('authors');
        authorsCollection.find({"_id": {"$in": getAuthorIDs(articles)}}).toArray(function(err, authors) {
            if (err) {
                console.log(err);
            } else if (authors.length) {
                addAuthorNames(articles, authors);
                response.write(JSON.stringify(articles));
                response.end();
            } else {
                console.log('No authors found with defined criteria');
                response.end();
            }
            db.close();
        });
    }

    findOptions = findOptions || {};
    sortOptions = sortOptions || {};
    articlesCollection.find(findOptions).sort(sortOptions).limit(limitNumber).toArray(function(err, articles) {
        if (err) {
            console.log(err);
        } else if (articles.length) {
            requestAuthors(articles);
        } else {
            console.log('No articles found with defined criteria')
        }
    });
}

//adds to response articles with given criteria ONLY for author from request parameter:
// * findOptions - object for finding in authors DB, optional, e.g. {'author': 'Name'}
// * sortOptions - object for finding in authors DB, optional, e.g. {'data': 1}
function requestAllArticlesByAuthor(request, response, db, findOptions, sortOptions) {

    var authorName = request.headers['author-name'];
    var authorsCollection = db.collection('authors');

    findOptions = findOptions || {};
    sortOptions = sortOptions || {};
    authorsCollection.findOne({'name': authorName}, function(err, author) {
        if (err) {
            console.log("Error of finding of author");
        } else if (author) {
            var articlesCollection = db.collection('articles');
            Object.assign(findOptions, {'author_id': author._id});
            articlesCollection.find(findOptions).sort(sortOptions).toArray(function(err, articles) {
                if (err) {
                    console.log("Error in founding articles of author '" + authorName + "'");
                } else if (articles.length) {
                    response.write(JSON.stringify(articles));
                    response.end();
                } else {
                    console.log("No articles is found for author '" + authorName + "'");
                    response.end();
                }
                db.close();
            });
        } else {
            console.log("No author with name '" + authorName + "'");
        }
    });
}

function requestAddNewArticle(request, response, db) {
    var body = [];
    request.on('data', function(chunk) {
        body.push(chunk);
    });
    request.on('end', function() {
        body = Buffer.concat(body).toString();
        var newArticle = JSON.parse(body);
        //try to find author in authors collection
        var authorsCollection = db.collection('authors');
        var articlesCollection = db.collection('articles');
        authorsCollection.findOne({'name': newArticle.author}, function(err, author) {
            if (err) {
                console.log('Error in request to authors collection');
            } else if (author) {
                //author is found
                articlesCollection.aggregate([{$group: {
                    _id: "",
                    maxID: {$max: "$_id"}
                }}], function(err, docWithMaxID) {
                    if (err) {
                        console.log("Error: cannot find the max ID in collection '" + collection +   "'");
                    } else if (docWithMaxID) {
                        nextID = docWithMaxID[0].maxID + 1;
                        articlesCollection.insertOne({
                            '_id': nextID,
                            'author_id': +author._id,
                            'title': newArticle.title,
                            'text': newArticle.text,
                            'date': new Date()
                        }, function(err, result) {
                            if (err) {
                                console.log('Error: cannot insert article to collection');
                            } else {
                                response.write('New article is added successfully')
                                console.log('New article is added successfully');
                            }
                            response.end();
                        });
                    } else {
                        console.log("Max ID for authors collection is not found");
                    }
                });
            } else {
                //author is NOT found
                authorsCollection.aggregate([{$group: {
                    _id: "",
                    maxID: {$max: "$_id"}
                }}], function(err, authorWithMaxID) {
                    if (err) {
                        console.log("Error: cannot find the max ID in collection '" + collection +   "'");
                    } else if (authorWithMaxID) {
                        var nextAuthorID = authorWithMaxID[0].maxID + 1;
                        authorsCollection.insertOne({
                            '_id': nextAuthorID,
                            'name': newArticle.author
                        }, function(err, result) {
                            if (err) {
                                console.log('Error: cannot insert article to collection');
                            } else {
                                articlesCollection.aggregate([{$group: {
                                    _id: "",
                                    maxID: {$max: "$_id"}
                                }}], function(err, articleWithMaxID) {
                                    var nextArticleID = articleWithMaxID[0].maxID + 1;
                                    articlesCollection.insertOne({
                                        '_id': nextArticleID,
                                        'author_id': nextAuthorID,
                                        'title': newArticle.title,
                                        'text': newArticle.text,
                                        'date': new Date()
                                    }, function(err, result) {
                                        if (err) {
                                            response.write('Error: cannot insert article to collection');
                                        } else {
                                            response.write('New article is added successfully')
                                        }
                                        response.write('New author and article are added successfully')
                                        response.end();
                                    });
                                });
                            }
                        });
                    } else {
                        console.log("Max ID for authors collection is not found");
                    }
                });
            }
        });
    });
}

function deleteArticle(request, response, db, articleID) {
    var articlesCollection = db.collection('articles');
    articlesCollection.deleteOne({_id: articleID}, function(err, result) {
        console.log({_id: articleID});
        if (err) {
            console.log("Error with deleting of an article");
        } else {
            console.log(result.deletedCount)
            response.write(JSON.stringify(result));
        }
        response.end();
    });
}


var server = http.createServer(function(request, response) {

    if (request.method === 'OPTIONS') {
        var accessControlRequestHeaders = request.headers['access-control-request-headers'];
        if (accessControlRequestHeaders) {
            response.writeHead(204, {
                "Access-Control-Allow-Headers": accessControlRequestHeaders,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
            });
        } else {
            console.log("OPTIONS method must have an 'access-control-request-headers' header");
        }
        response.end();

    } else { //POST method

        response.writeHead(200, {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
        });

        MongoClient.connect(url, function (err, db) {
            var requestType = +request.headers['mongodb-request-type'];
            var articleID;
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                console.log('Connection established to ', url);
                switch (requestType) {
                    case requestCode.ALL_ARTICLES:
                        requestAllArticles(request, response, db, {}, {'date': 1});
                        break;
                    case requestCode.ALL_AUTHOR_ARTICLES:
                        requestAllArticlesByAuthor(request, response, db, {}, {'date': 1});
                        break;
                    case requestCode.LAST_ARTICLE:
                        requestAllArticles(request, response, db, {}, {'date': -1}, 1);
                        break;
                    case requestCode.ADD_ARTICLE:
                        requestAddNewArticle(request, response, db);
                        break;
                    case requestCode.ARTICLE_ID:
                        articleID = +request.headers['article-id'];
                        requestAllArticles(request, response, db, {'_id': articleID});
                        break;
                    case requestCode.DELETE_ARTICLE_ID:
                        articleID = +request.headers['article-id'];
                        console.log("articleID = " + articleID)
                        deleteArticle(request, response, db, articleID);
                        break;
                    default:
                        console.log("Request type can't be recognized");
                }
            }
        });
    }
});

server.listen(80);
console.log("Server is listening port 80...");
