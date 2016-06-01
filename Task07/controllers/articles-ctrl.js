//var express = require('express');
//var router = express.Router();
var mongoose = require('mongoose');
var model = require('../models/model');
var multer  = require('multer');
var upload = multer({ dest: './public/uploads' });

var uploadFile = function(req, res, next) {
    var article = new model({
        title: req.body.title,
        text: req.body.text,
        //image: req.file.path + '.' + req.file.originalname.split('.').pop(),
        image:  req.file.path.replace('public', ''),
        author: "xxx"
    });
    article.save(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('meow');
            res.json(data);
            //res.json(article);
        }
    });
};

module.exports = {
    upload: uploadFile
};

