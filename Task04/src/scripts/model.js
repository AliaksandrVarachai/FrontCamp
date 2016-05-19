let events = require("./events");
let infoArray; //contains info about articles

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

//loop of all sections
function* SectionGenerator(sections) {
    for (let i = 0; i <= sections.length; i++) {
        if (i === sections.length) {
            i = 0
        }
        yield sections[i];
    }
}

let sectionGenerator = SectionGenerator(sections);

class NewsPiece {
    constructor(responseFormat, apiKey) {
        this._responseFormat = responseFormat;
        this._apiKey = apiKey;
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
}

let newsPiece = new NewsPiece(responseFormat, apiKey);

function requestJSON(url) {
    return fetch(url)
        .then( response => response.json())
        .catch( ex => console.log("NYT error: wrong url or section", ex));
}

let infoArrayObserver = new events.Event();

function getInfoArray() {
    return infoArray;
}

function requestInfoArray() {
    newsPiece.section = sectionGenerator.next().value;
    requestJSON(newsPiece.url).then(
        json => {
            infoArray = json.results;
            infoArrayObserver.notify();
        }
    );
}

export {
    newsPiece,
    infoArrayObserver,
    getInfoArray,
    requestInfoArray,
};
