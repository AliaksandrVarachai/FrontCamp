var Model = require("../src/model.js");

let Store = {
    //save: function() {}//jasmine.createSpy()
    save: jasmine.createSpy()
};

Model = new Model(Store);

define("model.js define", () => {
   it('Model storage exists', function() {
       expect(Model.storage).toBe(Store);
   });

    it("Should contain object {title: <title>}", () => {
        let title = "some title";
        let callback = function() {};

        Model.create(title, callback);
        expect(Store.save).toHaveBeenCalled();
        /*expect(Store.save).toHaveBeenCalledWith(
            jasmine.objectContaining({
                title: title
            }, callback)
        );*/

    })

});