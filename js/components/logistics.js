/**
 * Created by liuxiaoya on 2016/8/16 0016.
 * 物流
 */
define([
	  'jquery',
	  'infoChannel',
	  'cookie',
	  'doT',
	  'utilTool',
	  'text!tpl/logistics.tpl'

], function (jquery, InfoChannel, cookie, doT, utilTool, logisticsTpl) {
	  var logistics = doT.template(logisticsTpl);//doT编译模版
	  var oid = utilTool.GetUrlPara();
	  var uid=$.cookie("uid");
	  var param = {
			uid: uid,
			oid:oid,
			action:"delivery"
	  };
	  var url = configData.dataHost + '/my.php';//设置url
	  InfoChannel.getDataByAjax(url, param, function (data) {
			if(data.flag){
				  if(data.seo) {
						utilTool.renderKeyWords(data.seo);
				  }
			  $("[data-attach-point=body]").html(logistics(data.data));
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
			}else{
				  location.href="/error";
			}
	  });
});