/**
 * Created by liuxiaoya；
 *date 2016/11/29 0029.
 *description支付失败
 */

define([
	  'jquery'
], function (jquery) {
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

	  //************************加载优化配置文件***************************************************
	  //require(['libConfig']);
})