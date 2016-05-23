//interaction of outer objects with model
let constants = require("./constants");
let model = require("./model")

let newsPiece = model.newsPiece;
let infoArrayObserver = model.infoArrayObserver;
let infoArrayNextObserver = model.infoArrayNextObserver;
let getInfoArray = model.getInfoArray;

function isInfoArrayNextLoaded() {
    return model.isInfoArrayNextLoaded;
}


function requestInfoArray() {
    let firstLoad = true;
    switch (constants.current_news_type) {
    case constants.NEWS_TYPES.ordinary: 
        model.requestInfoArray();
        break;
    case constants.NEWS_TYPES.fast: 
        model.requestInfoArrayFast();
        break;
    default:
        throw Error("NewsPieceFactory: wrong type param");
    }
}

export {
    newsPiece,
    infoArrayObserver,
    infoArrayNextObserver,
    getInfoArray,
    isInfoArrayNextLoaded,
    requestInfoArray
}
