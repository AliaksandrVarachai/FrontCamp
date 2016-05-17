let model = require("./model");
let view = require("./view");

const responseFormat = "json";
const apiKey = "883c9597c1166a747b0aae229fe79970:18:74940799";
const sections = [
    "home",
    "world",
    "national",
    "politics",
    "nyregion",
    "business",
    "opinion",
    "technology",
    "science",
    "health",
    "sports",
    "arts",
    "fashion",
    "dining",
    "travel",
    "magazine",
    "realestate"
];

let infoIdMap = new Map(); //keys: id in html; values: name in request

infoIdMap["info-section-text"] = "section";
infoIdMap["info-abstract-text"] = "abstract";
infoIdMap["info-subsection-text"] = "subsection";
infoIdMap["info-published-date-text"] = "published_date";
infoIdMap["info-byline-text"] = "byline";

class NewsPiece {
    constructor(responseFormat, apiKey, section) {
        this._responseFormat = responseFormat;
        this._apiKey = apiKey;
        this._section = section;
        this.createUrl();
    }
    createUrl() {
        this._url = `http://api.nytimes.com/svc/topstories/v1/${this._section}.${this._responseFormat}?api-key=${this._apiKey}`;
    }
    set section(section) {
        this._section = section;
        this.createUrl();
    }

    get section() {
        return this._section;
    }
    get url() {
        return this._url;
    }
    get responseJSON() {
        return fetch(this._url)
            .then( response => response.json())
            .catch( ex => console.log("NYT error: wrong url or section", ex));
    }
}

model.initialize(sections);
let newsPiece = new NewsPiece(responseFormat, apiKey, model.sectionGenerator.next().value); //implementation of a class
let json = newsPiece.responseJSON;
model.setRequestResults(json);
view.setRequestResults(json, newsPiece.section);


//let sectionGenerator = model.SectionGenerator();

**************************

//TODO: devide on controller & view
function initilize(json) {
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


export {
    newsPiece,
    json
}



