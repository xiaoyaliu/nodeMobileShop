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


router.get('/guessActivity', function(req, res) {
    //判断设备
    renderUtil.togApp(req.headers["user-agent"].toLowerCase(),res);
    var url=global.dataHost+'/draw.php';
    var modelParam = {
        action: 'getDrawInfo'
    };
    httpRequest.get({url: url, formData: modelParam, method: 'get'}).then(function (data) {
        var dataList = JSON.parse(data.body);//解析成json对象
        if(dataList.flag){
            Promise.all([sfFile.read('html/so/guessActivity.html', 'utf8')]).then(onFulfilled, onRejected);
            function onFulfilled(files) {
                var html = files[0];//主页面
                console.info(JSON.stringify(dataList));//解析成json字符串
                $ = cheerio.load(html, {decodeEntities: false});//dom结构
                //*********处理js挂马***************
                renderUtil.removeBadScript();
                //*********渲染主体-start***************
                $('[data-attach-point=realImg]').attr('src',dataList.data.starImage);
                $('[data-attach-point=promptTa]').text(dataList.data.prompt);
                $('[data-attach-point=partId]').val(dataList.data.id);
                //console.log(req.url);//"/guessActivity"
                var locUrl=req.url;
                //var locUrl='/guessActivity?code=061qPj5Y1CiNUU0Ukg5Y1fjq5Y1qPj54&state=1';
                var num = locUrl.indexOf("?");
                var str = locUrl.substr(num);
                //console.log(str);//?code=021ibxlR0P1Gwb29HdmR0tsulR0ibxlh&state=1
                function GetQueryString(name) {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                    var r = str.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
                    var context = "";
                    if (r != null)
                        context = r[2];
                    reg = null;
                    r = null;
                    return context == null || context == "" || context == "undefined" ? "" : context;
                }
                //console.log(GetQueryString("code"));//code
                var code=GetQueryString("code");
                var token_url="https://api.weixin.qq.com/sns/oauth2/access_token?appid="+renderUtil.wxconfig.appid+"&secret="+renderUtil.wxconfig.appsecret+"&code="+code+"&grant_type=authorization_code "
                httpRequest.get({url:token_url,method:"get"}).then(function(data){
                    console.log(data.body);
                    var openList = JSON.parse(data.body);//解析成json对象
                    // if(openList.access_token==''||openList.access_token==undefined){
                    //     res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd4e8e98afd36f4fe&redirect_uri=http%3A%2F%2Fm.youde.com%2FguessActivity&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect');
                    // }else{
                        var token=openList.access_token;
                        var code=openList.openid;
                        // console.log("zxb"+token,code);
                        var msg_uel="https://api.weixin.qq.com/sns/userinfo?access_token="+token+"&openid="+code+"&lang=zh_CN ";
                        httpRequest.get({url:msg_uel,method:"get"}).then(function(data){
                            var msgList = JSON.parse(data.body);//解析成json对象
                            //console.log(dataList.nickname);
                            if(msgList.unionid===""||msgList.unionid===undefined){
                                res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd4e8e98afd36f4fe&redirect_uri=http%3A%2F%2Fm.youde.com%2FguessActivity&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect');
                            }else{
                                $("[data-attach-point='wxName']").val(msgList.nickname);
                                $("[data-attach-point='wxHeadImg']").val(msgList.headimgurl);
                                $("[data-attach-point='wxOid']").val(msgList.openid);
                                $("[data-attach-point='wxUid']").val(msgList.unionid);
                            }
                            res.set('Content-Type', 'text/html');
                            res.send(new Buffer($.html()));
                        });
                    // }


                });


            };
            function onRejected(err) {
                renderUtil.logger(err);
            };
        }else{
            res.redirect('/noGuess');
        }
    })
});

module.exports = router;
