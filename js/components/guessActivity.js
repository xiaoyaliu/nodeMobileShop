/**
 * Created by zhouxiangbo on 2017/8/25 0025.
 * description:
 */
define([
    'ready',
    'jquery',
    'infoChannel',
    'cookie',
    'utilTool',
    'slotmachine',
    'jweixin'
], function (ready, jquery, InfoChannel, cookie, utilTool, slotmachine, wx) {
    var dationUrl = configData.dataHost + '/draw.php';
    var partId = $('[data-attach-point=partId]').val();
    var paramAddr = {};
    paramAddr.name = $("[data-attach-point='wxName']").val();
    paramAddr.img = $("[data-attach-point='wxHeadImg']").val();
    paramAddr.oId = $("[data-attach-point='wxOid']").val();
    paramAddr.uId = $("[data-attach-point='wxUid']").val();
    //paramAddr.uId="oym4Ws0qkCBeJE6VFBFpbMF8xqkY";
    $.cookie("unid", paramAddr.uId, {path: '/'});
    var unid = $.cookie('unid');


    //微信
    var param = {
        url: location.href.split("#")[0]
    };
    InfoChannel.getDataByNode('/wechat', param, function (data) {
        var share_title = "优徳之夜·热歌榜中榜音乐盛典";
        var share_des = "优德之夜·热歌榜中榜大型音乐会猜明星抽门票活动";
        var icon_link = "http://m.youde.com/image/icon-guess.jpg";
        var real_link = "http://m.youde.com/shareState";
        wx.config({
            debug: false,

            appId: data.appid,

            timestamp: data.timestamp,

            nonceStr: data.nonceStr,

            signature: data.signature,

            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
            ]

        });
        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: share_title, // 分享标题
                link: real_link, // 分享链接
                imgUrl: icon_link, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareAppMessage({
                title: share_title, // 分享标题
                desc: share_des, // 分享描述
                link: real_link, // 分享链接
                imgUrl: icon_link, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
        wx.error(function (res) {

            console.info("配置失败");

            console.info(res);

        });


    });


    //验证
    window.getAnswer = function () {
        var answer = $('[data-attach-point="promptSub"]').val();
        var paramDation = {
            action: "checkStarName",
            starName: answer,
            drawId: partId
        };
        var paramDation2 = {
            action: "checkUserRecord",
            unionId: unid,
            drawId: partId
        };
        // console.log(paramDation);
        if (answer === "" || answer === undefined) {
            alert("请输入答案");
        } else {
            InfoChannel.getDataByAjax(dationUrl, paramDation2, function (data) {
                //console.log(data);
                if (data) {
                    InfoChannel.getDataByAjax(dationUrl, paramDation, function (data) {
                        if (data.flag) {
                            $("#below").show();
                            $("#top3").show();
                        } else {
                            $("#below").show();
                            $("#top2").show().fadeOut(5000, function () {
                                $("#below").hide();
                                window.location.href = '/guessNull'
                            });
                        }
                    });
                } else {
                    $('.diaInfo').text('您已经抽过奖啦，期待下次活动吧~');
                    $(".dialog").show().fadeOut(3500);
                }
            });
        }
        ;
    };

    //老虎机
    var machine1 = $("#machine1").slotMachine({active: 1, delay: 500});
    var machine2 = $("#machine2").slotMachine({active: 1, delay: 500});
    var machine3 = $("#machine3").slotMachine({active: 1, delay: 500});
    var l = 0;
    $("#lhj-l").off('click').on('click', function () {
        if (l != 0) {
            return;
        } else {
            document.getElementById("lhj-l").style.transform = "rotateX(-50deg)";
            setTimeout('document.getElementById("lhj-l").style.transform = "rotateX(0)";', 500);
            var drawParm = {
                action: 'drawService',
                drawId: partId,
                unionId: unid,//paramAddr.uId
                wxImage: paramAddr.img,
                wxName: paramAddr.name
            };
            console.log(drawParm);
            InfoChannel.getDataByAjax(dationUrl, drawParm, function (data) {
                console.log(data);
                if (data.flag) {//中奖
                    $("#below").show();
                    $("#top3").show();
                    //中奖
                    $("#machine1 div.slotMachineContainer").animate({"margin-top": "-474px"}, 500, "linear", function () {
                        $(this).animate({"margin-top": "-95px"}, 500, "linear", function () {
                            $(this).animate({"margin-top": "-474px"}, 500, "linear", function () {
                                $(this).animate({"margin-top": "-95px"}, 500, "linear");
                            });
                        });
                    });
                    $("#machine2 div.slotMachineContainer").animate({"margin-top": "-474px"}, 600, "linear", function () {
                        $(this).animate({"margin-top": "-95px"}, 600, "linear", function () {
                            $(this).animate({"margin-top": "-474px"}, 600, "linear", function () {
                                $(this).animate({"margin-top": "-95px"}, 600, "linear");
                            });
                        });
                    });
                    $("#machine3 div.slotMachineContainer").animate({"margin-top": "-474px"}, 700, "linear", function () {
                        $(this).animate({"margin-top": "-95px"}, 700, "linear", function () {
                            $(this).animate({"margin-top": "-474px"}, 700, "linear", function () {
                                $(this).animate({"margin-top": "-95px"}, 700, "linear");
                            });
                        });
                    });
                    setTimeout(function () {
                        $("#tips").text("恭喜~获得" + data.data);
                        window.location.href = '/guessEdit/' + data.data + "_" + partId;
                    }, 3000);
                } else {//未中奖
                    $("#machine1 div.slotMachineContainer").animate({"margin-top": "-474px"}, 500, "linear", function () {
                        $(this).animate({"margin-top": "-95px"}, 500, "linear", function () {
                            $(this).animate({"margin-top": "-474px"}, 500, "linear", function () {
                                $(this).animate({"margin-top": "-95px"}, 500, "linear");
                            });
                        });
                    });
                    $("#machine2 div.slotMachineContainer").animate({"margin-top": "-474px"}, 600, "linear", function () {
                        $(this).animate({"margin-top": "0px"}, 600, "linear", function () {
                            $(this).animate({"margin-top": "-474px"}, 600, "linear", function () {
                                $(this).animate({"margin-top": "0px"}, 600, "linear");
                            });
                        });
                    });
                    $("#machine3 div.slotMachineContainer").animate({"margin-top": "-474px"}, 700, "linear", function () {
                        $(this).animate({"margin-top": "-95px"}, 700, "linear", function () {
                            $(this).animate({"margin-top": "-474px"}, 700, "linear", function () {
                                $(this).animate({"margin-top": "-95px"}, 700, "linear");
                            });
                        });
                    });
                    setTimeout(function () {
                        $("#tips").text("没关系，下次手气一定会更好~！")
                        $("#below").hide();
                        $("#top3").hide();
                        window.location.href = '/guessNull'
                    }, 3000);

                }
            });
            l++;
        };

    });

    //跳转获奖名单
    window.hrefList = function () {
        window.location.href = '/guessName/' + partId;
    };


});