var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var model = require('../models/model');
var multer  = require('multer');
var upload = multer({ dest: './public/uploads' });

var articleCtrl = require('../controllers/articles-ctrl');

//router.post('/add', function(req, res, next) {
router.post('/add', upload.single('file'), function(req, res, next) {
    articleCtrl.upload(req, res, next);
});

router.get('/all', function(req, res, next) {
    model.find({}, function (err, data) {
        if (err) res.send(err);
        res.render('all-articles', { articles: data });
    });
});

router.get('/:id', function(req, res, next) {
    model.findById(req.params.id, function (err, data) {
        if (err) res.send(err);
        console.log(data);
        res.render('one-article', { article: data });
    });
});



module.exports = router;

