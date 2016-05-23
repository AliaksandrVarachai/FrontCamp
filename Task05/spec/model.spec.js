let constants;
let events;
let model;
let infoArray = [];
let infoArrayNext = [];

let infoArrayPromise = new Promise(function(resolve, reject) {
    resolve(infoArray);
});

let infoArrayNextPromise = new Promise(function(resolve, reject) {
    resolve(infoArrayNext);
});

describe("Model test", function() {

    describe("Ordinary news type test", function() {

        beforeAll(function() {
            constants = require("../src/scripts/constants");
            events = require("../src/scripts/events");
            constants.current_news_type = constants.NEWS_TYPES.ordinary;
            model = require("../src/scripts/model");
        });

        beforeEach(function() {
            spyOn(window, "fetch").and.returnValue(infoArrayPromise);
            spyOn(model.infoArrayObserver, "subscribe");
            spyOn(model.infoArrayObserver, "unsubscribe");
            spyOn(model.infoArrayObserver, "notify");
        })

        it("api should be defined", function() {
            expect(model.newsPiece).toBeDefined();
            expect(model.infoArrayObserver).toBeDefined();
            expect(model.getInfoArray).toBeDefined();
            expect(model.requestInfoArray).toBeDefined();
        });

        it("request new infoArray", function(done) {
            model.requestInfoArray();
            expect(window.fetch).toHaveBeenCalled();
            infoArrayPromise.then(function(response) {
                expect(response).toBe(infoArray);
                done();
            });
        });

    });

    describe("Fast news type test", function() {

        beforeAll(function() {
            constants = require("../src/scripts/constants");
            events = require("../src/scripts/events");
            constants.current_news_type = constants.NEWS_TYPES.fast;
            delete require.cache[require.resolve('../src/scripts/model')]; 
            model = require("../src/scripts/model");
        });

        beforeEach(function() {
            let callsCounter = 0;
            spyOn(window, "fetch").and.callFake(function(someUrl){
                callsCounter++;
                if (callsCounter === 1) {
                    return infoArrayPromise;
                } else {
                    return infoArrayNextPromise;
                }
            });
            spyOn(model.infoArrayObserver, "subscribe");
            spyOn(model.infoArrayObserver, "unsubscribe");
            spyOn(model.infoArrayObserver, "notify");
        });

        it("api should be defined", function() {
            expect(model.newsPiece).toBeDefined();
            expect(model.infoArrayObserver).toBeDefined();
            expect(model.infoArrayNextObserver).toBeDefined();
            expect(model.getInfoArray).toBeDefined();
            expect(model.requestInfoArrayFast).toBeDefined();
            expect(model.isInfoArrayNextLoaded).toBeDefined();
        });

        it("request new infoArray 1-st time", function(done) {
            model.requestInfoArrayFast();
            expect(window.fetch.calls.count()).toEqual(2);
            infoArrayPromise.then(function(response) {
                expect(response).toBe(infoArray);
                done();
                expect(model.infoArrayObserver.subscribe).not.toHaveBeenCalled();
                expect(model.infoArrayObserver.unsubscribe).not.toHaveBeenCalled();
                expect(model.infoArrayObserver.notify).toHaveBeenCalled();
            });
            infoArrayNextPromise.then(function(response) {
                expect(response).toBe(infoArrayNext);
                done();
            });
        });


        describe("Request new infoArray 2 times", function() {

            beforeEach(function(done) {
                model.requestInfoArrayFast();
                infoArrayNextPromise.then(function(response) {
                    done();
                });
            });

            it("calls fetch once in 2-nd time", function(done) {
                window.fetch.calls.reset();
                model.requestInfoArrayFast();
                infoArrayNextPromise.then(function(response) {
                    expect(window.fetch.calls.count()).toEqual(1);
                    expect(response).toBe(infoArrayNext);
                    done();
                    expect(model.infoArrayObserver.subscribe).not.toHaveBeenCalled();
                    expect(model.infoArrayObserver.unsubscribe).not.toHaveBeenCalled();
                    expect(model.infoArrayObserver.notify).toHaveBeenCalled();
                });
            });
        });

    });

})


