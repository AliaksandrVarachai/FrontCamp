var select = document.getElementById("select-find");
select.selectedIndex = -1;
var addArticle = document.getElementById("add-article");
var responseContainer = document.getElementById("response-container");
var proxyServerURL = "http://127.0.0.1:80";
var selected = { //see select element on index.html
    ALL_ARTICLES: 0,
    ALL_AUTHOR_ARTICLES: 1,
    LAST_ARTICLE: 2
};
var requestCode = { //should be sync with http-server
    ALL_ARTICLES: 0,
    ALL_AUTHOR_ARTICLES: 1,
    LAST_ARTICLE: 2,
    ADD_ARTICLE: 3,
    ARTICLE_ID: 4,
    DELETE_ARTICLE_ID: 5
};
var responseContainer = document.getElementById('response-container');

//parses some of fields, for example date, argument is an array
function processArticles(articles) {
    articles.forEach(function (article) {
        var date = new Date(article.date);
        var year = date.getFullYear();
        var month = date.getMonth();
        var ddate = date.getDate();
        var hours = date.getHours();
        var formattedHours = hours > 9 ? hours : '0' + hours;
        var minutes = date.getMinutes();
        var formattedMinutes = minutes > 9 ? minutes : '0' + minutes;
        article.formattedDate = ddate + '.' + (month + 1) + '.' + year + "  " + formattedHours + ':' + formattedMinutes;
    });
}

document.onload = function() {
    responseContainer.innerHTML = Handlebars.templates['home']({articles: articles});
};

select.onchange = function() {
    var selectedIndex = select.selectedIndex;
    var articleRequest = new XMLHttpRequest();
    articleRequest.onreadystatechange = function() {
        if (articleRequest.readyState === XMLHttpRequest.DONE) {
            var articles, article;
            //articleRequest.open("POST", proxyServerURL, true);
            switch (selectedIndex) {
                case selected.ALL_ARTICLES:
                    articles = JSON.parse(articleRequest.responseText);
                    processArticles(articles);
                    responseContainer.innerHTML = Handlebars.templates['list-articles']({articles: articles});
                    break;
                case selected.ALL_AUTHOR_ARTICLES:
                    articles = JSON.parse(articleRequest.responseText);
                    processArticles(articles);
                    if (!articles.length) { select.selectedIndex = -1; }
                    responseContainer.innerHTML = Handlebars.templates['list-articles']({articles: articles});
                    break;
                case selected.LAST_ARTICLE:
                    article = JSON.parse(articleRequest.responseText)[0];
                    processArticles([article]);
                    responseContainer.innerHTML = Handlebars.templates['article'](article);
                    break;
                default:
                    console.log("Error: no such selectIndex");
            }
        }
    };
    articleRequest.open("POST", proxyServerURL, true);
    switch (selectedIndex) {
        case selected.ALL_ARTICLES:
            articleRequest.setRequestHeader("MongoDB-Request-Type", requestCode.ALL_ARTICLES);
            break;
        case selected.ALL_AUTHOR_ARTICLES:
            var authorName = document.getElementById("author-name").value;
            if (!authorName) {
                alert("You must type an author's name");
                select.selectedIndex = -1;
                return;
            }
            articleRequest.setRequestHeader("MongoDB-Request-Type", requestCode.ALL_AUTHOR_ARTICLES);
            articleRequest.setRequestHeader("Author-Name", authorName);
            break;
        case selected.LAST_ARTICLE:
            articleRequest.setRequestHeader("MongoDB-Request-Type", requestCode.LAST_ARTICLE);
            break;
        default:
            console.log("Error: no such selectIndex");
    }
    articleRequest.send(null);
};

addArticle.onclick = function() {
    select.selectedIndex = -1;
    responseContainer.innerHTML = Handlebars.templates["article-edit"]();
    var articleSave = document.getElementById("article-save");
    var articleDelete = document.getElementById("article-delete");
    var article = {};
    articleSave.onclick = function() {
        var inputTitle = document.getElementById("input-title");
        var inputAuthor = document.getElementById("input-author");
        var inputText = document.getElementById("input-text");
        article.title = inputTitle.value.trim();
        article.author = inputAuthor.value.trim();
        article.text = inputText.value.trim();
        if (!(article.title && article.author && article.text)) {
            alert("Fields: 'title', 'author', 'text' must be filled");
            return;
        }
        article.date = Date.now();
        var requestAddArticle = new XMLHttpRequest();
        requestAddArticle.onreadystatechange = function() {
            if (requestAddArticle.readyState === XMLHttpRequest.DONE) {
                console.log("The new document is added to database!");
                responseContainer.innerHTML = Handlebars.templates['home']({message: "The new document is added to database!"});
            }
        };
        requestAddArticle.open("POST", proxyServerURL, true);
        requestAddArticle.setRequestHeader("MongoDB-Request-Type", requestCode.ADD_ARTICLE);
        requestAddArticle.send(JSON.stringify(article)); //TODO stringify???
    };

};

responseContainer.onclick = function(event) {

    select.selectedIndex = -1;

    //show one article
    if (event.target.id.substr(0, 13) === "show-article-") {
        var articleId = +event.target.id.substring(13);
        var articleRequest = new XMLHttpRequest();
        articleRequest.onreadystatechange = function() {
            if (articleRequest.readyState === XMLHttpRequest.DONE) {
                var article = JSON.parse(articleRequest.responseText)[0];
                processArticles([article]);
                console.log(article)
                responseContainer.innerHTML = Handlebars.templates['article'](article);
            }
        };
        articleRequest.open("POST", proxyServerURL, true);
        articleRequest.setRequestHeader("MongoDB-Request-Type", requestCode.ARTICLE_ID);
        articleRequest.setRequestHeader("Article-Id", articleId);
        articleRequest.send(null);
    }

    //delete article
    if (event.target.id === "article-delete") {
        var articleId = +document.getElementsByTagName("article")[0].id.substring(8);
        console.log("articleId=" + articleId);
        var articleRequest = new XMLHttpRequest();
        articleRequest.onreadystatechange = function() {
            if (articleRequest.readyState === XMLHttpRequest.DONE) {
                responseContainer.innerHTML = Handlebars.templates['home']({message: "The article was deleted successfully!"});
            }
        };
        articleRequest.open("POST", proxyServerURL, true);
        articleRequest.setRequestHeader("MongoDB-Request-Type", requestCode.DELETE_ARTICLE_ID);
        articleRequest.setRequestHeader("Article-Id", articleId);
        articleRequest.send(null);
    }

};


