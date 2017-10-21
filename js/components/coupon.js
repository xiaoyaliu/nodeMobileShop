define([
	  'jquery',
	  'infoChannel',
	  'cookie',
	  'doT',
	  'utilTool',
	  'text!tpl/coupon.tpl'
], function (jquery, InfoChannel, cookie, doT, utilTool, couponTpl) {
     var listTemp = doT.template(couponTpl);//doT编译模版
	  var uid=$.cookie("uid");
	  var param = {
			uid: uid,
			action:"bo"
	  };
	  var url = configData.dataHost + '/my.php';//设置url
	  InfoChannel.getDataByAjax(url, param, function (data) {//初始化数据
			if(data.flag){
				  if (data.seo) {
						utilTool.renderKeyWords(data.seo);
				  }
				  $("[data-attach-point=data]").html(listTemp(data.data));
			}

			$("[data-attach-point=deleteAll]").on("click",function(){
				  $("#top").show();
				  $("#below").show();
				  $("#ok").off("click").on('click',function(event){
						InfoChannel.getDataByAjax(url,{uid:uid,action:"delallbo"},function(data){
							  if(data.flag){
									location.reload();
							  }
						});
				  })

			});
	  });
	  window.tabChange=function(that,nowIndex){
	  var $this = $(that);
	  $this.addClass('active').siblings('li').removeClass('active');
	  $('[data-attach-point=tabSon]').eq(nowIndex).show().siblings('[data-attach-point=tabSon]').hide();
		if(nowIndex===2){
           $("header").append('<div class="go_edit" id="go_edit"> <a>编辑</a></div>');
		}else if($("#go_edit").length>0){
			  $("#go_edit").remove();
		}
	  };
	  $("header").on("click","#go_edit",function(){
			var that=$(this).find("a");
			if(that.html()==="编辑"){
				  that.html("完成");
				  $("[data-attach-point=deleteBtn]").show();
			}else{
				  that.html("编辑");
				  $("[data-attach-point=deleteBtn]").hide();
			}

	  });
	  var paramDel={
			uid:uid,
			action:"delbo"
	  };
	  //删除单个优惠券
	  window.deleteCoupon=function(that,id){
            paramDel.id=id;
			InfoChannel.getDataByAjax(url,paramDel,function(data){
				  if(data.flag){
						$(that).parents(".coupon-expired").remove();
						var nouseNum=parseInt($("[data-attach-point=nouseNum]").text());
						$("[data-attach-point=nouseNum]").text(nouseNum-1);
				  }
			})
	  }
	  //关闭删除框
	  $("#cancel").on('click',function(){
			$("#top").hide();
			$("#below").hide();
	  });
});