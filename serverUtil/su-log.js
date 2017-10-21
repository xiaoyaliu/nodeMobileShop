/**
 * Created with youde
 * company:郑州优德
 * author:caokui
 * date:16-4-26 上午9:36
 * description:log4js
 */
var express = require('express');
var app = express();
var log4js = require('log4js');
log4js.configure({
    appenders: [//输出源
        {
            type: 'console',
            category: "console"
        },//控制台输出
        {
            type: 'dateFile',//文件输出
            filename: './logs/access.log',
            pattern: "_yyyy-MM-dd",
            alwaysIncludePattern: false,
            category: 'dateFileLog'
        }
    ],
    replaceConsole: true,//将console输出到日志中
    levels:{
        dateFileLog: 'INFO'
    }
});

var dateFileLog = log4js.getLogger('dateFileLog');

module.exports.logger = dateFileLog;

module.exports.use = function(app) {
    //页面请求日志,用auto的话,默认级别是WARN
    //app.use(log4js.connectLogger(dateFileLog, {level:'auto', format:':method :url'}));
    app.use(log4js.connectLogger(dateFileLog, {level:'debug', format:':method :url'}));
    //app.use(log4js.connectLogger(dateFileLog, {level:log4js.levels.INFO, format:':method :url'}));
}
