//Doesn't useed anymore

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/blog';

var findAllDocuments = function(db, callback) {
    var articles = db.collection('articles');
    //var authors = db.collection('authors');
    articles.find({}).toArray(function(err, docs) {
        console.log('Found the following records:');
        console.log(docs);
        callback(docs);
        console.log(2);
    });
    db.close();
};

MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to ', url);
        var articles = db.collection('articles');
        articles.find({}).toArray(function(err, docs) {
            if (err) {
                console.log(err);
            } else if (docs.length) {
                console.dir(docs);
            } else {
                console.log('No documents found with defined criteria')
            }
            db.close();
        });
    }

});





