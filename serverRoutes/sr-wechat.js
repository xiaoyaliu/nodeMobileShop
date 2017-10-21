/**
 * Created with youde
 * company:优德医药网
 * author:caokui
 * date:17-3-23 下午5:26
 * description:http://www.tuicool.com/articles/aYvUbab
 */
var express = require('express');
var httpRequest = require('../serverUtil/su-request');
var sfFile = require('../serverUtil/su-file');
var router = express.Router();
var Promise = require('promise');
var cheerio = require('cheerio');
var renderUtil = require('../serverUtil/su-util');
var getJsApiData = require('../serverUtil/su-getJsApiData');



router.post('/wechat', function(req, res) {
    var clientUrl = req.body.url;
    getJsApiData(clientUrl,function(data){
        console.info(data);
        res.send({'signature': data[0], 'timestamp': data[1], 'nonceStr': data[2], 'appid':renderUtil.wxconfig.appid});
    });

});

module.exports = router;