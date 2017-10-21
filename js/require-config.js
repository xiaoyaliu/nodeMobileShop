/**
 * Created with Cocos2d-x3.0 jsb.
 * company: 郑州优德
 * author:caokui
 * date: 15-11-23 下午6:00
 * summary:前端配置
 */
//********用于访问前端*******************
window.origin="http://"+window.location['host'];
window.pathname=window.location['pathname'];
window.MyClickObj={};//事件对象
//********用于访问服务端*******************
window.configData={
    //数据源
     //dataHost:"http://192.168.1.220"
    dataHost:"http://touch.youde202.com"
    //dataHost:"http://xxx.youde.com"
    //dataHost:"http://192.168.1.202:81"
};

/*if (document.domain != 'm.youde.com'){
    window.location.href='http://m.youde.com';
};*/
//*************配置require加载js路径*********************
require.config({
    baseUrl: window.origin,
    waitSeconds: 0,
    paths: {
        ready:"ext/domReady",
        jquery:'ext/jquery-3.0.0',
        jqueryJSON:'ext/jquery-json-2.4',
        infoChannel:'ext/infoChannel',
        utilTool: 'ext/utils',
        text: 'ext/text',
        doT:'ext/doT',
        eventListen:'ext/on',
        cookie:"ext/jquery.cookie",
        base64:"ext/jquery.base64",
        swiper:"ext/swiper",
        libConfig:'ext/libConfig',
        dropload:'ext/dropload',
        jqueryForm:'ext/jquery.form',
        mobiscroll01:'ext/mobiscroll-1',
        mobiscroll02:'ext/mobiscroll-2',
        mobiscroll03:'ext/mobiscroll-3',
        gVerify:'ext/gVerify',
        searchTool:'components/searchTool',
        slotmachine:'ext/jquery.slotmachine',
        jweixin:"ext/jweixin-1.0.0",
        cityjson:'ext/cityJson'
    },
    shim: {
        "jquery":{
            exports: "jquery"
        },
        "jqueryJSON":{
            deps: ['jquery'],
            exports: "jqueryJSON"
        },
        "doT":{
            exports: "doT"
        },
        "focusSlider":{
            deps: ['jquery'],
            exports: "focusSlider"
        },
        "cookie":{
            deps: ['jquery'],
            exports: "cookie"
        },
        "base64":{
            deps: ['jquery'],
            exports: "base64"
        },
        "swiper":{
            deps: ['jquery'],
            exports: "swiper"
        },
        'dropload':{
            deps:['jquery'],
            exports:"dropload"
        },
        'jqueryForm':{
            deps:['jquery'],
            exports:"jqueryForm"
        },
        'mobiscroll01':{
            deps:['jquery'],
            exports:"mobiscroll01"
        },
        'mobiscroll02':{
            deps:['jquery','mobiscroll01'],
            exports:"mobiscroll02"
        },
        'mobiscroll03':{
            deps:['jquery','mobiscroll02'],
            exports:"mobiscroll03"
        },
        'slotmachine':{
            deps:['jquery'],
            exports:"slotmachine"
        },
        'cityjson':{
            deps:['jquery'],
            exports:"cityjson"
        }
    }
});

