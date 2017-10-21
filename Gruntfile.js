/*global module*/
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            build: {
                options: {
                    appDir: './',
                    baseUrl: 'js',
                    dir: 'nodeMobileShop',
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
                    },
                    modules: [
                        {name: 'components/account'},
                        {name: 'components/addressEdit'},
                        {name: 'components/addressInfo'},
                        {name: 'components/addressList'},
                        {name: 'components/addressoEdit'},
                        {name: 'components/addressoInfo'},
                        {name: 'components/addressoList'},
                        {name: 'components/addressoWorldEdit'},
                        {name: 'components/addressoWorldInfo'},
                        {name: 'components/addressWorldList'},
                        {name: 'components/browser'},
                        {name: 'components/cart'},
                        {name: 'components/cartIsWorld'},
                        {name: 'components/category'},
                        {name: 'components/categoryflList'},
                        {name: 'components/categoryList'},
                        {name: 'components/changePwd'},
                        {name: 'components/concern'},
                        {name: 'components/coupon'},
                        {name: 'components/email'},
                        {name: 'components/evaluate'},
                        {name: 'components/exchange'},
                        {name: 'components/exProcess'},
                        {name: 'components/feedback'},
                        {name: 'components/goLogistics'},
                        {name: 'components/goodsDetail'},
                        {name: 'components/goodsDetailIsWorld'},
                        {name: 'components/guessActivity'},
                        {name: 'components/guessEdit'},
                        {name: 'components/index'},
                        {name: 'components/jfActivity'},
                        {name: 'components/jfAddrEdit'},
                        {name: 'components/jfAddressList'},
                        {name: 'components/jfAddrInsert'},
                        {name: 'components/jfDetail'},
                        {name: 'components/jfExchange'},
                        {name: 'components/jfExchangeDetail'},
                        {name: 'components/jfRecord'},
                        {name: 'components/jfWatchStics'},
                        {name: 'components/login'},
                        {name: 'components/logistics'},
                        {name: 'components/mobileBind'},
                        {name: 'components/needReg'},
                        {name: 'components/order'},
                        {name: 'components/oneSk'},
                        {name: 'components/orderDetails'},
                        {name: 'components/orderFail'},
                        {name: 'components/orderSure'},
                        {name: 'components/orderSureWorld'},
                        {name: 'components/password'},
                        {name: 'components/payCallback'},
                        {name: 'components/payChoice'},
                        {name: 'components/payDown'},
                        {name: 'components/personInfo'},
                        {name: 'components/points'},
                        {name: 'components/register'},
                        {name: 'components/reProcess'},
                        {name: 'components/returnChoose'},
                        {name: 'components/returnRecord'},
                        {name: 'components/search'},
                        {name: 'components/searchResult'},
                        {name: 'components/searchTool'},
                        {name: 'components/user'},
                        {name: 'components/vipZone'},
                        {name: 'components/vote'},
                        {name: 'components/worldShop'},
                        {name: 'components/youdeService'},
                        {name: 'components/zhuanti'}
                    ]
                }
            }

        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs'); //加载模块
    grunt.registerTask('default', ['requirejs']);
};