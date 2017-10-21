/**
 * Created by zhouxiangbo on 2017/7/29 0029.
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

router.get('/jfRecord', function (req, res) {
    var Cookies = renderUtil.splitCookie(req.headers.cookie);
    var cuid=Cookies.uid;
    //console.log(cuid);
    if(cuid===''||cuid===undefined){
        res.cookie('loginFrom','/jfRecord');
        res.redirect('/login');
    }else{
        var url=global.dataHost+'/integral.php';
        var modelParam = {
            action: 'getOrderAll',
            user_id:cuid,
        };
        httpRequest.get({url: url, formData: modelParam, method: 'get'}).then(function (data) {
            Promise.all([sfFile.read('html/jfRecord.html', 'utf8')]).then(onFulfilled, onRejected);
            function onFulfilled(files) {
                try {
                    var obj = JSON.parse(data.body);//解析成json对象
                    //console.info(obj);//解析成json字符串
                    var html = files[0];//主页面
                    $ = cheerio.load(html,{decodeEntities: false});//dom结构
                    //*********处理js挂马***************
                    renderUtil.removeBadScript();
                    //*********渲染主体-start***************
                    if(obj.flag){
                        $('[data-attach-point=jfRecordSection]').html(global.dots.jfRecord(obj));
                    }else{
                        $('[data-attach-point=jfRecordSection]').html("<div class='jfReNull'>暂无兑换记录</div>");
                    }
                    res.set('Content-Type', 'text/html');
                    res.send(new Buffer($.html()));
                } catch (err) {
                    renderUtil.logger(err);
                };
            };
            function onRejected(err) {
                renderUtil.logger(err);
            };
        })
    }


});

module.exports = router;