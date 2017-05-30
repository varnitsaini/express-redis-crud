var express = require('express');
var router = express.Router();
var redis = require('redis');
var redisClient = redis.createClient();
var bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.post('/', function (req, res, next) {

    var hashValues = req.body['redis-hash[]'];

    console.log(hashValues);
    var error = "";
    if(!hashValues){
        error = "Invalid fields";
    }else{
        redisClient.hmset(hashValues);
    }

    res.render('views/redisHash', {redisHash: true, error: error});
});

router.get('/', function (req, res, next) {

    res.render('views/redisHash', {redisHash: true});

})

module.exports = router;