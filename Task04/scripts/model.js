let infoArray; //contains info about articles
let sectionGenerator; //generators of news sections

function initialize(sections) {
    sectionGenerator = SectionGenerator(sections);
}

function setRequestResults(json) {
    json.then(
        json => {infoArray = json.results;}
    );
}

function* SectionGenerator(sections) {
    for (let i = 0; i < sections.length; i++) {
        yield sections[i];
    }
}

export {
    initialize,
    setRequestResults,
    sectionGenerator
};
