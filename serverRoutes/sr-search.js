/**
 * Created with youde
 * company:郑州优德
 * author:caokui
 * date:16-3-7 下午1:48
 * description:搜索
 */
var express = require('express');
var httpRequest = require('../serverUtil/su-request');
var sfFile = require('../serverUtil/su-file');
var router = express.Router();
var Promise = require('promise');
var cheerio = require('cheerio');
var renderUtil = require('../serverUtil/su-util');
var log4j = require('../serverUtil/su-log');

router.get('/search/:key', function(req, res) {
    var key=decodeURI(req.params.key);
    var url=global.dataHost+'/index.php';
    var modelParam = {
        action:'search_result_init',
        keywords:key,
        tag:2
    };

    httpRequest.get({url: url,formData:modelParam, method: 'get'}).then(function (data) {
        //console.info(data.body);//解析成json字符串
        Promise.all([sfFile.read('html/search.html', 'utf8')]).then(onFulfilled,onRejected);
        function onFulfilled(files){
            var html = files[0];//主页面
            var dataObj = JSON.parse(data.body);//解析成json对象
            console.info(JSON.stringify(dataObj));//解析成json字符串
            $ = cheerio.load(html,{decodeEntities: false});//dom结构
            //*********处理js挂马***************
            renderUtil.removeBadScript();

            //*********渲染主体-start***************
            $('[data-attach-point=master]').html(global.dots.search());
            $('[data-attach-point=kv]').val(key);//设置文本框值

            if(dataObj.info.length!=0){//有结果
                $('[data-attach-point=rq]').html(global.dots.searchInfo(dataObj));
            }else{//无结果
                $('[data-attach-point=rq]').html(global.dots.searchNull());
                $('[data-attach-point=yn]').val(key);//药品名称
            }

            res.set('Content-Type', 'text/html');
            res.send(new Buffer($.html()));
        };
        function onRejected(err){
            renderUtil.logger(err);
        };
    })
});

module.exports = router;