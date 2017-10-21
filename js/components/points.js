/**
 * Created by liuxiaoya on 2016/8/16 0016.
 浏览记录
 */
define([
	  'jquery',
	  'infoChannel',
	  'dropload',
	  'cookie',
	  'doT',
	  'utilTool',
	  'text!tpl/points.tpl'
], function (jquery, InfoChannel, dropload, cookie, doT, utilTool, pointsTpl) {
	  var pointsTpl = doT.template(pointsTpl);//doT编译模版
	  //var nullTpl = doT.template(concernNull);//doT编译模版
	  var uid = $.cookie("uid");
	  var param = {
			uid: uid,
			action: "points_list"
	  };
	  var collectList = $("[data-attach-point=collectList]");
	  var list = $("[data-attach-point=list]");
	  var url = configData.dataHost + '/my.php';//设置url
	  InfoChannel.getDataByAjax(url, param, function (data) {
			if (data.flag) {
				  if (data.seo) {
						utilTool.renderKeyWords(data.seo);
				  }
				  $('[data-attach-point=data]').html(pointsTpl(data.data));
				  $("[data-attach-point=goadd]").on("click", function () {
						$("[data-attach-point=point]").show();
						$("[data-attach-point=pointlist] li").hide();
						$(this).siblings("li").removeClass("active");
						$(this).addClass("active");
						$("[data-attach-point=add]").show();
				  });
				  $("[data-attach-point=gore]").on("click", function () {
						$("[data-attach-point=point]").show();
						$("[data-attach-point=pointlist] li").hide();
						$(this).siblings("li").removeClass("active");
						$(this).addClass("active");
						$("[data-attach-point=re]").show();

				  });
				  $("[data-attach-point=all]").on("click", function () {
						$(this).siblings("li").removeClass("active");
						$(this).addClass("active");
						$("[data-attach-point=point]").show();
						$("[data-attach-point=pointlist] li").show();
				  })
			} else {
				  $('[data-attach-point=points-no]').show();
			}
	  });

	  utilTool.goTop();//回到顶部
});
