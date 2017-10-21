/**
 * Created by zhouxiangbo on 2017/7/29 0029.
 * description:
 */
define([
    'jquery',
    'infoChannel',
    'cookie',
    'doT',
    'utilTool',
    'text!tpl/jfExchange.tpl',
], function (jquery, InfoChannel, cookie, doT, utilTool,jfExchangeTpl) {
    var url = configData.dataHost + '/integral.php';
    var jfExchange = doT.template(jfExchangeTpl);//doT编译模版
    var uid = $.cookie("uid");
    var address=$("[data-attach-point='address']").val();
    var integral=$("[data-attach-point='integral']").val();
    var goodsId=$("[data-attach-point='goodsId']").val();
    var param = {
        user_id: uid,
        action: "getSubOrder",
        address_id:address,
        goods_integral:integral,
        goods_id:goodsId
    };
    //提交订单
    $("[data-attach-point='submit']").click(function(){
        var bz=$("[data-attach-point='bz']").val();
        param.postscript=bz;
        //console.log(param);
        InfoChannel.getDataByAjax(url, param, function(obj){
            if(obj){
                $('.diaInfo').text('兑换成功');
                $(".dialog").show().fadeOut(2000,function(){
                    window.location.href="/jfActivity";
                });
            }else{
                $('.diaInfo').text('兑换失败');
                $(".dialog").show().fadeOut(2000);
            }
        });
    });


});