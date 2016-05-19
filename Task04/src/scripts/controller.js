let model = require("./model");
let view = require("./view");

document.addEventListener("DOMContentLoaded", function() {

    let firstNewsClickListener = function() {
        view.navSectionName.innerHTML = "Next section of news";
        this.removeEventListener("click", firstNewsClickListener);
        model.requestInfoArray();
        this.addEventListener("click", function() {
            model.requestInfoArray();
        });
    };

    view.nav.addEventListener("click", firstNewsClickListener);

});

//export {}



