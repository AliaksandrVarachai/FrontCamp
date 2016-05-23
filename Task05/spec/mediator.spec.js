let constants = require("../src/scripts/constants");
let model = require("../src/scripts/model")
let mediator = require("../src/scripts/mediator")

describe("Mediator test", function() {

    beforeEach(function(){
        spyOn(model, "requestInfoArray");
        spyOn(model, "requestInfoArrayFast");
        spyOn(model, "isInfoArrayNextLoaded");
    });

    it("api methods are defined", function() {
        expect(mediator.newsPiece).toBeDefined();
        expect(mediator.infoArrayObserver).toBeDefined();
        expect(mediator.infoArrayNextObserver).toBeDefined();
        expect(mediator.getInfoArray).toBeDefined();
        expect(mediator.isInfoArrayNextLoaded).toBeDefined();
        expect(mediator.requestInfoArray).toBeDefined();
    });

    it("isInfoArrayNextLoaded", function() {
        mediator.isInfoArrayNextLoaded();
        expect(model.isInfoArrayNextLoaded).toBeDefined();
    });

    it("requestInfoArray for ordinary news", function() {
        constants.current_news_type = constants.NEWS_TYPES.ordinary;
        mediator.requestInfoArray();
        expect(model.requestInfoArray).toHaveBeenCalled();
    });

    it("requestInfoArray for fast news", function() {
        constants.current_news_type = constants.NEWS_TYPES.fast;
        mediator.requestInfoArray();
        expect(model.requestInfoArrayFast).toHaveBeenCalled();
    });

});