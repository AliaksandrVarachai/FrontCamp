let model = require("./model");
let article = document.getElementById("article");
let articleSection = document.getElementById("section");
let currentInfoIndex;
//variables initialized by Controller
let infoIdMap;
let sectionGenerator;
let newsPiece;
let json;  //Promise of json.result

let infoIdMap = new Map(); //keys: id in html; values: name in request

infoIdMap["info-section-text"] = "section";
infoIdMap["info-abstract-text"] = "abstract";
infoIdMap["info-subsection-text"] = "subsection";
infoIdMap["info-published-date-text"] = "published_date";
infoIdMap["info-byline-text"] = "byline";


/**
 * creates and returns new tags which contains enumerated hrefs
 * @param  {array} listOfItems
 * @param  {string} id
 * @param  {string} class
 * @param  {string} infoIndex contains index of article for selection and gettin info about it
 * @return {HTMLelement}
 */
function getNewLinksHTMLTag(listOfItems, id="list-of-articles", className="list-of-articles", infoIndex="info-index") {
    let listOfArticles = document.getElementById(id);
    if (listOfArticles) {
        listOfArticles.parentNode.removeChild(listOfArticles);
    }
    let content = document.createElement("section");
    content.id = id;
    content.className = className;
    let ul = document.createElement("ul");
    let li, a;
    for (let i = 0; i < listOfItems.length; i++) {
        let item = listOfItems[i];
        li = document.createElement("li");
        a = document.createElement('a');
        a.className = "article-item";
        a.setAttribute(infoIndex, i);
        a.href = item.url;
        a.innerHTML = item.title;
        a.target = "_blank";
        li.appendChild(a);
        ul.appendChild(li);
    }
    content.appendChild(ul);
    return content;
}

//accepts info from controller about model
function initialize(_infoIdMap, _sectionGenerator, _newsPiece) {
    infoIdMap = _infoIdMap;
    sectionGenerator = _sectionGenerator;
    newsPiece = _newsPiece;
}

//TODO: devide on controller & view
function showRequestResults(json) {
    document.getElementById("info-main-section-text").innerHTML = newsPiece.section;
    //infoArray = [];
    currentInfoIndex = -1;
    json.then(
        json => {
            document.getElementById("article").appendChild(getNewLinksHTMLTag(json.results));
            //TODO: move to controller
            //infoArray = json.results;
        }
    )
}

let nav = document.getElementById("nav");


***************************************************

//will be called when infoArray is updated
model.events.infoArrayUpdated.subscribe(function() {
    document.getElementById("info-main-section-text").innerHTML = newsPiece.section;
    currentInfoIndex = -1;
    document.getElementById("article").appendChild(getNewLinksHTMLTag(model.getInfoArray()));
    for (let key of infoIdMap.keys()) {
        document.getElementById(key).innerHTML = "";
    }
});

//will be called when sectiona was changed
model.events.sectionUpdated.subscribe(function() {
    document.getElementById("info-main-section-text").innerHTML = newsPiece.section;
});

nav.addEventListener("click", function(e) {
    newsPiece.section = model.getNextSection().value; //changes seciton
    model.setRequestResultsAndNotify(newsPiece.responseJSON); //make a request for a new section
});


model.events.highlightNews.subscribe(function(event) {
    json.then(json => {
        if (event.target.className == "article-item") {
            if (currentInfoIndex > -1) {
                let domElements = document.querySelectorAll("[info-index='" + currentInfoIndex + "']");
                for (let i = 0; i < domElements.length; i++) {
                    domElements[i].classList.remove("selected");
                }
            }
            currentInfoIndex = event.target.getAttribute("info-index");
            event.target.classList.add("selected");
            for (let key of infoIdMap.keys()) {
                if (infoIdMap.get(key)) {
                    document.getElementById(key).innerHTML = infoArray[currentInfoIndex][infoIdMap.get(key)];
                } else {
                    document.getElementById(key).innerHTML = "no";
                }
            }
        }
    });
});







model.events.nextSection.subscribe(function() {
    let sectionGenerated = sectionGenerator.next(); //initialized by controller
    if (sectionGenerated.done) {
        sectionGenerator = SectionGenerator();
        sectionGenerated = sectionGenerator.next();
    }
    model.events.sectionUpdated.notify();


    newsPiece.section = sectionGenerated.value;
    for (let key of infoIdMap.keys()) {
        document.getElementById(key).innerHTML = "";
    }
    json = newsPiece.responseJSON;
    showRequestResults(json);
});

model.events.highlightNews.subscribe(function(event) {
    json.then(json => {
        if (event.target.className == "article-item") {
            if (currentInfoIndex > -1) {
                let domElements = document.querySelectorAll("[info-index='" + currentInfoIndex + "']");
                for (let i = 0; i < domElements.length; i++) {
                    domElements[i].classList.remove("selected");
                }
            }
            currentInfoIndex = event.target.getAttribute("info-index");
            event.target.classList.add("selected");
            for (let key of infoIdMap.keys()) {
                if (infoIdMap.get(key)) {
                    document.getElementById(key).innerHTML = infoArray[currentInfoIndex][infoIdMap.get(key)];
                } else {
                    document.getElementById(key).innerHTML = "no";
                }
            }
        }
    });
});





nav.addEventListener("click", function() {
    let sectionGenerated = sectionGenerator.next(); //initialized by controller
    // if (sectionGenerated.done) {
    //     sectionGenerator = SectionGenerator();
    //     sectionGenerated = sectionGenerator.next();
    // }
    newsPiece.section = sectionGenerated.value;
    for (let key of infoIdMap.keys()) {
        document.getElementById(key).innerHTML = "";
    }
    json = newsPiece.responseJSON;
    initilize();
});

//show the info about a current article
article.addEventListener("mouseover", function(event) {
    json.then(json => {
        if (event.target.className == "article-item") {
            if (currentInfoIndex > -1) {
                let domElements = document.querySelectorAll("[info-index='" + currentInfoIndex + "']");
                for (let i = 0; i < domElements.length; i++) {
                    domElements[i].classList.remove("selected");
                }
            }
            currentInfoIndex = event.target.getAttribute("info-index");
            event.target.classList.add("selected");
            for (let key of infoIdMap.keys()) {
                if (infoIdMap.get(key)) {
                    document.getElementById(key).innerHTML = infoArray[currentInfoIndex][infoIdMap.get(key)];
                } else {
                    document.getElementById(key).innerHTML = "no";
                }
            }
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {

    let firstNewsClickListener = function() {
        this.innerHTML = "Next section of news";
        this.removeEventListener("click", firstNewsClickListener);
        //path relatively of index.html
        require.ensure([], function(require) {
            let newsPiece = require("./news-piece");
        }, 'news-piece');
    };

    document.getElementById("nav-section-name").addEventListener("click", firstNewsClickListener);

});

export {
    initialize,
    getNewLinksHTMLTag,
    setRequestResults
}