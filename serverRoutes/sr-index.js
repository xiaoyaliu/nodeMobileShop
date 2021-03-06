/**
 * Created with Cocos2d-x3.0 jsb.
 * company: 郑州优德
 * author:caokui
 * date: 15-11-23 下午6:00
 * description 首页
 */
var express = require('express');
var httpRequest = require('../serverUtil/su-request');
var sfFile = require('../serverUtil/su-file');
var router = express.Router();
var Promise = require('promise');
var cheerio = require('cheerio');
var renderUtil = require('../serverUtil/su-util');
var log4j = require('../serverUtil/su-log');


router.get('/', function(req, res) {
            //判断设备
            renderUtil.toggleAppointed(req.headers["user-agent"].toLowerCase(),"index",res);
            var url=global.dataHost+'/index.php';
            var modelParam = {
               action: 'index'
            };
            httpRequest.get({url: url, formData: modelParam, method: 'get'}).then(function (data) {
                  console.info(data.body);//解析成json字符串
                  Promise.all([sfFile.read('html/index.html', 'utf8')]).then(onFulfilled, onRejected);
                  function onFulfilled(files) {
                        var html = files[0];//主页面
                        var dataList = JSON.parse(data.body);//解析成json对象
                        console.info(JSON.stringify(dataList));//解析成json字符串
                        $ = cheerio.load(html, {decodeEntities: false});//dom结构

                        //*********处理js挂马***************
                        renderUtil.removeBadScript();

                        //*********渲染主体-start***************
                        $('[data-attach-point=master]').html(global.dots.index(dataList));
                        //*********底部-start***************
                        $('[data-attach-point=footer]').html(global.dots.footer());

                        /*****seo******/
                        renderUtil.renderKeyWords(dataList.seo);
                        res.set('Content-Type', 'text/html');
                        res.send(new Buffer($.html()));
                  };
                  function onRejected(err) {
                        renderUtil.logger(err);
                  };
            })
});

module.exports = router;
