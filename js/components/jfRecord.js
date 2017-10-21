/**
 * Created by zhouxiangbo on 2017/7/29 0029.
 * description:
 */
define([
    'jquery',
    'infoChannel',
    'cookie',
    'utilTool',
    'doT',
    'text!tpl/jfRecord.tpl'
], function (jquery, InfoChannel,cookie,UtilTool,doT,jfRecord) {
    //设置url
var url = configData.dataHost + '/integral.php';
//doT编译模版
var jfRecord = doT.template(jfRecord);
//前端分页参数
var start = 0;//数据开始位置
var end = 0;//数据截至位置
var size = 8;//步长
var dataList = [];

// //初始化页面
var params={
    action:"getOrderAllLast",
    user_id:$.cookie("uid")
}
InfoChannel.getDataByAjax(url, params, callback);

function callback(obj){
    //console.log(obj.order_info);
    if(obj.flag){
        dataList=obj.order_info;
        //console.log(dataList);
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
                $('[data-attach-point=jfRecordSection]').append(jfRecord(arr));
            } else {
                $('[data-attach-point=none]').show();
            }
        }else {
            $('[data-attach-point=none]').show();
        }
    }
}
    //再次兑换
    window.dhAgain=function(that){
        window.location.href="/jfExchange/"+that+".html";
    };
    //取消订单
    window.exitOther=function(that){
        $("[data-attach-point='tophis']").text("确定要取消订单吗?");
        $("#top").show();
        $("#below").show();
        $("#cancel").click(function(){
            $("#top").hide();
            $("#below").hide();
        });
        $("#confirm").off("click").click(function(){
            var exitParam={
                action:"cancelIntOrder",
                order_id:that,
                user_id:$.cookie("uid"),
            }
            InfoChannel.getDataByAjax(url, exitParam, function(data){
                if(data.flag){
                    $("#top").hide();
                    $("#below").hide();
                    $('.diaInfo').text('取消成功');
                    $(".dialog").show().fadeOut(1500,function(){
                        window.location.href="/jfRecord";
                    });
                }else{
                    $("#top").hide();
                    $("#below").hide();
                    $('.diaInfo').text(data.msg);
                    $(".dialog").show().fadeOut(1500,function(){
                        window.location.href="/jfRecord";
                    });
                }

            });

        });

    };
    //查看物流
    window.watchWl=function(that){
        window.location.href="/jfWatchStics/"+that+".html";
    };
    //删除订单
    window.delOther=function(that){
        $("[data-attach-point='tophis']").text("确定要删除订单吗?");
        $("#top").show();
        $("#below").show();
        $("#cancel").click(function(){
            $("#top").hide();
            $("#below").hide();
        });
        $("#confirm").off("click").click(function(){
            var exitParam={
                action:"delIntOrder",
                order_id:that,
                user_id:$.cookie("uid"),
            }
            InfoChannel.getDataByAjax(url, exitParam, function(data){
                if(data.flag){
                    $("#top").hide();
                    $("#below").hide();
                    $('.diaInfo').text('删除成功');
                    $(".dialog").show().fadeOut(1500,function(){
                        window.location.href="/jfRecord";
                    });
                }else{
                    $("#top").hide();
                    $("#below").hide();
                    $('.diaInfo').text(data.msg);
                    $(".dialog").show().fadeOut(1500,function(){
                        window.location.href="/jfRecord";
                    });
                }

            });

        });
    };
//确认收货
    window.quire=function(that){
        $("[data-attach-point='tophis']").text("确定拿到宝贝了吗?");
        $("#top").show();
        $("#below").show();
        $("#cancel").click(function(){
            $("#top").hide();
            $("#below").hide();
        });
        $("#confirm").off("click").click(function(){
            var exitParam={
                action:"ConfirmReceipt",
                order_id:that,
                user_id:$.cookie("uid"),
            }
            InfoChannel.getDataByAjax(url, exitParam, function(data){
                if(data.status){
                    $("#top").hide();
                    $("#below").hide();
                    $('.diaInfo').text('确认成功');
                    $(".dialog").show().fadeOut(1500,function(){
                        window.location.href="/jfRecord";
                    });
                }else{
                    $("#top").hide();
                    $("#below").hide();
                    $('.diaInfo').text(data.msg);
                    $(".dialog").show().fadeOut(1500,function(){
                        window.location.href="/jfRecord";
                    });
                }

            });

        });
    };



    //设置回到顶部动效
    UtilTool.goTop();
})
