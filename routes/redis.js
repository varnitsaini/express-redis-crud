var express = require('express');
var router = express.Router();


router.get('/list', function (req, res, next) {

    res.render('home', {data: "this is list"});
});

router.get('/sorted-set', function (req, res, next) {

    res.render('home', {data: "this is sorted-set"});
});

module.exports = router;