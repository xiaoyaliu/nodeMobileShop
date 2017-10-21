/**
 * Created by liuxiaoya；
 *date 2016/8/31 0031.
 *description退换货记录
 */
define([
	  'jquery',
	  'infoChannel',
	  'cookie',
	  'doT',
	  'utilTool',
	  'text!tpl/returnRecord.tpl'

], function (jquery, InfoChannel, cookie, doT, utilTool, returnRecordTpl) {
	  var ListTpl = doT.template(returnRecordTpl);//doT编译模版
	  var uid = $.cookie("uid");
	  var param = {
			uid: uid,
			action: "rt_list"
	  };
	  var url = configData.dataHost + '/my.php';//设置url

	  //获取退换货记录数据
	  InfoChannel.getDataByAjax(url,param,function(data){
          if(data.flag){
				if(data.seo) {
					  utilTool.renderKeyWords(data.seo);
				}
				$("[data-attach-point=data]").html(ListTpl(data.data));
		  }
	  });
      $("[data-attach-point=tab]").on("click",function(){
			var that=$(this);
			var i=that.index();
			that.addClass("active").siblings("li").removeClass("active");
			if(i===0){
				  $("[data-attach-point=re]").show();
				  $("[data-attach-point=ex]").hide();
			}else{
				  $("[data-attach-point=re]").hide();
				  $("[data-attach-point=ex]").show();
			}
	  });
	  utilTool.goTop();//回到顶部
});
