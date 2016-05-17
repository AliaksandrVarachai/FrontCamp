let Event = require("./event");
let infoArray; //contains info about articles
let sectionGenerator; //generators of news sections

let events = {
    nextSection: new Event(),      //next section for Event is chosen
    highlightNews: new Event(),    //line with a piece of news is highlighted
    domContentLoaded: new Event(), //for any case
    infoArrayUpdated: new Event(), //json.then happened
    sectionUpdated: new Event(),   //section was changed (e.g. by user)
}

function getNextSection() {
    let nextSection = sectionGenerator();
    events.nextSection.notify();
    return nextSection;
}

// function nextSectionChosen() {
//     nextSection.notify();
//     return
// }

// function highlightNewsHappened() {
//     highlightNews.notify();
// }

// function domContentLoadedHappened() {
//     domContentLoaded.notify();
// }

/*function updateInfoArrayAndNotify(newInfoArray) {
    infoArray = newInfoArray;
    events.infoArrayUpdated.notify();
}*/

function getInfoArray() {
    return infoArray;
}

function initialize(sections) {
    sectionGenerator = SectionGenerator(sections);
}

function setRequestResultsAndNotify(json) {
    json.then(
        json => {
            infoArray = json.results;
            updateInfoArrayAndNotify(infoArray);
        }
    );
}

//loop of all sections
function* SectionGenerator(sections) {
    for (let i = 0; i <= sections.length; i++) {
        if (i === sections.length) {
            i = 0
        }
        yield sections[i];
    }
}

export {
    initialize,
    setRequestResultsAndNotify,
    sectionGenerator,
    events,
    updateInfoArrayAndNotify,
    getInfoArray,
    getNextSection,
};
