/**
 * Created by zhouxiangbo on 2017/7/28 0028.
 * description:
 */
define([
    'jquery',
    'infoChannel',
    'cookie',
    'swiper',
    'utilTool',
], function (jquery, InfoChannel,cookie, swiper, UtilTool) {
    var url = configData.dataHost + '/integral.php';

    //设置焦点图动效
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-container .swiper-pagination',
        paginationClickable: true,
        autoplay: 3000,
        autoplayDisableOnInteraction : false,
        loop : true,
    });
    //立即兑换
    $("[data-attach-point='submit']").click(function(){
        var goodId=$("[data-attach-point='goodsId']").val();
        var obj={
            action:"getChangGoods",
            user_id:$.cookie("uid"),
            goods_id:goodId
        }
        InfoChannel.getDataByAjax(url, obj,function(data){
            if(data){
                window.location.href="/jfExchange/"+goodId+".html";
            }else{
                $("[data-attach-point='tophis']").text("您的积分不足！快去积攒吧");
                $("#top").show();
                $("#below").show();
                $("#cancel").click(function(){$("#top").hide();$("#below").hide();});
                $("#confirm").click(function(){$("#top").hide();$("#below").hide();});
            }
        });
    });
    //查看详情
    $("[data-attach-point='detailImg']").click(function(){
        $("[data-attach-point='detailImgCont']").show();
    });
    $("[data-attach-point='detailImgBack']").click(function(){
        $("[data-attach-point='detailImgCont']").hide();
    });
    //************************加载优化配置文件***************************************************
    require(['libConfig']);
})