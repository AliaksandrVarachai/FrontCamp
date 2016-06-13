var express = require('express');
var router = express.Router();
var model = require('../models/model');

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express', name: 'Alex' });
    model.find({}, function (err, data) {
        if (err) res.send(err);
        res.render('all-articles', { articles: data });
    });
});

router.get('/new-article', function(req, res, next) {
  res.render('new-article', {name: "Alex"});
});

//router.get('/all-articles', function(req, res, next) {
//  res.render('all-articles', {name: "Alex"});
//});

module.exports = router;
