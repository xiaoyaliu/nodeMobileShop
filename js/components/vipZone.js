/**
 * author:zhouxiangbo
 * date:2017-08-09
 * description:
 */
define([
    'jquery',
    'infoChannel',
    'utilTool',
    'doT',
    'text!tpl/vipZoneList.tpl'
], function (jquery, InfoChannel, UtilTool, doT, vipTpl) {
//doT编译模版
    var vipZoneListTemp = doT.template(vipTpl);

//前端分页参数
    var start = 0;//数据开始位置
    var end = 0;//数据截至位置
    var size = 8;//步长
    var dataList = [];

//初始化数据
    var url = configData.dataHost + '/index.php';//设置url
    var param = {
        action: 'getCouponGoodslast'
    };
    InfoChannel.getDataByAjax(url, param, function (obj) {
        if(obj.status){
            dataList=obj.data;
        }
    });

//滚动加载
    $(document).bind('scroll', onScroll);
    function onScroll(event) {
        //是否到底部（这里是判断离底部还有100px开始载入数据）.
        var closeToBottom = ($(window).scrollTop() + $(window).height() > $(document).height() - 100);
        if (closeToBottom) {
            if (end < dataList.length) {
                start=end;
                end = start + size;
                var arr = dataList.slice(start, end);
                if (arr.length !== 0) {
                    $('[data-attach-point=togetherList]').append(vipZoneListTemp(arr));
                } else {
                    $('[data-attach-point=none]').show();
                }
            }else {
                $('[data-attach-point=none]').show();
            }
        }
    };
//加入购物车动效
    $('[data-attach-point=order-list]').on('click','[data-attach-point=addCar]', function (e) {
        var sid = $.cookie("sid");
        var uid = $.cookie("uid");
        var gid=$(this).attr("gid");
        var urlCart = configData.dataHost + '/cart.php';//设置url
        param={
            action:"insert_cart",
            sid:sid,
            user_id:uid,
            goods_id:gid,
            goods_number:"1"
        };
        InfoChannel.getDataByAjax(urlCart, param, function (data){
            $("[data-attach-point=snm]").text(data.cartnum);
            $.cookie("cartnum",data.cartnum,{path: '/' });//将购物车数量加入cookie

            $('.diaInfo').text('加入购物车成功');
            $(".dialog").show().fadeOut(2000);
            e.stopPropagation();
        });
    });

    //显示更多
    $("#go-quick-click").click(function(event){
        $("#quick-go-div").slideToggle();
        event.stopPropagation();
    });
    $("body").click(function(){
        if($("#quick-go-div").css("display")=="block"){
            $("#quick-go-div").slideUp();
        }
    });
    //设置回到顶部动效
    UtilTool.goTop();
})