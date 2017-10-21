/**
 *company:优德医药网
 *author:caokui
 *data:2017/5/17.
 *summary:
 */
var express = require('express');
var httpRequest = require('../serverUtil/su-request');
var sfFile = require('../serverUtil/su-file');
var router = express.Router();
var Promise = require('promise');
var cheerio = require('cheerio');
var renderUtil = require('../serverUtil/su-util');
var log4j = require('../serverUtil/su-log');


router.get('/so/searchResult.html', function(req, res) {
    var url=global.dataHost+'/index.php';
    //var url='http://192.168.1.174/index.php';
    var modelParam = {
        action: 'getFamGoods'
    };
    httpRequest.get({url: url, formData: modelParam, method: 'get'}).then(function (data) {
        console.info(data.body);//解析成json字符串
        Promise.all([sfFile.read('html/so/searchResult.html', 'utf8')]).then(onFulfilled, onRejected);
        function onFulfilled(files) {
            var html = files[0];//主页面
            var dataInfo = JSON.parse(data.body);//解析成json对象
            //console.info(JSON.stringify(dataInfo));//解析成json字符串
            $ = cheerio.load(html, {decodeEntities: false});//dom结构
            //*********渲染主体-start***************
            $('[data-attach-point=sr]').html(global.dots.searchResult(dataInfo.data));
            res.set('Content-Type', 'text/html');
            res.send(new Buffer($.html()));
        };
        function onRejected(err) {
            renderUtil.logger(err);
        };
    })
});

module.exports = router;