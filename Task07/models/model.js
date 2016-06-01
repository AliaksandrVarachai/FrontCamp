var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/myapp');
var connection = require('../helpers/db');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);

var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now(),
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        //type: Buffer
        type: String
    },
    text: {
        type: String
    }
});

blogSchema.plugin(autoIncrement.plugin, 'Article');

var mongooseModel = mongoose.model('Article', blogSchema);

//mongooseModel.methods.findByMe = function (cb) {
//    mongooseModel.find({author: 'xxx'}, cb);
//};

module.exports = mongooseModel;