/**
 * author:zhouxiangbo
 * date: 17-08-09
 * description vip专区列表
 */
var express = require('express');
var httpRequest = require('../serverUtil/su-request');
var sfFile = require('../serverUtil/su-file');
var router = express.Router();
var Promise = require('promise');
var cheerio = require('cheerio');
var renderUtil = require('../serverUtil/su-util');
var log4j = require('../serverUtil/su-log');


router.get('/vipZone', function(req, res) {
    var url=global.dataHost+'/index.php';
    var modelParam = {
        action: 'getCouponGoods'
    };
    httpRequest.get({url: url, formData: modelParam, method: 'get'}).then(function (data) {
        //console.info(data.body);//解析成json字符串
        Promise.all([sfFile.read('html/vipZone.html', 'utf8')]).then(onFulfilled, onRejected);
        function onFulfilled(files) {
            var html = files[0];//主页面
            var dataInfo = JSON.parse(data.body);//解析成json对象
            //console.info(JSON.stringify(dataInfo));//解析成json字符串
            $ = cheerio.load(html, {decodeEntities: false});//dom结构
            //*********渲染主体-start***************
            $('[data-attach-point=togetherList]').html(global.dots.vipZoneList(dataInfo.data));
            res.set('Content-Type', 'text/html');
            res.send(new Buffer($.html()));
        };
        function onRejected(err) {
            renderUtil.logger(err);
        };
    })
});

module.exports = router;
