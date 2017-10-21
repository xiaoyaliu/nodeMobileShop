/**
 * Created by liuxiaoya；
 *date 2016/8/23 0023.
 *description 添加收货地址
 */
define([
	  'jquery',
	  'infoChannel',
	  'cookie',
	  'doT',
	  'utilTool',
	  'text!tpl/zoneList.tpl'
], function (jquery, InfoChannel,cookie, doT, utilTool,zoneList) {
	  var listTpl=doT.template(zoneList);
	  var uid = $.cookie("uid");
	  var param = {
			uid: uid,
			action: "address_save"
	  };
	  var url = configData.dataHost + '/my.php';//设置url
	  var urlCart = configData.dataHost + '/cart.php';//设置url
	  $("[data-attach-point=returnNex]").on("click", function () {
			returnNext();
	  });

	  $(".button_mo").on("click", function () {
			if ($(this).hasClass("button_off_mo")) {
				  $(this).removeClass("button_off_mo");
				  $(this).addClass("button_on_mo");
				  $("[name=setdefault]").val(1);
			} else {
				  $(this).addClass("button_off_mo");
				  $(this).removeClass("button_on_mo");
				  $("[name=setdefault]").val(0);
			}
	  })

	  $("[data-attach-point=return]").on("click", function () {
			setTimeout(function () {
				  $(".usercity").hide();
			}, 300);
			$("[data-attach-point=area]").removeClass("animal");
	  })
	   window.areaShow=function() {
			$("[data-attach-point=area]").addClass("animal");
			 if($("[data-attach-point=province] li").length===0){
			 var paramAddr={
				   action:"prolist",
				   uid:uid
			 };
			 InfoChannel.getDataByAjax(url,paramAddr,function(data){
				   if(data.flag){
					$("[data-attach-point=province] ul").append(listTpl(data.data.provinceList));
				   $("[data-attach-point=province]").show();
				   }
			 });
			 }else{
				   $("[data-attach-point=province]").show();
			 }
	  }

	  function returnNext() {
			$(".usercity").each(function () {
				  if ($(this).css("display") == "block") {
						if ($(this).index() > 0) {
							  var index = $(this).index();
							  $(this).hide();
							  $(".usercity").eq(index - 1).show();
						} else {
							  $(this).hide();
							  $("[data-attach-point=area]").removeClass("animal");
						}
				  }
			})
	  }
	  $("[ data-attach-point=province]").on("click","li",function(){
			var that=$(this);
			$("[ data-attach-point=province] li").removeClass("active");
			that.addClass("active");
			var pid=that.attr("data-id");
			var data={
				  action:"zonelist",
				  uid:uid,
				  type:2,
				  pid:pid
			}
           $("[name=province]").val(pid);
			InfoChannel.getDataByAjax(url,data,function(data){
				  if(data.flag) {
						$("[data-attach-point=city] ul").html("");
						$("[data-attach-point=city] ul").append(listTpl(data.data.zoneList));
						$("[data-attach-point=city]").show();
						$("[data-attach-point=province]").hide();
				  }
			})
	  })
	  $("[ data-attach-point=city]").on("click","li",function(){
			var that=$(this);
			$("[ data-attach-point=city] li").removeClass("active");
			that.addClass("active");
			var pid=that.attr("data-id");
			var data={
				  action:"zonelist",
				  uid:uid,
				  type:3,
				  pid:pid
			}
          $("[name=city]").val(pid);
			InfoChannel.getDataByAjax(url,data,function(data){
				  if(data.flag) {
						$("[data-attach-point=district] ul").html("");
						 $("[data-attach-point=district] ul").append(listTpl(data.data.zoneList));
						$("[data-attach-point=district]").show();
						$("[data-attach-point=city]").hide();
				  }
			})
	  });
	  $("[ data-attach-point=district]").on("click","li",function() {
			var that = $(this);
			$("[ data-attach-point=district] li").removeClass("active");
			that.addClass("active");
			var pid=that.attr("data-id");
			$("[name=district]").val(pid);
			setTimeout(function () {
				  $(".usercity").hide();
			}, 300);
			$("[data-attach-point=area]").removeClass("animal");
			var info= $("[data-attach-point=province] li.active").html()+$("[data-attach-point=city] li.active").html()+$("[data-attach-point=district] li.active").html();
			$("[data-attach-point=addressInfo]").val(info);
	  })
	  function errorHide() {
			setTimeout(function () {
				  $("#common-div").css({"width":"76%","height":"32px"});
				  $("#common-div").hide();
			}, 1000);
	  }

	  $("[ data-attach-point=save]").on("click",function(){
			var i = /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,20}/;
			if (!i.test($('input[name=consignee]').val())) {
				  $("#common-div").css({"width":"84%","height":"64px"});
				  $("#common-div").html("收件人只能由1-20位</br>中文、英文字符或数字组成").show();
				  errorHide();
				  return false;
			}
			else if (!utilTool.checkPhone($('input[name=mobile]').val())) {
				  $("#common-div").html("请输入正确的手机号码").show();
				  errorHide();
				  return false;
			}
			else if ($("[data-attach-point=addressInfo]").val() == "") {
				  $("#common-div").html("请选择所在地区").show();
				  errorHide();
				  return false;
			}
			else if ($("[name=address]").val() == "") {
				  $("#common-div").html("请填写详细地址").show();
				  errorHide();
				  return false;
			}
			else {
				  var data=$("[data-attach-point=form]").serialize();
				  var url2=urlCart+"?uid="+uid+"&action=addressSave";
				  InfoChannel.getDataByAjax(url2,data,function(data){
						if(data.flag){
							  var paramSet={
									action:"useAddress",
									uid:uid,
									addressId:data.addressId
							  };
							  InfoChannel.getDataByAjax(urlCart, paramSet, function (data2) {
									if (data2.flag) {
										  location.href="/orderSure";
									}
							  })
						}
				  })
			}
	  })
});

