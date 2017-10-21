/**
 * Created with youde
 * company:郑州优德
 * author:zhanglifeng
 * date:2017/8/7 0007 下午 2:12
 * description:
 */
define([
    'jquery',
    'infoChannel',
    'utilTool',
    'doT',
    'text!tpl/voteInfoList.tpl',
    'text!tpl/voteUsersInfo.tpl'
], function (jquery,InfoChannel,UtilTool,doT,voteTpl,voteUsersInfoTpl) {
    var voteTemp = doT.template(voteTpl);//doT编译模版
    var voteUsersTemp = doT.template(voteUsersInfoTpl);//doT编译模版
    var url = configData.dataHost + '/vote.php';//设置url
    var params = {
        action: "mascot_vote",
        user_name: "",
        mobile: "",
        mascot_name: ""
    };
    window.submitForm = function () {
        var mobile = /^1[3|4|5|7|8]\d{9}$/;
        var tel = $("[data-attach-point='mobile']").val();

        if($("[data-attach-point='mascotName']").val() == ""){
            $("[data-attach-point='tips']").text("吉祥物名称不能为空").show().fadeOut(2000);
            return false;
        }else{
            params.mascot_name = $("[data-attach-point='mascotName']").val();
        }

        if($("[data-attach-point='userName']").val() == ""){
            $("[data-attach-point='tips']").text("报名者姓名不能为空").show().fadeOut(2000);
            return false;
        }else{
            params.user_name = $("[data-attach-point='userName']").val();
        }

        if(tel == ''){
            $("[data-attach-point='tips']").text("报名者电话不能为空").show().fadeOut(2000);
            return false;
        }else if(!mobile.test(tel)){
            $("[data-attach-point='tips']").text("报名者电话格式不正确").show().fadeOut(2000);
            return false;
        }else{
            params.mobile = tel;
        }

        InfoChannel.getDataByAjax(url, params,voteCallBack);
    };
    function voteCallBack(data){
        console.log(data);
        if(data.status == "fail"){
            $("[data-attach-point='tips']").text(data.msg).show().fadeOut(2000);
        }else {
            $("[data-attach-point='tips']").text(data.msg).show().fadeOut(2000);
        }
    }

    //投票统计列表
    var url2 = configData.dataHost + '/votecal.php';//设置url
    var params2 = {
        action: "votelist"
    };

    //前端分页参数
    var start = 0;//数据开始位置
    var size = 20;//步长
    var end = size;//数据截至位置
    var dataList;


    InfoChannel.getDataByAjax(url2, params2,function(data){
        console.log(data.list);
        dataList = data.list;
        //$("[data-attach-point=voteList]").html(voteTemp(data.list));
        $("[data-attach-point=voteList]").html(voteTemp(dataList.slice(start,size)));
        $("[data-attach-point='allCont']").text(data.all);
        $("[data-attach-point='category']").text(data.cates);
    });

    //滚动加载
    $(document).bind('scroll', onScroll);
    function onScroll(event) {
        //是否到底部（这里是判断离底部还有100px开始载入数据）.
        var closeToBottom = ($(window).scrollTop() + $(window).height() > $(document).height() - 100);
        if (closeToBottom) {
            if (dataList.length !== end) {
                start = end;
                end = end + size;
                var arr = dataList.slice(start, end);
                //console.log(arr);
                if (arr.length !== 0) {
                    $('[data-attach-point=voteList]').append(voteTemp(arr));
                } else {
                    $('[data-attach-point=none]').show();
                }
            }
        }
    };





    //每一条的选中状态
    window.changeStatus = function(self){
        var checked = $(self).next("input").val();
        var mascotName = $(self).parent().parent().find('[data-attach-point=mascotName]').html();
        var params3={
            action:'checked',
            checked:'',
            mascot_name:mascotName
        };
        if(checked == 0){
            params3.checked=1;
            InfoChannel.getDataByAjax(url2,params3,function(data){
                console.log(data);
                if(data){
                    $(self).text("已选中");
                    $(self).next("input").val('1')
                }
            })
        }else{
            params3.checked=0;
            InfoChannel.getDataByAjax(url2,params3,function(data){
                console.log(data);
                if(data){
                    $(self).text("选中");
                    $(self).next("input").val('0')
                }
            })
        }
    };

    window.viewUsers = function(self){
        var mascotName = $(self).parent().parent().find('[data-attach-point=mascotName]').html();
        var params = {
            action: 'getname',
            mascot_name:mascotName
        };
        $("[data-attach-point=voteInfoWrap]").hide();
        $("[data-attach-point=usersInfoWrap] ul.usersList").empty();
        $("[data-attach-point=usersInfoWrap]").show();

        InfoChannel.getDataByAjax(url2,params,function(data){
            console.log(data);
            $("[data-attach-point=usersInfoWrap] ul.usersList").html(voteUsersTemp(data));
            $("[data-attach-point=usersInfoWrap]").show();
        });
    };
    window.closeVoteInfo = function(){
        $("[data-attach-point=voteInfoWrap]").show();
        $("[data-attach-point=usersInfoWrap] ul.usersList").empty();
        $("[data-attach-point=usersInfoWrap]").hide();
    }
    //设置回到顶部动效
    UtilTool.goTop();
});