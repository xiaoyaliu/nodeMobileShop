/**
 * Created by zhouxiangbo on 2017/7/29 0029.
 * description:
 */
define([
    'jquery',
    'infoChannel',
    'utilTool',
    'cookie',
    'doT',
    'text!tpl/jfExchangeDetail.tpl'
], function (jquery, InfoChannel, UtilTool, cookie,doT, jfEcDeTpl) {
//doT编译模版
    var jfEcDeTemp = doT.template(jfEcDeTpl);
//初始化数据
    var url = configData.dataHost + '/integral.php';//设置url
    var param = {
        action: 'getOrderInfo',
        order_id:$("[data-attach-point='hidVal']").val(),
        uesr_id:$.cookie("uid")
    };
    InfoChannel.getDataByAjax(url, param, initCallback);
    function initCallback(obj) {
        if(obj.flag){
            $('[data-attach-point=jfDetailSection]').append(jfEcDeTemp(obj.data));
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
});
