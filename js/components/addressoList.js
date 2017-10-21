/**
 * Created by liuxiaoya；
 *date 2016/8/23 0023.
 *description收货地址列表
 */
define([
	  'jquery',
	  'infoChannel',
	  'cookie',
	  'doT',
	  'utilTool',
	  'text!tpl/addressoList.tpl'

], function (jquery, InfoChannel, cookie, doT, utilTool, addressListTpl) {
	  var ListTpl = doT.template(addressListTpl);//doT编译模版
	  var uid = $.cookie("uid");
	  var param = {
			uid: uid,
			action: "allAddress"
	  };
	  var browserList = $("[data-attach-point=browserList]");
	  var list = $("[data-attach-point=list]");
	  var url = configData.dataHost + '/cart.php';//设置url
	  var url2 = configData.dataHost + '/my.php';//设置url
	  InfoChannel.getDataByAjax(url, param, function (data) {
			if (data.flag) {
				  if (data.seo) {
						utilTool.renderKeyWords(data.seo);
				  }
				  $("[data-attach-point=data]").html(ListTpl(data.allAddress));
			}
	  });


	  //添加收货地址
	  window.insertAdd = function () {
			if ($("[data-attach-point=addressList]").length - 10 < 0) {
						window.location.href = "/addroInsert";
			} else {
				 $("#common-div").html("您已添加10条地址，请删除后再添加").show();
				  setTimeout(function () {
						$("#common-div").html("").hide();
				  }, 1000)
			}
	  };
	  //设置收货地址
	  window.setDefault = function (that, id) {
			var paramSet = {
				  uid: uid,
				  action:"setDefault",
				  addressId:id
			};
			if ($(that).html() !== "默认地址") {
				  InfoChannel.getDataByAjax(url, paramSet, function (data) {
						if (data.flag) {
							  $("[data-attach-point=label]").html("设为默认");
							  $(that).html("默认地址");
							  $("[data-attach-point=checked]").removeAttr("checked");
							  $(that).prev("input").attr("checked", "checked");
						} else {
							  $("#common-div").html("默认地址设置失败").show();
							  setTimeout(function () {
									$("#common-div").html("").hide();
							  }, 1000)
						}

				  });
			}
	  }
	  //删除收货地址
	  window.delAddress = function (that, id) {
			var paramDel={
				  uid: uid,
				  id:id,
				  type:"del",
				  action:"address_op"
			};
			$("#top").show();
			$("#below").show();
          $("#ok").off("click").on('click', function (event) {
              InfoChannel.getDataByAjax(url2, paramDel, function (data) {
                  if (data.flag) {
                      $(that).parents("[data-attach-point=addressList]").remove();
                      if ($("[data-attach-point=addressList]").length == 0) {
                          location.reload();
                      }
                  }
                  $("#top").hide();
                  $("#below").hide();
              });
          })
	  };


	  //关闭删除框
	  $("#cancel").on('click', function () {
			$("#top").hide();
			$("#below").hide();
	  });
	  window.goOrderSure=function(id){
			  var paramSet={
					action:"useAddress",
					uid:uid,
					addressId:id
			  };
		    	InfoChannel.getDataByAjax(url, paramSet, function (data) {
				  if (data.flag) {
						location.href="/orderSure";
				  }
				})
	  };
	  utilTool.goTop();//回到顶部
});

