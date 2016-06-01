var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/myapp');

module.exports = connection;