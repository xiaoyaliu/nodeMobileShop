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


router.get('/classify/:id', function(req, res) {
    var cateId=req.params.id;
    //判断设备
    renderUtil.toggleAppointed(req.headers["user-agent"].toLowerCase(),"classify",res,cateId)
    var url=global.dataHost+'/index.php';
    var modelParam = {
        action: 'search_result_init',
        cateid:cateId,
        tag:1
    };

    httpRequest.get({url: url,formData:modelParam, method: 'get'}).then(function (data) {

        Promise.all([sfFile.read('html/categoryList.html', 'utf8')]).then(onFulfilled,onRejected);
        function onFulfilled(files){
            var html = files[0];//主页面
            var dataObj = JSON.parse(data.body);//解析成json对象
            console.log(dataObj.info);
            //console.info(JSON.stringify(dataObj));//解析成json字符串
            $ = cheerio.load(html,{decodeEntities: false});//dom结构
            //*********处理js挂马***************
            renderUtil.removeBadScript();
            //*********渲染主体-start***************
            $('[data-attach-point=master]').html(global.dots.search());

            $('[data-attach-point=goTo]').attr("id",cateId);//设置cateId
            //判断分类下无商品时的显示
            if(dataObj.info.length==0){
                $('[data-attach-point=rq]').html("该分类下暂无商品").css("padding-top","200px;");
            }else{
                $('[data-attach-point=rq]').html(global.dots.searchInfo(dataObj));
            }
            /*****seo******/
            renderUtil.renderKeyWords(dataObj.seo);
            res.set('Content-Type', 'text/html');
            res.send(new Buffer($.html()));
        };
        function onRejected(err){
            renderUtil.logger(err);
        };
    })

});

module.exports = router;
