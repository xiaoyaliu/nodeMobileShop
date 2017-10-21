/**
 * Created by liuxiaoya
 * date: 2016/8/16.
 * description:评价商品
 */
define([
	  'jquery',
	  'infoChannel',
	  'jqueryForm',
	  'cookie',
	  'doT',
	  'utilTool',
	  'text!tpl/evaluate.tpl'
], function (jquery, InfoChannel, jqueryForm, cookie, doT, utilTool, evaluateTpl) {
	  var evaluateList = doT.template(evaluateTpl);//doT编译模版
	  var oid = utilTool.GetUrlPara();
	  var uid = $.cookie("uid");
	  var subParam = {};
	  subParam = {
			uid: uid,
			action: "subcom",
			oid: oid
	  };
	  var param = {
			uid: uid,
			action: "comment",
			oid: oid
	  };
	  var url = configData.dataHost + '/my.php';//设置url
	  var url2 = configData.dataHost + "/commentup.php?action=up&uid=" + uid;

	  //初始化数据
	  InfoChannel.getDataByAjax(url, param, function (data) {
			if (data.flag) {
				  if (data.seo) {
						utilTool.renderKeyWords(data.seo);
				  }
				  $("[data-attach-point=data]").html(evaluateList(data.data));
				  $("[name=uid]").val(uid);
			}
	  });
	  var nowLoad;
	  var goodId;
	  var i = 0;
	  //图片上传
	  window.uploadImg = function (that) {
			var form = $(that).parents("form");
			nowLoad = form.find("[data-attach-point=imgList]");
			if (nowLoad.find("a").length < 3) {
				  if (that.files && that.files[0]) {
						var reader = new FileReader();
						var src;
						goodId = form.find("[name=gid]").val();
						reader.onload = function (ev) {
							  src = ev.target.result;
							  var imageReal = new Image();
							  imageReal.onload = function () {
									var width = imageReal.width;
									var height = imageReal.height;
									i = i + 1;
									var top = imgSize(width, height);
									nowLoad.append('<a class="upload_img" data-attach-point="upload_img" onclick="delShow(this)"><i onclick="delImg(this)" data-attach-point="' + i + '"></i><img style=' + top + ' src="' + src + '" /><input type=hidden data-attach-point="' + i + '" name="img' + goodId + '[]" data-name="comImg[' + goodId + ']" value=' + i + ' /></a>');
									//判断上传控件中是否选择了图片
									var image = $(that).val();
									if ($.trim(image) == "") {
										  alert("请选择图片！");
										  return;
									}
									//开始ajax操作
									form.ajaxSubmit({
										  target: '#output',    // 把服务器返回的内容放入id为output的元素中
										  async: false,
										  url: configData.dataHost + "/commentup.php?action=up&uid=" + uid,    //默认是form的action，如果申明，则会覆盖
										  type: "post",    // 默认值是form的method("GET" or "POST")，如果声明，则会覆盖
										  dataType: "json"    // html（默认）、xml、script、json接受服务器端返回的类型

									});
							  };
							  imageReal.src = src;
						}

						reader.readAsDataURL(that.files[0]);


				  }

			}
	  }
	  //图片样式调整
	  function imgSize(w, h) {
			if (w >= h) {
				  var top;
				  top = (1 - h / w) * 30;
				  var ntop = "margin-top:" + top + "px;width:60px;height:auto;";
				  return ntop;
			} else {
				  var left;
				  left = (1 - w / h) * 30;
				  var ntop = "height:60px;width:auto;";
				  return ntop
			}

	  }

	  //设置评分
	  window.setScore = function (that, id) {
			var that = $(that);
			that.siblings("span").removeClass("on");
			that.prevAll("span").addClass("on");
			that.addClass("on");
			that.parent("span").addClass("alSet");
			if ($(".alSet").length === $("[data-attach-point=commentOne]").length) {
				  $("[data-attach-point=save]").addClass("btn-block");
			} else {
				  $("[data-attach-point=save]").removeClass("btn-block");
			}
			that.parents("[data-attach-point=commentOne]").find("[data-attach-point=score]").val(id);
	  }

	  window.delShow = function (that) {
			var that = $(that);
			that.find("i").show();
	  };
	  window.delImg = function (that) {
			$(that).parent("a").remove();
	  };
	  //数据提交
	  window.subSave = function () {
			//判断所以商品均已打分
			$("[data-attach-point=setP]").each(function () {
				  if ($(this).find(".on").length === 0) {
						$(this).parents(".access-item-info").append("<p class='password-error' style='padding-right: 20px;text-align: right;'>请为该商品评分</p>");
						return false;
				  }
			});
			$("[data-attach-point=commentOne]").each(function () {
				  var that = $(this);
				  var setP = that.find("[data-attach-point=setP]");
				  var textArea = that.find("textarea");
				  subParam[setP.attr("name")] = setP.find(".on").length;
				  subParam[textArea.attr("name")] = textArea.val();
				  that.find("[data-attach-point=upload_img]").each(function (index) {
						var nowI = $(this).find("input");
						if (index == 0) {
							  subParam[nowI.attr("data-name")] = [];
						}
						subParam[nowI.attr("data-name")].push(nowI.val());
				  })
			});
			InfoChannel.getDataByAjax(url, subParam, function (data) {
				  if (data.flag) {
						window.location.href="/order/os"
				  }
			})

	  };

	  //显示更多
	  $("#go-quick-click").click(function (event) {
			$("#quick-go-div").slideToggle();
			event.stopPropagation();
	  });
	  $("body").click(function () {
			if ($("#quick-go-div").css("display") == "block") {
				  $("#quick-go-div").slideUp();
			}
	  });
	  utilTool.goTop();//回到顶部
});

