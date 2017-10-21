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
	  'text!tpl/concernList.tpl',
	  'text!tpl/concernNull.tpl'
], function (jquery, InfoChannel, dropload, cookie, doT, utilTool, collectListTpl,concernNull) {
	  var ListTpl = doT.template(collectListTpl);//doT编译模版
	  var nullTpl = doT.template(concernNull);//doT编译模版
	  var uid = $.cookie("uid");
	  var param = {
			uid: uid,
			action: "collect",
			p: 1
	  };
	  var collectList = $("[data-attach-point=collectList]");
	  var list = $("[data-attach-point=list]");
	  var url = configData.dataHost + '/my.php';//设置url
	  var dropload= $("[data-attach-point=collectList]").dropload({
			scrollArea: window,
			domDown: {
				  domClass: 'dropload-down',
				  domRefresh: '<div class="dropload-refresh">加载中...</div>',
				  domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
				  domNoData: '<div class="dropload-noData">没有更多啦</div>'
			},
			loadDownFn: function (me) {
				  InfoChannel.getDataByAjax(url, param, function (data) {
						if (data.data.length === 0) {//无数据
							  dropload.lock();
							  dropload.noData();
							  if (param.p === 1) {
									$("[data-attach-point=box]").remove();
									$("[data-attach-point=noData]").html(nullTpl(data.data));
							  }
						} else {
							  list.append(ListTpl(data.data));
							  param.p = param.p + 1;
							  if (data.length < 10) {
									dropload.lock();
									dropload.noData();
							  }
                             $("[data-attach-point=clearAll]").css("display","inline-block");
						}
						me.resetload();// 每次数据加载完，必须重置
				  });
			}
	  });
     //立即购买
	  window.goBuy=function(gid){
			var paramBuy={
				  action:"buyNow",
				     uid:uid,
					gid:gid
			}
			InfoChannel.getDataByAjax(url, paramBuy, function (data) {
				  if(data.flag){
						window.location.href="/cart";
				  }
			});
	  }
	  var paramDel = {
			uid: uid,
			action:"delcol"
	  };
	  //清空浏览记录
	  $("[data-attach-point=clearAll]").on("click",function(){
			paramDel.act="all";
			$("#tophis").html("您确定要清空所以关注吗？");
			$("#top").show();
			$("#below").show();
			$("#ok").off("click").on('click',function(event){
				  InfoChannel.getDataByAjax(url, paramDel, function (data) {
						if(data.flag){
							location.reload();
						}
				  });
			})
	  });
	  //删除单条浏览记录
	  window.delBrowser = function (that, col) {
			paramDel.act="one";
			paramDel.col=col;
			$("#tophis").html("您确定要删除此条关注吗？");
			$("#top").show();
			$("#below").show();
			$("#ok").off("click").on('click',function(event){
				  InfoChannel.getDataByAjax(url, paramDel, function (data) {
						if(data.flag){
							 $(that).parents("[data-attach-point=browser-box]").remove();
						}
						$("#top").hide();
						$("#below").hide();
				  });
			})
	  };
	  //关闭删除框
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

	  utilTool.goTop();//回到顶部
});
