/**
 * Created by zhouxiangbo on 2017/8/1 0001.
 * description:
 */
var express = require('express');
var httpRequest = require('../serverUtil/su-request');
var sfFile = require('../serverUtil/su-file');
var router = express.Router();
var Promise = require('promise');
var cheerio = require('cheerio');
var renderUtil = require('../serverUtil/su-util');
var log4j = require('../serverUtil/su-log');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());

router.get('/jfWatchStics/:id', function(req, res) {
    var str=req.params.id;
    var gid=str.split(".")[0];
    var Cookies = renderUtil.splitCookie(req.headers.cookie);
    if(Cookies.uid===''||Cookies.uid===undefined){
        res.cookie('loginFrom','/jfWatchStics/:id');
        res.redirect('/login');
    }else{

        Promise.all([sfFile.read('html/jfWatchStics.html', 'utf8')]).then(onFulfilled,onRejected);
        function onFulfilled(files) {
            try {
                var html = files[0];//主页面
                $ = cheerio.load(html, {decodeEntities: false});//dom结构
                //*********处理js挂马***************
                renderUtil.removeBadScript();
                res.set('Content-Type', 'text/html');
                $("[data-attach-point='hidOther']").val(gid);
                res.send(new Buffer($.html()));
            } catch (err) {
                renderUtil.logger(err);
            }
            ;
        };
        function onRejected(err) {
            renderUtil.logger(err);
        };
    }
});

module.exports = router;