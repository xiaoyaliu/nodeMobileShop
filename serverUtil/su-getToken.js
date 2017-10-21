/**
 * Created with youde
 * company:优德医药网
 * author:caokui
 * date:17-3-23 下午4:28
 * description:
 */
var request = require('request');
var  qs = require('querystring');
var  Promise = require('promise');
var renderUtil = require('./su-util');

function getToken() {
    var reqUrl = 'https://api.weixin.qq.com/cgi-bin/token?';
    var params = {
        grant_type: 'client_credential',
        appid: renderUtil.wxconfig.appid,
        secret: renderUtil.wxconfig.appsecret
    };
    var options = {
        method: 'get',
        url: reqUrl+qs.stringify(params)
    };
    console.log(options.url);
    return new Promise(function(resolve, reject){
        request(options, function (err, res, body) {
            if (res) {
                console.log(body)
                resolve(body);
            } else {
                reject(err);
            }
        });
    });
}

module.exports = getToken;

