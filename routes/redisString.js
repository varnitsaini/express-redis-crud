var express = require('express');
var router = express.Router();
var redis = require('redis');
var redisclient = redis.createClient();
var bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.post('/', function (req, res, next) {

    var stringKey = req.body['redis-string-key'];
    var stringValue = req.body['redis-string-value'];

    var error = "";
    if(!stringKey || !stringValue){
        error = "Invalid key or value."
    }else{
        redisclient.set(stringKey, stringValue, function (err, success) {
            if(err){
                error = err;
            }
            redisclient.get("all", function (err, data) {
                var newData;
                if(data){
                    newData = data + "|" + stringKey;
                }else{
                    newData = data;
                }
                redisclient.set('all', newData, function (err, success) {
                });
            });
        });
    }

    res.redirect('/redis/string?error=' + (error ? error : ""));
});

router.get('/', function (req, res, next) {

    let key = false;
    let value = false;
    let error = false;
    if(req.query.key && req.query.value){
        key = req.query.key;
        value = req.query.value;
    }

    if(req.query.error){
        error = req.query.error;
    }

    redisclient.getAsync('all').then(function (data) {
        var keys = data.split("|");
        return redisclient.mgetAsync(keys).then(function (result) {
            var arr = {};
            for(let i=0;i<result.length;i++){
                if(!result[i]){
                    continue;
                }
                arr[keys[i]] = result[i];
            }
            return arr;
        });
    }).then(function (result) {
        res.render('views/redisString', {data: result, key: key, value: value, error:error});
    });
});





module.exports = router;
