/**
 * Created by liuxiaoya on 2016/8/16
 * 订单详情
 */
define([
	  'jquery',
	  'infoChannel',
	  'cookie',
	  'doT',
	  'utilTool',
	  'text!tpl/orderDetails.tpl'

], function (jquery, InfoChannel, cookie, doT, utilTool, detailsTpl) {
	  var detailsTpl = doT.template(detailsTpl);//doT编译模版
	  var oid = utilTool.GetUrlPara();
	  var uid=$.cookie("uid");
	  var param = {
			uid: uid,
			oid:oid,
			action:"orderview"
	  };
	  var url = configData.dataHost + '/my.php';//设置url
	  //初始化页面信息
	  InfoChannel.getDataByAjax(url, param, function (data) {
	  		console.log(data);
			if(data.flag){
				  $("[data-attach-point=data]").html(detailsTpl(data.data));
			}else{
				  location.href="/error";
			}
			if(data.seo) {
				  utilTool.renderKeyWords(data.seo);
			}
	  });


	  //操作订单

	  //删除订单
	  window.deleteOrder=function(){
			param.action="del";
			$("#tophis").html("您确定要删除此订单吗？");
			$("#top").show();
			$("#below").show();
			$("#ok").off("click").on('click',function(event){
				  InfoChannel.getDataByAjax(url, param, function (data) {
						if(data.flag){
							 window.location.href="/user";
						}
				  });
			})
	  };

	  //取消订单
	  window.cancelOrder=function(){
			param.action="cancel_order";
			$("#tophis").html("您确定要取消此订单吗？");
			$("#top").show();
			$("#below").show();
			$("#ok").off("click").on('click',function(){
				  InfoChannel.getDataByAjax(url, param, function (data) {
						if(data.flag){
							  location.reload();
						}
				  });
			})
	  };

	  //确认收货
	  window.affirmOrder=function(){
			param.action="affirm_received";
			$("#tophis").html("您确定要确认收货吗？");
			$("#top").show();
			$("#below").show();
			$("#ok").off("click").on('click',function(event){
				  InfoChannel.getDataByAjax(url, param, function (data) {
						if(data.flag){
							  location.reload();
						}
				  });
			})
	  };

	  //再次购买
	  window.goBuyAgain=function(){
			param.action="goCart";
			InfoChannel.getDataByAjax(url, param, function (data) {
				  if(data.flag){
						window.location.href="/cart";
				  }
			});
	  };
	  //是否能评价
	  window.isEvaluate=function(oid){
			InfoChannel.getDataByAjax(url,{action:"ToComment",uid:uid,oid:oid},function(data){
				  if(data.flag===1){
						$("#common-div").show().fadeOut(2000);
				  }else{
						window.location.href="/evaluate/"+oid;
				  }
			});
	  };
	  $("#cancel").on('click',function(){
			$("#top").hide();
			$("#below").hide();
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