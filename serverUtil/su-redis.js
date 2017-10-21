/**
 * Created with youde
 * company:优德医药网
 * author:caokui
 * date:17-3-24 下午4:43
 * description:3306  6379
 */
var db = {};
var redis = require('redis');
var options = {
    host : '120.76.98.78',
    port : '6379',
    password:"YOUD@#HK23r2fds2fdvdff"
};


var client = redis.createClient(options);

client.on('ready',function(err){
    console.log('ready');
});

client.on("error", function (err) {
    console.log("Error :" , err);
});

client.on('connect', function(){
    console.log('Redis连接成功.');
});

/**
 * 添加string类型的数据
 * @param key 键
 * @params value 值
 * @params expire (过期时间,单位秒;可为空，为空表示不过期)
 * @param callBack(err,result)
 */
db.set = function(key, value, expire){
    client.set(key, value, function(err, result){
        if (err) {
            console.log(err);
            return;
        }
        if (!isNaN(expire) && expire > 0) {
            client.expire(key, parseInt(expire));
        }
    })
};

/**
 * 查询string类型的数据
 * @param key 键
 * @param callBack(err,result)
 */
db.get = function(key, callback){

    client.get(key, function(err,result){
        if (err) {
            console.log(err);
            callback(err,null);
            return;
        }

        callback(result);
    });
};



module.exports = db;