var express = require('express');
var router = express.Router();
var redis = require('redis');
var redisClient = redis.createClient();
var bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.post('/', function (req, res, next) {
    var setsMembers = req.body['redis-sets-value[]'];

    var error = "";
    if(!setsMembers){
        error = "Invalid Key or Members";
    }

    redisClient.saddAsync(setsMembers).then(function (result) {
        return redisClient.saddAsync("redisSets", setsMembers[0]);
    }).then(function (result) {
        res.redirect('/redis/sets?error=' + (error ? error : ""));
    });
});

router.get('/', function (req, res, next) {

    let key = false;
    if(req.query.key){
        key = req.query.key;
    }

    redisClient.smembersAsync('redisSets').then(function (result) {
        var arr = {};

        bluebird.each(result, function (element) {
            return redisClient.smembersAsync(element).then(function (values) {
                console.log("saini");
                arr[element] = values;
            });
        }).then(function (allItems) {
            console.log("varnit");
            res.render('views/redisSets', {redisSets: true, data: arr, key: key, values: arr[key] ? arr[key] : false});
        });
    });
});

module.exports = router;
