/**
 * Created with Cocos2d-x3.0 jsb.
 * company: 郑州优德
 * author:caokui
 * date: 15-11-23 下午6:00
 * summary:node启动配置
 */
/*var debug = require('debug')('nodeMobileShop');*/
var app = require('./serverApp');

app.set('port', process.env.PORT || 9010);
var server = app.listen(app.get('port'), function() {
    console.info('Express server listening on port ' + server.address().port);
});