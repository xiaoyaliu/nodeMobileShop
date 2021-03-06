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


router.get('/guessRule', function (req, res) {
    renderUtil.togApp(req.headers["user-agent"].toLowerCase(),res);
    var Cookies = renderUtil.splitCookie(req.headers.cookie);
    if(Cookies.unid===''||Cookies.unid===undefined){
        res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd4e8e98afd36f4fe&redirect_uri=http%3A%2F%2Fm.youde.com/guessActivity&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect');
    }
    Promise.all([sfFile.read('html/so/guessRule.html', 'utf8')]).then(onFulfilled, onRejected);
    function onFulfilled(files) {
        var html = files[0];//主页面
        //var dataList = JSON.parse(data.body);//解析成json对象
        //console.info(JSON.stringify(dataList));//解析成json字符串
        $ = cheerio.load(html, {decodeEntities: false});//dom结构

        //*********处理js挂马***************
        renderUtil.removeBadScript();

        //*********渲染主体-start***************
        //$('[data-attach-point=master]').html(global.dots.index(dataList));
        //*********底部-start***************
        //$('[data-attach-point=footer]').html(global.dots.footer());

        res.set('Content-Type', 'text/html');
        res.send(new Buffer($.html()));
    };
    function onRejected(err) {
        renderUtil.logger(err);
    };
});

module.exports = router;
