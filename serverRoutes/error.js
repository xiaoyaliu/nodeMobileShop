/**
 * Created with youde
 * company:郑州优德
 * author:caokui
 * date:16-3-11 上午11:49
 * description:
 */
var express = require('express');
var fs = require('fs');
var app=express();
var sfFile = require('../serverUtil/su-file');
var renderUtil = require('../serverUtil/su-util');
var log4j = require('../serverUtil/su-log');
var router = express.Router();
var Promise = require('promise');
var cheerio = require('cheerio');
var doT = require("dot");

router.get('*', function(req, res) {
    Promise.all([sfFile.read('html/404.html', 'utf8')]).then(onFulfilled,onRejected);
    function onFulfilled(files){
        var html = files[0];//主页面
        $ = cheerio.load(html,{decodeEntities: false});//页面dom结构
        res.set('Content-Type', 'text/html');
        res.send(new Buffer($.html()));
    };
    function onRejected(err){
        renderUtil.logger(err);
    };
});

module.exports = router;