/**
 * Created with youde
 * company:郑州优德
 * author:caokui
 * date:16-3-5 下午4:45
 * description:工具
 */
var log4j = require('./su-log').logger;
//关键词渲染
module.exports.renderKeyWords=function(seoinfo){
        $('[data-attach-point=keywords]').attr('content',seoinfo.keywords);
        $('[data-attach-point=description]').attr('content',seoinfo.description);
        $('[data-attach-point=title]').text(seoinfo.title);
};
//js挂马
module.exports.removeBadScript=function(){
    $('script').each(function(index,domEle){
     var temp=domEle.attribs.src;
         if(temp!=undefined){
            var num=temp.toLowerCase().indexOf('http');
             if(num>=0){
                 //日志记录
                 try {
                     log4j.info("非法js=="+domEle.attribs.src+"=已从内存中清除");
                     $(domEle).remove();
                 } catch (e) {
                     log4j.info(e);
                 }
             }
         }
     });
}
//解析cookie
module.exports.splitCookie=function(obj){
    var Cookies = {};
    if(obj!=undefined){
        obj.split(';').forEach(function( Cookie ) {
            var parts = Cookie.split('=');
            Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
        });
    }
    return Cookies;
};
//判断设备
module.exports.toggleAppointed=function(deviceAgent,comFrom,res,id){
      var agentID = deviceAgent.match(/(iphone|android)/);
      var urlLocation="https://www.youde.com/";
      if(!agentID){
            switch (comFrom){
                  case "cart":
                        urlLocation=urlLocation+"cart.php";
                        break;
                  case "goodsDetail":
                        urlLocation=urlLocation+"view.php?id="+id;
                        break;
                  case "classifyFl":
                        urlLocation=urlLocation+"category.php?cid="+id;
                        break;
                  case "classify":
                        urlLocation=urlLocation+"category.php?cate_id="+id;
                        break;
                  case "register":
                        urlLocation=urlLocation+"register.php";
                        break;
                  case "login":
                        urlLocation=urlLocation+"login.php";
                        break;
                  default:;
            }
            res.redirect(urlLocation)
      }
};

module.exports.togApp=function(deviceAgent,res){
    var agentID = deviceAgent.match(/(iphone|android)/);
    var urlLocation="http://m.youde.com/";
    if(!agentID){
        res.redirect(urlLocation);
    }else if(deviceAgent.toLowerCase().match(/MicroMessenger/i)!="micromessenger"){
        res.redirect(urlLocation+"so/wxNull.html");
    }
}

//记录日志
module.exports.logger=function(info){
    log4j.info(info);
}
/*
 * 微信配置
 * 公司的
 *  appid : 'wxd4e8e98afd36f4fe',//公众号的appId，可以在公众平台上找到，
 appsecret : 'fba32ae0e456e6705de1016ff213635b'//公众号的appsecret
 自已的
 appid : 'wxf2d98a939bca64fd',//公众号的appId，可以在公众平台上找到，
 appsecret : 'f2e45be6f78fd0fb2c1e1dd7730d467b'//公众号的appsecret
 * */
module.exports.wxconfig = {
    appid : 'wxd4e8e98afd36f4fe',//公众号的appId，可以在公众平台上找到。
    appsecret : 'fba32ae0e456e6705de1016ff213635b'//公众号的appsecret
};