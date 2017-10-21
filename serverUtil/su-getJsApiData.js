/**
 * Created with youde
 * company:优德医药网
 * author:caokui
 * date:17-3-23 下午5:21
 * description:
 */
var fs = require('./su-file');
var request = require('request');
var  Promise = require('promise');
var getToken = require('./su-getToken');
var db  = require('./su-redis');
var sha1 = require('sha1');
var co = require('co');
var uuid  = require('node-uuid');
var log4j = require('./su-log').logger;

function getJsApiTicket(callbakck){

    var result =  {};
    db.get("shopToken",function(datatoken){
        result.access_token=datatoken
        db.get("shopTicket",function(dataticket){
            result.ticket=dataticket;
            if(result.access_token!==null && result.ticket!==null){
                console.info(result);
                callbakck(result);
            }else{
                getToken().then(function (body) {
                    var tokenObj = JSON.parse(body);
                    var token = tokenObj.access_token;
                    log4j.info("shopToken============"+body);
                    console.info("shopToken============"+body);
                    var reqUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + token + '&type=jsapi';
                    var options = {
                        method: 'get',
                        url: reqUrl
                    };
                    request(options, function (err, res, ticketbody) {
                        if (res) {
                            var ticketObj = JSON.parse(ticketbody);
                            db.set("shopToken", tokenObj.access_token, tokenObj.expires_in);
                            db.set("shopTicket", ticketObj.ticket, ticketObj.expires_in);

                            log4j.info("shopTicket============"+ticketbody);
                            console.info("shopTicket============"+ticketbody);

                            callbakck(ticketObj);
                        } else {
                            callbakck(err);
                        }
                    });

                });
            }
        });
    });

}
//noncestr
function getNonceStr () {
    /* var text = "";
     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
     for(var i = 0; i < 16; i++) {
     text += possible.charAt(Math.floor(Math.random() * possible.length));
     };
     log4j.info("NonceStr============"+text);
     console.info("NonceStr============"+text);
     return text;*/

    return Math.random().toString(36).substr(2, 15);

}
//timestamp
function getTimestamp() {
    /*var time = String(new Date().valueOf());
     var timestamp=time.substr(0, time.length-3);
     log4j.info("timestamp============"+timestamp);
     console.info("timestamp============"+timestamp);
     return timestamp;*/
    return parseInt(new Date().getTime() / 1000) + '';

}

function getSign(jsApiTicket, noncestr, timestamp, url) {
    var sortData = "jsapi_ticket=" + jsApiTicket + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url=" + url;
    log4j.info("jsapi_ticket============"+sortData);
    console.info("jsapi_ticket============"+sortData);
    return sha1(sortData);

}

//返回数据分别为sign, timestamp, noncestr
function getJsApiData(clientUrl,wxback) {
    var noncestr = getNonceStr();
    var timestamp = getTimestamp();
    getJsApiTicket(function(data){
        var signature=getSign(data.ticket, noncestr, timestamp, clientUrl);
        wxback([signature, timestamp, noncestr]);
    });
}

module.exports = getJsApiData;