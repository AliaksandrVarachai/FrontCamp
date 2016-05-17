let article = document.getElementById("article");
let articleSection = document.getElementById("section");
let currentInfoIndex;


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

//TODO: devide on controller & view
function setRequestResults(json, section) {
    document.getElementById("info-main-section-text").innerHTML = section;
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

//switch to the next section
nav.addEventListener("click", function() {
    let sectionGenerated = sectionGenerator.next();
    if (sectionGenerated.done) {
        sectionGenerator = SectionGenerator();
        sectionGenerated = sectionGenerator.next();
    }
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
    initilize,
    getNewLinksHTMLTag
}