var Todo = require('../src/app.js');
var Helpers = require('../src/helpers.js');

describe('something', function() {
   var todo;

    beforeEach(() => {
        spyOn(Helpers, '$on');
        todo = new Todo("This is test name");
    });

    it("smth", function() {
        expect(todo.storage).toBeDefined();
        expect(todo.model).toBeDefined();
        expect(todo.template).toBeDefined();
    });




});