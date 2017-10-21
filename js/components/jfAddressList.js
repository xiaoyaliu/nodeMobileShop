/**
 * Created by zhouxiangbo on 2017/7/31 0031.
 * description:
 */
define([
    'jquery',
    'infoChannel',
    'cookie',
    'doT',
    'utilTool',
    'text!tpl/jfAddressList.tpl'
], function (jquery, InfoChannel, cookie, doT, utilTool, jfAddressListTpl) {
    var ListTpl = doT.template(jfAddressListTpl);//doT编译模版
    var uid = $.cookie("uid");
    var param = {
        uid: uid,
        action: "allAddress"
    };
    var browserList = $("[data-attach-point=browserList]");
    var list = $("[data-attach-point=list]");
    var url = configData.dataHost + '/cart.php';//设置url
    var url2 = configData.dataHost + '/my.php';//设置url
    var url3 = configData.dataHost + '/integral.php';//设置url
    InfoChannel.getDataByAjax(url, param, function (data) {
        if (data.flag) {
            if (data.seo) {
                utilTool.renderKeyWords(data.seo);
            }
            $("[data-attach-point=data]").html(ListTpl(data.allAddress));
        }
    });


    //添加收货地址
    window.insertAdd = function () {
        var id=$("[data-attach-point='hidgoodId']").val();
        if ($("[data-attach-point=addressList]").length - 10 < 0) {
            window.location.href = "/jfAddrInsert/"+id;
        } else {
            $("#common-div").html("您已添加10条地址，请删除后再添加").show();
            setTimeout(function () {
                $("#common-div").html("").hide();
            }, 1000)
        }
    };
    //设置收货地址
    window.setDefault = function (that, id) {
        var paramSet = {
            uid: uid,
            action:"setDefault",
            addressId:id
        };
        if ($(that).html() !== "默认地址") {
            InfoChannel.getDataByAjax(url, paramSet, function (data) {
                if (data.flag) {
                    $("[data-attach-point=label]").html("设为默认");
                    $(that).html("默认地址");
                    $("[data-attach-point=checked]").removeAttr("checked");
                    $(that).prev("input").attr("checked", "checked");
                } else {
                    $("#common-div").html("默认地址设置失败").show();
                    setTimeout(function () {
                        $("#common-div").html("").hide();
                    }, 1000)
                }

            });
        }
    }
    //删除收货地址
    window.delAddress = function (that, id) {
        var paramDel={
            uid: uid,
            id:id,
            type:"del",
            action:"address_op"
        };
        $("#top").show();
        $("#below").show();
        $("#ok").off("click").on('click', function (event) {
            InfoChannel.getDataByAjax(url2, paramDel, function (data) {
                if (data.flag) {
                    $(that).parents("[data-attach-point=addressList]").remove();
                    if ($("[data-attach-point=addressList]").length == 0) {
                        location.reload();
                    }
                }
                $("#top").hide();
                $("#below").hide();
            });
        })
    };
    //关闭删除框
    $("#cancel").on('click', function () {
        $("#top").hide();
        $("#below").hide();
    });

    window.goOrderSure=function(id){
        var goodsId= $("[data-attach-point='hidgoodId']").val();
        var paramSet={
            action:"getOrderLast",
            user_id:uid,
            address_id:id,
            goods_id:goodsId
        };
        InfoChannel.getDataByAjax(url3, paramSet, function (data) {
            //console.log(data);
                location.href="/jfExchange/"+goodsId+"_"+id+".html";
        });
    };
    //编辑地址
    window.editAddr=function(that){
        var id=$("[data-attach-point='hidgoodId']").val();
        window.location.href="/jfAddrEdit/"+that+"_"+id;
    }
    utilTool.goTop();//回到顶部
});

