var express = require('express');
var router = express.Router();


router.get('/hash', function (req, res, next) {

    res.render('home', {data: "this is hash"});
});

router.get('/list', function (req, res, next) {

    res.render('home', {data: "this is list"});
});

router.get('/set', function (req, res, next) {

    res.render('home', {data: "this is set"});
});

router.get('/sorted-set', function (req, res, next) {

    res.render('home', {data: "this is sorted-set"});
});

router.get('/hash', function (req, res, next) {

    res.render('home', {data: "this is hash"});
});
module.exports = router;