/**
 * author:zhouxiangbo
 */
var express = require('express');
var httpRequest = require('../serverUtil/su-request');
var sfFile = require('../serverUtil/su-file');
var router = express.Router();
var Promise = require('promise');
var cheerio = require('cheerio');
var renderUtil = require('../serverUtil/su-util');
var log4j = require('../serverUtil/su-log');


router.get('/shareState', function (req, res) {
        res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd4e8e98afd36f4fe&redirect_uri=http%3A%2F%2Fm.youde.com%2FguessActivity&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect');
});

module.exports = router;
