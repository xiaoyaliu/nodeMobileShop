/**
 * Created by liuxiaoya；
 *date 2016/9/6 0006.
 *description确认订单
 */
define([
	  'jquery',
	  'infoChannel',
	  'cookie',
	  'utilTool'
], function (jquery, InfoChannel, cookie, utilTool) {

	  var uid = $.cookie("uid");
	  var aid = utilTool.GetUrlPara();
	  var param = {
			uid: uid,
			action: "pay",
			oid:aid
	  };
	  var url = configData.dataHost + '/cart.php';//设置url
	  InfoChannel.getDataByAjax(url,param,function(data){
             if(data.flag){
				   if(data.seo) {
						 utilTool.renderKeyWords(data.seo);
				   }
				  $("#money").html(data.order.info.order_amount);
				   window.alipay=function(){
						 window.open(configData.dataHost +"/"+data.order.alipay);
				   };
				   window.unionpay=function(){
						 window.location.href=data.order.unionpay;
				   };
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
});