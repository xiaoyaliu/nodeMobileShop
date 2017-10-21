/**
 * Created by liuxiaoya；
 *date 2016/8/23 0023.
 *description手机绑定
 */
/**
 * Created by liuxiaoya on 2016/8/16 0016.
 浏览记录
 */
define([
	  'jquery',
	  'infoChannel',
	  'cookie',
	  'doT',
	  'utilTool'
], function (jquery, InfoChannel, cookie, doT, utilTool) {
	  var uid = $.cookie("uid");
	  var param = {
			uid: uid,
			action: "getEncodeMobile"
	  };
	  var oldM=false;
	  var newM=false;
	  var type="";
	  var collectList = $("[data-attach-point=collectList]");
	  var list = $("[data-attach-point=list]");
	  var url = configData.dataHost + '/my.php';//设置url
	  InfoChannel.getDataByAjax(url, param, function (data) {
			if(data.flag){//手机已绑定
				  $("[data-attach-point=mobile]").html(data.mobile);
				  $("[data-attach-point=tab1]").show();
				  $("[data-attach-point=tab2]").remove();
				  type="cha";
			}else{
				  if(data.type="ub"){//手机未绑定
					oldM=true;
					type="auth";
				  $("[data-attach-point=tab2]").show();
				  $("[data-attach-point=tab1]").remove();
				  }
			}
	  });
	  //去更换手机号
	  $("[data-attach-point=change]").on("click",function(){
			$("[data-attach-point=bindMobile]").hide();
            $("[data-attach-point=changeMobile]").show();
	  });
	  //验证原手机号是否正确
	  $('[data-attach-point=old_mobile]').on('focus',function () {
			$(this).next().hide();
			$('[data-attach-point=err]').text('');
	  }).on('blur', function () {
			var self = this;
			var k = $(this).val();
			if (k !== "") {
				  if (utilTool.checkPhone(k)) {
						$(this).next().hide();
						var paramOld = {
							  action: 'info_chkmobile',
							  uid: uid,
							  old_mobile:k
						};
						InfoChannel.getDataByAjax(url, paramOld, function (data) {
                              if(data.flag){
									oldM=true;
							  }else{
									$('[data-attach-point=err]').text('原手机号不正确');
									$('[data-attach-point=get]').addClass('gray-but');
									$('[data-attach-point=get]').attr("disabled", 'disabled');
							  }
						})
				  }else{
						     oldM=false;
							  $('[data-attach-point=err]').text('号码不合法');
						      $('[data-attach-point=get]').addClass('gray-but');
						      $('[data-attach-point=get]').attr("disabled", 'disabled');
				  }
			}
		});
	  //验证新手机号
	  $('[data-attach-point=new_mobile]').on('focus',function () {
			$(this).next().hide();
			$('[data-attach-point=err]').text('');
	  }).on('blur', function () {
			var self = this;
			var k = $(this).val();
			if (k !== "") {
				  if (utilTool.checkPhone(k)) {
						$(this).next().hide();
						var paramNew = {
							  action: 'info_isAuthM',
							  uid: uid,
							  mobile:k,
							  f:type
						};
						InfoChannel.getDataByAjax(url, paramNew, function (data) {
							  if(data.flag){
									newM=true;
									if(newM&&oldM){
										  $('[data-attach-point=get]').removeClass('gray-but');
										  $('[data-attach-point=get]').removeAttr("disabled");
									}
							  }else{
									$('[data-attach-point=err]').text('该号码已绑定');
									$('[data-attach-point=get]').addClass('gray-but');
									$('[data-attach-point=get]').attr("disabled", 'disabled');
							  }
						})
				  }else{
						newM=false;
						$('[data-attach-point=err]').text('号码不合法');
						$('[data-attach-point=get]').addClass('gray-but');
						$('[data-attach-point=get]').attr("disabled", 'disabled');
				  }
			}
	  })
	  //获取验证码
	  $('[data-attach-point=get]').on('click',function () {
			var self = this;
			var vl = $('[data-attach-point=telephone]').val();
			var paramSend = {
				  action: 'sendcode',
				  mobile:  $('[data-attach-point=new_mobile]').val(),
				  uid:uid,
				  f:type
			};
			InfoChannel.getDataByAjax(url, paramSend, function (data) {
				  var ms = $('[data-attach-point=err]');
				  ms.text('');
				  if (data.flag) {//设置倒计时
						countDown(self);
				  }else{
				  ms.text(data.msg);
				  }

			});
	  });

//倒计时
	  function countDown(self) {
			var clock = '';
			var nums = 60;
			$(self).attr("disabled", 'disabled');//将按钮置为不可点击
			$(self).text(nums + '秒后可重新获取');
			$(self).addClass('gray-but');
			clock = setInterval(doLoop, 1000); //一秒执行一次
			function doLoop() {
				  nums--;
				  if (nums > 0) {
						$(self).text(nums + '秒后可重新获取');
				  } else {
						clearInterval(clock); //清除js定时器
						$(self).removeAttr("disabled");
						$(self).text('获取验证码');
						$(self).removeClass('gray-but');
						nums = 60; //重置时间
				  }
			}
	  };
	  //提交数据
	  $('[data-attach-point=btn]').on("click",function(){
			var reg=/^\d{6}$/;
			var tag=newM&&oldM;
			var that=$(this);
			if(!tag){
				  return false;
			}else if(!reg.test($("[name=scode]").val())){
				 return false;
			}else{

				  var data={
						action:"info_mobile",
						uid:uid,
						f:type,
						mobile:$('[data-attach-point=new_mobile]').val(),
						scode:$('[name=scode]').val()
				  };
				  if(type=="cha"){
						data.old_mobile=$('[data-attach-point=old_mobile]').val();
				  }
				  InfoChannel.getDataByAjax(url, data, function (data) {
						if(data.flag){
							  $("[data-attach-point=suc]").show();
							  setTimeout(function(){
									location.reload();
							  },1000)

						}else{
							  $('[data-attach-point=err]').text(data.msg);
						}
				  })
			}
	  })
});
