/**
 * Created by zhouxiangbo on 2017/7/28 0028.
 * description:
 */
define([
    'jquery',
    'infoChannel',
    'cookie',
    'utilTool',
    'doT',
    'text!tpl/jfActivity.tpl'
], function (jquery, InfoChannel,cookie,UtilTool,doT,jfTpl) {

    //设置url
    var url = configData.dataHost + '/integral.php';
    //doT编译模版
    var jfTemp = doT.template(jfTpl);
    //前端分页参数
    var start = 0;//数据开始位置
    var end = 0;//数据截至位置
    var size = 8;//步长
    var dataList = [];

    // //初始化页面
    var params={
        action:"getLastGoods",
        uid:$.cookie("uid")
    }
    InfoChannel.getDataByAjax(url, params, callback);
    function callback(obj){
        //console.log(obj);
        if(obj){
            dataList=obj.goodsList;
        }
    }
    //分页
    //滚动加载
    $(document).bind('scroll', onScroll);
    function onScroll(event) {
        //是否到底部（这里是判断离底部还有100px开始载入数据）.
        var closeToBottom = ($(window).scrollTop() + $(window).height() > $(document).height() - 100);
        //console.log(dataList);
        if (closeToBottom) {
            if (end < dataList.length) {
                start=end;
                end = start + size;
                var arr = dataList.slice(start, end);
                if (arr.length !== 0) {
                    //console.log(arr);
                    $('[data-attach-point=jfVipCont]').append(jfTemp(arr));
                } else {
                    $('[data-attach-point=none]').show();
                }
            }else {
                $('[data-attach-point=none]').show();
            }
        }
    };
    //立即兑换
    window.exchange=function(that){
        var obj={
            action:"getChangGoods",
            user_id:$.cookie("uid"),
            goods_id:that
        }
        InfoChannel.getDataByAjax(url, obj,function(data){
            if(data){
                window.location.href="/jfExchange/"+that+".html";
            }else{
                $("[data-attach-point='tophis']").text("您的积分不足！快去积攒吧");
                $("#top").show();
                $("#below").show();
                $("#cancel").click(function(){$("#top").hide();$("#below").hide();});
                $("#confirm").click(function(){$("#top").hide();$("#below").hide();});
            }
        });
    }

    //设置回到顶部动效
    UtilTool.goTop();


    //************************加载优化配置文件***************************************************
    //require(['libConfig']);
});