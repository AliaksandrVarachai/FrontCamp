//let model = require("./model");
let constants = require("./constants");
let mediator = require("./mediator");
let view = require("./view");

document.addEventListener("DOMContentLoaded", function() {

    let firstNewsClickListener = function() {
        view.navSectionName.innerHTML = "Next section of news";
        this.removeEventListener("click", firstNewsClickListener);
        mediator.requestInfoArray();
        this.addEventListener("click", function() {
            if (mediator.isInfoArrayNextLoaded()) {
                mediator.requestInfoArray();
            } else {
                if (constants.debug_mode) {
                    console.log("Do not click so fast!");
                }
            }
            
        });
    };

    view.nav.addEventListener("click", firstNewsClickListener);

});

//export {}



