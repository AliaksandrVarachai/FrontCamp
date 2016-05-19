let model = require("./model");
let article = document.getElementById("article");
let articleSection = document.getElementById("section");
let nav = document.getElementById("nav");
let navSectionName = document.getElementById("nav-section-name");
let currentInfoIndex;

let infoIdMap = new Map(); //keys: id in html; values: name in request
infoIdMap.set("info-section-text", "section");
infoIdMap.set("info-abstract-text", "abstract");
infoIdMap.set("info-subsection-text", "subsection");
infoIdMap.set("info-published-date-text", "published_date");
infoIdMap.set("info-byline-text", "byline");

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

function showArticleMetaInfo(infoIndex) {
    if (infoIndex > -1) {
        for (let key of infoIdMap.keys()) {
            document.getElementById(key).innerHTML = model.getInfoArray()[infoIndex][infoIdMap.get(key)];
        }
    } else {
        for (let key of infoIdMap.keys()) {
            document.getElementById(key).innerHTML = "";
        }
    }
}

function highlightArticle(target) {
    if (target.className == "article-item") {
        //remove a highlight of an old element
        if (currentInfoIndex > -1) {
            let domElements = document.querySelectorAll("[info-index='" + currentInfoIndex + "']");
            for (let i = 0; i < domElements.length; i++) {
                domElements[i].classList.remove("selected");
            }
        }
        //highlight a new element
        currentInfoIndex = target.getAttribute("info-index");
        target.classList.add("selected");
    }
}

//direct connection with model is only by subscribe, indirect is by controller
model.infoArrayObserver.subscribe(function() {
    document.getElementById("info-main-section-text").innerHTML = model.newsPiece.section;
    currentInfoIndex = -1;
    showArticleMetaInfo(currentInfoIndex);
    document.getElementById("article").appendChild(getNewLinksHTMLTag(model.getInfoArray()));
});

article.addEventListener("mouseover", function(event) {
    highlightArticle(event.target);
    showArticleMetaInfo(currentInfoIndex);
});

export {
    nav,
    navSectionName,
}