/**
 *company:优德医药网
 *author:caokui
 *data:2017/4/13.
 *summary:
 */
var express = require('express');
var router = express.Router();
var httpRequest = require('../serverUtil/su-request');
var sfFile = require('../serverUtil/su-file');
var log4j = require('../serverUtil/su-log');
var Promise = require('promise');
var cheerio = require('cheerio');


router.get('/sharehb/:upid', function (req, res) {
    //console.log(req.params);
    var str=req.params.upid;
    var uid=str.split('-')[0];
    var pid=str.split('-')[1];

    //console.log(uid,pid);
    var url=global.dataHost+'/activity.php';
    var modelParam = {
        action: 'shareRigisterCode',
        user_id:uid,
        channel:pid
    };

    httpRequest.get({url: url, formData: modelParam, method: 'get'}).then(function (data) {
        Promise.all([sfFile.read('html/sharehb.html', 'utf8')]).then(onFulfilled, onRejected);
        function onFulfilled(files) {
            try {
                var obj = JSON.parse(data.body);//解析成json对象
                //console.info(JSON.stringify(obj));//解析成json字符串

                var html = files[0];//主页面
                $ = cheerio.load(html,{decodeEntities: false});//dom结构

                //*********渲染主体-start***************
                 if(obj.flag){
                     $('[data-attach-point=number]').val(obj.data.code);
                 }else{
                     $('[data-attach-point=number]').val(obj.msg);
                 }
                res.set('Content-Type', 'text/html');
                res.send(new Buffer($.html()));
            } catch (err) {
                renderUtil.logger(err);
            }
            ;
        };
        function onRejected(err) {
            renderUtil.logger(err);
        };
    })

});

module.exports = router;