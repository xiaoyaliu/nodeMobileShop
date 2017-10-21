/**
 * Created with Cocos2d-x3.0 jsb.
 * company: 郑州优德
 * author:caokui
 * date: 15-11-23 下午6:00
 * summary:node主文件
 */
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var controller = require('./serverRoutes/controller');
var log4j = require('./serverUtil/su-log');
var doT = require("dot");
var app = express();

//设置环境变量
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'dot');
global.dots = doT.process({path:app.get('views')});//预编译公共模版

//调用中间件
log4j.use(app);
app.use(favicon());
/*app.use(logger('dev'));*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/css')));
app.use(express.static(path.join(__dirname, '/js')));
app.use(express.static(path.join(__dirname, '/htmlStatic')));
app.use(controller);

//外站取数地址
//global.dataHost="http://192.168.1.220";
//global.dataHost="http://touch.youde202.com";
global.dataHost="http://xxx.youde.com";
//global.dataHost="http://192.168.1.202:81";


//处理404错误
/*app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    //res.send('');
    next(err);
});*/
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;