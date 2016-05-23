let events = require("../src/scripts/events.js");

describe("Events test", function() {

    let event;
    let listener = function() {};

    beforeEach(function() {
        event = new events.Event()
        listener = jasmine.createSpy("listener");
    });

    it("function defined", function(){
        expect(event.subscribe).toBeDefined();
        expect(event.unsubscribe).toBeDefined();
        expect(event.notify).toBeDefined();
    });

    it("subscribe is called once", function() {
        event.subscribe(listener);
        event.subscribe(listener);
        event.notify();
        expect(listener.calls.count()).toEqual(1);
    });

    it("unsubscribe is called", function() {
        event.subscribe(listener);
        event.unsubscribe(listener);
        event.notify();
        expect(listener).not.toHaveBeenCalled();
    });

});