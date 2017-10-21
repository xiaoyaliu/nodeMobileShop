/**
 * Created by zhouxiangbo；
 *date 2017/8/1 0023.
 *description 添加收货地址
 */
define([
	  'jquery',
	  'infoChannel',
	  'cookie',
	  'doT',
	  'utilTool',
	  'text!tpl/jfAddrInsert.tpl',
	  'text!tpl/addressSpit.tpl',
	  'text!tpl/zoneList.tpl'
], function (jquery, InfoChannel, cookie, doT, utilTool, addressTpl, spitTpl,zoneList) {
	  var uid = $.cookie("uid");
	  var addrTpl = doT.template(addressTpl);//doT编译模版
	  var spitList = doT.template(spitTpl);//doT编译模版
	  var listTpl=doT.template(zoneList);
	  var url = configData.dataHost + '/cart.php';//设置url
	  var urlMy = configData.dataHost + '/my.php';//设置url
	  var aid = utilTool.GetUrlPara();
	  var param = {
			uid: uid,
			action: "addressSave"
	  };
	  var paramGet = {
			uid: uid,
			action: "addressEdit",
			addressId: aid
	  };
	  var userPath;//判断来源
	  var arr=location.pathname.split("/");
      if(arr[1]==="addroEdit"){
			userPath=true;
	  }
	  //初始化地址信息
	  InfoChannel.getDataByAjax(url, paramGet, function (data) {
			if (data.flag) {
				  $("[data-attach-point=data]").html(addrTpl(data.data))
				  $("[data-attach-point=province] ul").html(spitList(data.data));
			}/*else{
				        var errorDiv = "<div id='common-div'></div>";
						$("body").after(errorDiv);
						errorHide();
			}*/
	  });
	  $("[data-attach-point=returnNex]").on("click", function () {
			returnNext();
	  });

	  //设置默认收货地址
	  $("[data-attach-point=data]").on("click", ".button_mo", function () {
			if ($(this).hasClass("button_off_mo")) {
				  $(this).removeClass("button_off_mo");
				  $(this).addClass("button_on_mo");
				  $("[name=setdefault]").val(1);
			} else {
				  $(this).addClass("button_off_mo");
				  $(this).removeClass("button_on_mo");
				  $("[name=setdefault]").val(0);
			}
	  });

	  $("[data-attach-point=return]").on("click", function () {
			setTimeout(function () {
				  $(".usercity").hide();
			}, 300);
			$("[data-attach-point=area]").removeClass("animal");
	  });

	  //选择收货地址
	  window.areaShow = function () {
			$("[data-attach-point=area]").addClass("animal");
			$("[data-attach-point=province]").show();
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

//选择省
	  $("[ data-attach-point=province]").on("click", "li", function () {
			var that = $(this);
			$("[ data-attach-point=province] li").removeClass("active");
			that.addClass("active");
			var pid = that.attr("data-id");
			var data = {
				  action: "zonelist",
				  uid: uid,
				  type: 2,
				  pid: pid
			}
			$("[name=province]").val(pid);
			InfoChannel.getDataByAjax(urlMy, data, function (data) {
				  if (data.flag) {
						$("[data-attach-point=city] ul").html("");
						$("[data-attach-point=city] ul").append(listTpl(data.data.zoneList));
						$("[data-attach-point=city]").show();
						$("[data-attach-point=province]").hide();
				  }
			})
	  })

	  //选择市
	  $("[ data-attach-point=city]").on("click", "li", function () {
			var that = $(this);
			$("[ data-attach-point=city] li").removeClass("active");
			that.addClass("active");
			var pid = that.attr("data-id");
			var data = {
				  action: "zonelist",
				  uid: uid,
				  type: 3,
				  pid: pid
			};
			$("[name=city]").val(pid);
			InfoChannel.getDataByAjax(urlMy, data, function (data) {
				  if (data.flag) {
						$("[data-attach-point=district] ul").html("");
						$("[data-attach-point=district] ul").append(listTpl(data.data.zoneList));
						$("[data-attach-point=district]").show();
						$("[data-attach-point=city]").hide();
				  }
			})
	  });

	  //选择县
	  $("[ data-attach-point=district]").on("click", "li", function () {
			var that = $(this);
			$("[ data-attach-point=district] li").removeClass("active");
			that.addClass("active");
			var pid = that.attr("data-id");
			$("[name=district]").val(pid);
			setTimeout(function () {
				  $(".usercity").hide();
			}, 300);
			$("[data-attach-point=area]").removeClass("animal");
			var info = $("[data-attach-point=province] li.active").html() + $("[data-attach-point=city] li.active").html() + $("[data-attach-point=district] li.active").html();
			$("[data-attach-point=addressInfo]").val(info);
	  })
	  function errorHide() {
			setTimeout(function () {
				  $("#common-div").css({"width":"76%","height":"32px"});
				  $("#common-div").hide();
			}, 1000);
	  }

//保存地址信息
	  window.save = function () {
			var i = /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,20}/;
			var s = /^1[3|4|5|7|8]\d{9}$/;
			if (!i.test($('input[name=consignee]').val())) {
				  $("#common-div").css({"width":"84%","height":"64px"});
				  $("#common-div").html("收件人只能有1-20位,中文、英文字符或数字组成").show();
				  errorHide();
				  return false;
			}
			else if (!s.test($('input[name=mobile]').val())) {
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
				  var data = $("[data-attach-point=form]").serialize();
				  var url2 = url + "?uid=" + uid + "&action=addressSave";
				  InfoChannel.getDataByAjax(url2, data, function (data) {
						if (data.flag) {
							  var paramSet={
									action:"useAddress",
									uid:uid,
									addressId:$("[name=address_id]").val()
							  };
							  var gid=$("[data-attach-point='hidGood_id']").val();
							  InfoChannel.getDataByAjax(url, paramSet, function (data) {
									if (data.flag) {
										  location.href="/jfAddressList/"+gid+".html";
									}
							  })
						}
				  })
			}
	  }
});

