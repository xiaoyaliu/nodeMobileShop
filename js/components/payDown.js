/**
 * Created by liuxiaoya；
 *date 2016/9/6 0006.
 *description确认订单
 */
define([
	  'jquery',
	  'infoChannel',
	  'cookie',
	  'doT',
	  'utilTool',
	  'text!tpl/payDown.tpl'
], function (jquery, InfoChannel, cookie,doT, utilTool,payDownTpl) {
	  var payDown = doT.template(payDownTpl);//doT编译模版
	  var uid = $.cookie("uid");
	  var aid = utilTool.GetUrlPara();
	  var param = {
			uid: uid,
			action: "cashOnDelivery",
			oid:aid
	  };
	  var url = configData.dataHost + '/cart.php';//设置url
	  InfoChannel.getDataByAjax(url,param,function(data){
             if(data.flag){
				   if(data.seo) {
						 utilTool.renderKeyWords(data.seo);
				   }
				   $("body").html(payDown(data.order));
			 }
	  });

});