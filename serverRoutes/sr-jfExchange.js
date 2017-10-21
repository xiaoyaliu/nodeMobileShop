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


router.get('/jfExchange/:id', function (req, res) {
    var str=req.params.id;
    //console.log(str);
    var gid=str.split(".")[0];
    var gid_1=gid.split("_")[0];
    var gid_2=gid.split("_")[1];
    var addId=gid_2;
     var reg=/.*_+.*/;
    if( reg.test(str)){
       gid=gid_1;
    }else{
        gid=gid_1;
        addId="";
    }
    var url=global.dataHost+'/integral.php';
    var Cookies = renderUtil.splitCookie(req.headers.cookie);

    var modelParam={
        action:'getOrder',
        goods_id:gid,
        user_id:Cookies.uid,
        address_id:addId
    }
    if(Cookies.uid===''||Cookies.uid===undefined){
        res.cookie('loginFrom','/jfExchange:id');
        res.redirect('/login');
    }else{
        httpRequest.get({url: url,formData:modelParam, method: 'get'}).then(function (data) {
            //console.info(data);
            Promise.all([sfFile.read('html/jfExchange.html', 'utf8')]).then(onFulfilled, onRejected);
            function onFulfilled(files) {
                try {
                    var html = files[0];//主页面
                    $ = cheerio.load(html, {decodeEntities: false});//dom结构
                    var dataList = JSON.parse(data.body);//解析成json对象
                    //console.log(dataList);
                    //*********处理js挂马***************
                    renderUtil.removeBadScript();
                    //*********渲染主体-start***************
                    $('[data-attach-point=jfExcSection]').html(global.dots.jfExchange(dataList));
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

    }
});

module.exports = router;