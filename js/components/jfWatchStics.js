/**
 * Created by zhouxiangbo on 2017/8/1 0029.
 * description:
 */
define([
    'jquery',
    'infoChannel',
    'cookie',
    'doT',
    'utilTool',
    'text!tpl/jfWatchStics.tpl',
], function (jquery, InfoChannel, cookie, doT, utilTool,jfWatchSticsTpl) {
    var url = configData.dataHost + '/integral.php';
    var jfWatchStics = doT.template(jfWatchSticsTpl);//doT编译模版
    var uid = $.cookie("uid");
    var orderId=$("[data-attach-point='hidOther']").val();
    //console.log(orderId);
    var param = {
        user_id: uid,
        action: "getLogistics",
        order_id:orderId
    };
    InfoChannel.getDataByAjax(url, param, initCallback);
    function initCallback(obj) {
        //console.log(obj);
        if(obj.flag){
            $('[data-attach-point=jfRecord-wh]').append(jfWatchStics(obj));
        }
    }


});