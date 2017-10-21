/**
 * author:zhouxiangbo
 * date:20170915
 * description:一元秒杀
 */
define([
    'jquery',
    'infoChannel',
    'utilTool',
    'doT',
    'text!tpl/oneSkList.tpl'
], function (jquery, InfoChannel, UtilTool, doT, oneSkTpl) {
//doT编译模版
    var vipZoneListTemp = doT.template(oneSkTpl);

//前端分页参数
    var start = 0;//数据开始位置
    var end = 0;//数据截至位置
    var size = 8;//步长
    var dataList = [];
    var dataTime={};

//初始化数据
    var url = configData.dataHost + '/index.php';//设置url
    var param = {
        action: 'getActGoodslast'
    };
    InfoChannel.getDataByAjax(url, param, function (obj) {
        if(obj.status){
            dataTime=obj.data;
            dataList=obj.data.goods_list;
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
    //倒计时:
    var remainSeconds;
    var InterValObj;

    window.leftTime=function() {
        var on=$("[data-attach-point='on']").val();
        if(on==1){
            remainSeconds = parseInt($("[data-attach-point='endtime']").val() - $("[data-attach-point='curtime']").val()); //获取活动剩余的毫秒数
        }else if(on==0){
            remainSeconds = parseInt($("[data-attach-point='startime']").val() - $("[data-attach-point='curtime']").val());
        }
        InterValObj = window.setInterval(SetRemainTime, 1000); //间隔函数，1秒执行
    };
    leftTime();
    //将时间减去1秒，计算天、时、分、秒
    function SetRemainTime() {
        if (remainSeconds > 0) {
            remainSeconds = remainSeconds - 1;
            var second = Math.floor(remainSeconds % 60);             // 计算秒
            var minite = Math.floor((remainSeconds / 60) % 60);      //计算分
            var hour = Math.floor((remainSeconds / 3600) % 24);      //计算小时
            var day = Math.floor((remainSeconds / 3600) / 24);       //计算天

            second = checkTime(second);
            minite = checkTime(minite);
            hour = checkTime(hour);
            day = checkTime(day);

            $("[data-attach-point='days'] span").text(day);
            $("[data-attach-point='hours'] span").text(hour);
            $("[data-attach-point='minutes'] span").text(minite);
            $("[data-attach-point='seconds'] span").text(second);

            dayToggle();

        } else {
            //剩余时间小于或等于0的时候，就停止间隔函数
            window.clearInterval(InterValObj);
            //这里可以添加倒计时时间为0后需要执行的事件

        }
    }
    //将0-9的数字前面加上0
    function checkTime(i){
        if(i<10){
            i="0"+i;
        }
        return i;
    }
    //是否显示 天
    function dayToggle(){
        var day = $("[data-attach-point='days'] span");
        if(day.html()==0){
            $("[data-attach-point='days']").hide();
        }else{
            $("[data-attach-point='days']").show();
        }
    }












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