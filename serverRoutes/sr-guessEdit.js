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


router.get('/guessEdit/:id', function (req, res) {
    renderUtil.togApp(req.headers["user-agent"].toLowerCase(),res);
    //判断是否存在unid
    var Cookies = renderUtil.splitCookie(req.headers.cookie);
    if(Cookies.unid===''||Cookies.unid===undefined){
        res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd4e8e98afd36f4fe&redirect_uri=http%3A%2F%2Fm.youde.com%2FguessActivity&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect');
    }
    var str=req.params.id;
    var aid=str.split("_")[0];
    var pid=str.split("_")[1];
    console.log(aid,pid);
    var Cookies = renderUtil.splitCookie(req.headers.cookie);
    var unid=Cookies.unid;
        Promise.all([sfFile.read('html/so/guessEdit.html', 'utf8')]).then(onFulfilled, onRejected);
            function onFulfilled(files) {
                var html = files[0];//主页面
                $ = cheerio.load(html, {decodeEntities: false});//dom结构
                //*********处理js挂马***************
                renderUtil.removeBadScript();
                //*********渲染主体-start***************
                $('[data-attach-point="pid"]').val(pid);
                $('[data-attach-point="unid"]').val(unid);
                $('[data-attach-point=mp]').html("获得"+"<span style='font-size: 16px;'>"+aid+"</span>");
                res.set('Content-Type', 'text/html');
                res.send(new Buffer($.html()));
            };
            function onRejected(err) {
                renderUtil.logger(err);
            };
    });


module.exports = router;
