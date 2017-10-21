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

router.get('/cart', function(req, res) {
    //判断设备
    renderUtil.toggleAppointed(req.headers["user-agent"].toLowerCase(),"cart",res);
    if(req.headers.cookie!==undefined){
        var Cookies = renderUtil.splitCookie(req.headers.cookie);
        var url=global.dataHost+'/cart.php';
        var modelParam = {
            action: 'show_cart',
            sid:Cookies.sid,
            user_id:Cookies.uid
        };
       httpRequest.get({url: url,formData:modelParam, method: 'get'}).then(function (data) {
           console.log(data);
           Promise.all([sfFile.read('html/cart.html', 'utf8')]).then(onFulfilled,onRejected);
           function onFulfilled(files){
               try{
                   var html = files[0];//主页面
                   var dataList = JSON.parse(data.body);//解析成json对象
                   //console.info(JSON.stringify(dataList));//解析成json字符串
                   $ = cheerio.load(html,{decodeEntities: false});//dom结构

                   //*********处理js挂马***************
                   renderUtil.removeBadScript();

                   //*********渲染主体-start***************
                    if(dataList.info.allcart.length===0){
                        $('.shopBox').html(global.dots.cartNull());
                        res.cookie('cartnum',0, {path: '/' });
                    }else{
                        $('[data-attach-point=lord]').html(global.dots.cart(dataList));
                        $('[data-attach-point="num"]').text(dataList.info.cartInfo.totalNum);//设置已选中数量
                        //判断是否全选
                        var flag=true;
                        var arr=dataList.info.allcart;
                        for(var i= 0,len=arr.length;i<len;i++){
                            if(arr[i].flag===0){
                                flag=false;
                                break;
                            }
                        }
                        if(flag){
                            $("#selectAll").attr("checked", true);
                        }
                       // res.cookie('cartnum',dataList.info.total.totalCount, {path: '/' });//设置购物车数量
                    }
                   /*****seo******/
                   renderUtil.renderKeyWords(dataList.seo);
                   res.set('Content-Type', 'text/html');
                   res.send(new Buffer($.html()));
               }catch(err){
                   renderUtil.logger(err);
               }
           };
           function onRejected(err){
               renderUtil.logger(err);
           };
        })
    }else{
        Promise.all([sfFile.read('html/cart.html', 'utf8')]).then(onFulfilled, onRejected);
        function onFulfilled(files) {
            try {
                var html = files[0];//主页面
                $ = cheerio.load(html, {decodeEntities: false});//dom结构
                $('.shopBox').html(global.dots.cartNull());
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
    }
});

module.exports = router;
