/**
 * Created by zhouxiangbo on 2017/7/28 0028.
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


router.get('/jfDetail/:id', function(req, res) {

    var str=req.params.id;
    var gid=str.split(".")[0];
    //判断设备
    renderUtil.toggleAppointed(req.headers["user-agent"].toLowerCase(),"goodsDetail",res,gid);
    var url=global.dataHost+'/integral.php';
    var modelParam = {
        action: 'getGoodsInfo',
        goods_id:gid
    };
    var reg = /^\d+(?=\.{0,1}\d+$|$)/;
    if(!reg.test(gid)){
        res.redirect('/404');
    };
    httpRequest.get({url: url,formData:modelParam, method: 'get'}).then(function (data) {
        console.log(data.body);
        Promise.all([sfFile.read('html/jfDetail.html', 'utf8')]).then(onFulfilled,onRejected);
        function onFulfilled(files){
            var html = files[0];//主页面
            var dataList = JSON.parse(data.body);//解析成json对象
            //console.log(dataList);
            //console.info(JSON.stringify(dataList));//解析成json字符串
            $ = cheerio.load(html,{decodeEntities: false});//dom结构
            //*********处理js挂马***************
            renderUtil.removeBadScript();
            //*********渲染主体-start***************
            $('[data-attach-point=master]').html(global.dots.jfDetail(dataList));
           // renderUtil.renderKeyWords(dataList.seo);
            res.set('Content-Type', 'text/html');
            res.send(new Buffer($.html()));
        };
        function onRejected(err){
            renderUtil.logger(err);
        };
    })

});

module.exports = router;