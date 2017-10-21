/**
 * Created by liuxiaoya；
 *date 2016/8/24 0024.
 *description
 */
define([
	  'jquery',
	  'infoChannel',
	  'cookie',
	  'doT',
	  'jqueryForm',
	  'utilTool',
	  'text!tpl/feedback.tpl'
], function (jquery, InfoChannel,cookie,doT,jqueryForm, utilTool,feedbackTpl) {
	  var uid = $.cookie("uid");
	  var url = configData.dataHost + '/my.php';//设置url
	  var i=0;
	  var listTemp = doT.template(feedbackTpl);//doT编译模版
	  var paramFeed={
			action:"feedbackInfo",
			uid:uid
	  }
	  InfoChannel.getDataByAjax(url,paramFeed, function (data) {
                 if(data.length>0){
					   $("[data-attach-point=master]").html(listTemp(data))
				 }
	  });
	  //上传图片
	  var nowLoad=$("[data-attach-point=imgList]");
	  window.uploadImg=function(that) {
			if (nowLoad.find("a").length < 3) {//判断上传控件中是否选择了图片
			var form = $("[data-attach-point=form]");
				  if (that.files && that.files[0]) {
						var reader = new FileReader();
						var src;
						reader.onload = function (ev) {
							  src=ev.target.result;
							  var imageReal = new Image();
							  imageReal.onload=function(){
									var width = imageReal.width;
									var height = imageReal.height;
									var top=imgSize(width,height);
									i=i+1;
							        nowLoad.append('<a class="upload_img" onclick="delShow(this)"><i onclick="delImg(this)" data-attach-point="'+i+'"></i><img style='+top+' src="' +src+ '" /><input type=hidden data-attach-point="'+i+'" name="img[]" value='+i+' /></a>');
									var image = $(that).val();
									if ($.trim(image) == "") {
										  alert("请选择图片！");
										  return;
									}

									var url2 = configData.dataHost + "/feedbackup.php?action=up&uid="+uid;
									//开始ajax操作
									form.ajaxSubmit({
										  target: '#output',    // 把服务器返回的内容放入id为output的元素中
										  async: false,
										  url: url2,    //默认是form的action，如果申明，则会覆盖
										  type: "post",    // 默认值是form的method("GET" or "POST")，如果声明，则会覆盖
										  dataType: "json"    // html（默认）、xml、script、json接受服务器端返回的类型

									});
							  }
							  imageReal.src= src;

						}
						reader.readAsDataURL(that.files[0]);


				  }
			}
	  }
	  //图片尺寸控制
	  function imgSize(w,h){
			if(w>=h){
				  var top;
				  top=(1-h/w)*29;
				  var ntop="margin-top:"+top+"px;width:58px;height:auto;";
				  return ntop;
			}else{
				  var left;
				  left=(1-w/h)*29;
				  var ntop="height:58px;width:auto;";
				  return ntop
			}

	  }

	  //监听按钮状态
	  $("[name=reason]").blur(function(){
			btnState();
			  });
	  $("[name=desc]").blur(function(){
			btnState();
	  });
	  function btnState(){
			var i = /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,20}/;
			if (!i.test($('input[name=reason]').val())) {
				  $("[ data-attach-point=save]").removeClass("btn-block");
				  return false;
			}
			else if ($('[name=desc]').val()=="") {
				  $("[ data-attach-point=save]").removeClass("btn-block");
				  return false;
			}else{
				  $("[ data-attach-point=save]").addClass("btn-block");
			}
	  }
	  //提交数据
	  $("[ data-attach-point=save]").on("click",function(){
			var errorDiv = "<div id='common-div'></div>";
			var i = /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,20}/;
			if (!i.test($('input[name=reason]').val())) {
				  $("body").after(errorDiv);
				  $("#common-div").html("标题只能有1-50位中文、英文字符或数字组成");
				  errorHide();
				  return false;
			}
			else if ($('input[name=desc]').val()===""||$('input[name=desc]').val()===null) {
				  $("body").after(errorDiv);
				  $("#common-div").html("请输入正确的手机号码");
				  errorHide();
				  return false;
			}

			else {
				  var param={
						uid:uid,
						action:"subfeedback",
						reason:$("[name=reason]").val(),
						desc:$("[name=desc]").val()
				  };
				  param.img=[];
				 $("[name='img[]']").each(function(){
					   param.img.push(parseInt($(this).val()));
				 });
				  InfoChannel.getDataByAjax(url,param,function(data){
						if(data.flag){
							  $("[data-attach-point=suc]").show();
							  setTimeout(function(){
									window.location.reload();
							  },1000);
						}
				  })
			}
	  });
	  function errorHide() {
			setTimeout(function () {
				  $("#common-div").remove();
			}, 1000);
	  }
	  //删除图片
	  window.delShow=function(that){
			var that=$(that);
			that.find("i").show();
	  };
	  window.delImg=function(that){
			$(that).parent("a").remove();
	  };

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

