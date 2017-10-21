/**
 * Created by liuxiaoya；
 *date 2016/8/23 0023.
 *description 添加收货地址
 */
define([
	  'jquery',
	  'cookie',
	  'utilTool'
], function (jquery,cookie, utilTool) {
	  var uid = $.cookie("uid");var url = configData.dataHost + '/my.php';//设置url
	  var oid = utilTool.GetUrlPara();
      $("[data-attach-point=exchange]").attr("href","/exchange/"+oid);
	  $("[data-attach-point=refund]").attr("href","/refund/"+oid);

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

