/**
 * Created by liuxiaoya on 2016/8/16 0016.
 * 物流
 */
define([
	  'jquery',
	  'infoChannel',
	  'swiper',
	  'cookie',
	  'doT',
	  'utilTool',
	  'text!tpl/logisticsGo.tpl'

], function (jquery, InfoChannel,swiper, cookie, doT, utilTool, logisticsTpl) {
	  var logistics = doT.template(logisticsTpl);//doT编译模版
	  var uid=$.cookie("uid");
	  var param = {
			uid: uid,
			action:"shippingView"
	  };
	  var num=Math.floor($(window).width()/78);//计算slide数量
	  var width=num*78;//计算slide总长度
	  var url = configData.dataHost + '/my.php';//设置url
	  InfoChannel.getDataByAjax(url, param, function (data) {
			if(data.flag){
				  if(data.seo) {
						utilTool.renderKeyWords(data.seo);
				  }
			  $("[data-attach-point=data]").html(logistics(data.orderInfo));
				  var mySwiper = new Swiper('[data-attach-point=allList] .swiper-container2',{
						slidesPerView : num,
						width:width,
						spaceBetween : 10
				  })
			}else{
				  //location.href="/error";
			}
	  });

	  //链接
	  $("#go-quick-click").click(function(event){
			$("#quick-go-div").slideToggle();
			event.stopPropagation();
	  });
	  $("body").click(function(){
			if($("#quick-go-div").css("display")=="block"){
				  $("#quick-go-div").slideUp();
			}
	  });
	  //确认收货
	  window.affirmOrder=function(that,oid){
			var paramOPe={
				  oid:oid,
				  action:"affirm_received",
				  uid:uid
			}
			$("#tophis").html("您确定要确认收货吗？");
			$("#top").show();
			$("#below").show();
			$("#ok").off("click").on('click',function(event){
				  InfoChannel.getDataByAjax(url, paramOPe, function (data) {
						if(data.flag){
							  window.location.href="/order/"+param.action;
						}
				  });
			})
	  };
	  $("#cancel").on('click',function(){
			$("#top").hide();
			$("#below").hide();
	  });
});