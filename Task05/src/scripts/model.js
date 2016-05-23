let constants = require("./constants");
let events = require("./events");
let infoArray; //contains info about articles
let infoArrayNext; //array to make the next loading faster
let firstLoad = true; //the 1st load flag
let isInfoArrayNextLoaded = false; //do not allow click when next data is not loaded;

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
    createUrl(section) {
        return `http://api.nytimes.com/svc/topstories/v1/${section}.${this._responseFormat}?api-key=${this._apiKey}`;
    }
    set section(section) {
        this._section = section;
        this._url = this.createUrl(section);
    }
    get section() {
        return this._section;
    }
    get url() {
        return this._url;
    }
}

class NewsPieceFast extends NewsPiece {
    set sectionNext(section) {
        this._sectionNext = section;
        this._urlNext = this.createUrl(section);
    }
    get sectionNext() {
        return this._sectionNext;
    }
    get urlNext() {
        return this._urlNext;
    }
}

let newsPieceFactory = {};

//type must be in constants.NEWS_TYPES
//args - object like {responseFormat: X, apiKey: Y}
newsPieceFactory.create = function(type, options) {
    //if (!type) { throw Error("type param of NewsPieceFactory must be a string"); }
    //if (!options || (typeof options != "object")) { throw Error("options param of NewsPieceFactory must be an object"); }
    //type = type.toLowerCase()
    switch (type) {
        case constants.NEWS_TYPES.ordinary: 
            return new NewsPiece(options.responseFormat, options.apiKey);
        case constants.NEWS_TYPES.fast: 
            return new NewsPieceFast(options.responseFormat, options.apiKey);
        default:
            console.log(type)
            throw Error("NewsPieceFactory: wrong type param");
    }
}

function requestJSON(url) {
    return fetch(url)
        .then( response => response.json())
        .catch( ex => console.log("NYT error: wrong url or section", ex));
}

let newsPiece = newsPieceFactory.create(constants.current_news_type, {responseFormat: responseFormat, apiKey: apiKey});

let infoArrayObserver = new events.Event();
let infoArrayNextObserver = new events.Event();

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

function requestInfoArrayFast() {
    if (firstLoad) {
        firstLoad = false;
        newsPiece.section = sectionGenerator.next().value;
        newsPiece.sectionNext = sectionGenerator.next().value;
        requestJSON(newsPiece.url).then(
            json => {
                infoArray = json.results;
                infoArrayObserver.notify();
            }
        );
        isInfoArrayNextLoaded = false;
        requestJSON(newsPiece.urlNext).then(
            json => {
                infoArrayNext = json.results;
                isInfoArrayNextLoaded = true;
                infoArrayNextObserver.notify();
            }
        );
    } else {
        newsPiece.section = newsPiece.sectionNext;
        newsPiece.sectionNext = sectionGenerator.next().value;
        infoArray = infoArrayNext;
        infoArrayObserver.notify();
        isInfoArrayNextLoaded = false;
        requestJSON(newsPiece.urlNext).then(
            json => {
                infoArrayNext = json.results;
                isInfoArrayNextLoaded = true;
                infoArrayNextObserver.notify();
            }
        );
    }
}

export {
    newsPiece,
    infoArrayObserver,
    infoArrayNextObserver,
    getInfoArray,
    requestInfoArray,
    requestInfoArrayFast,
    isInfoArrayNextLoaded,
};
