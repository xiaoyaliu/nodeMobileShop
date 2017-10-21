/**
 * Created by liuxiaoya；
 *date 2016/9/23 0023.
 *description支付回调
 */
define([
	  'jquery',
	  'infoChannel',
	  'cookie',
	  'doT',
	  'utilTool',
	  'text!tpl/payCallback.tpl'
], function (jquery, InfoChannel,cookie, doT, utilTool,payCallback) {
	  var uid = $.cookie("uid");
	  var listTpl = doT.template(payCallback);//doT编译模版
	  var url = configData.dataHost + '/my.php';//设置url
	  var oid = utilTool.GetUrlPara();//获取oid
	  var param = {//进度数据
			uid: uid,
			action: "orderPaySt",
			oid:oid
	  };
	  //渲染数据
	  InfoChannel.getDataByAjax(url,param,function(data) {

			if (data.flag) {
				  $("[data-attach-point=data]").html(listTpl(data.orderInfo));
			}else{
				  window.location.href="/404"
			}
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
	//支付成功抽奖的
	var drawUrl=configData.dataHost + '/draw.php';
    window.drawPart=function(oid){
        var drawParam={
            action:"drawForOrder",
            order_id:oid
        };
        console.log(drawParam);
        InfoChannel.getDataByAjax(drawUrl,drawParam,function(data) {
            if (data.flag) {
                $("[data-attach-point='tophis']").text("恭喜您！您抽中“优德之夜·热歌榜中榜门票”一张！我们会将门票快递到您的订单收货地址。");
                $("#top").show();
                $("#below").show();
            }else{
                $("[data-attach-point='tophis']").text("很遗憾！您未中奖，下单即有机会抽取“优德之夜·热歌榜中榜门票”");
                $("#top").show();
                $("#below").show();
            }
        });
        $("#cancel").click(function(){
            window.location.href="/oDetail/"+oid;
        });
        $("#confirm").off("click").click(function(){
            window.location.href="/oDetail/"+oid;
        });
	}

});
