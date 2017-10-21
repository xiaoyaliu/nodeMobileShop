/**
 * Created by liuxiaoya；
 *date 2016/8/23 0023.
 *description手机绑定
 */
/**
 * Created by liuxiaoya on 2016/8/16 0016.
 修改密码
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
			action: "chPwd"
	  };
	  var oldM = false;
	  var newM = false;

	  var collectList = $("[data-attach-point=collectList]");
	  var list = $("[data-attach-point=list]");
	  var url = configData.dataHost + '/my.php';//设置url
	  //设置密码
	  var re = /^[a-zA-Z0-9]{6,20}$/;
	  $('[data-attach-point=npw]').on('focus', function () {
			$('[data-attach-point=err]').text('');
	  }).on('blur', function () {
			var pw = $(this).val();
			if (!re.test(pw)) {
				  $('[data-attach-point=err]').text('请输入6-20位字母或数字组合');
			} else {
				  newM = true;
			}
			;
	  });
	  $('[data-attach-point=opw]').on('focus', function () {
			$('[data-attach-point=err]').text('');
	  }).on('blur', function () {
			var pw = $(this).val();
			if (!re.test(pw)) {
				  $('[data-attach-point=err]').text('请输入6-20位字母或数字组合');
			} else {
				  oldM = true;
			}
			;
	  });
//设置密码框的显示与隐藏
	  $('[data-attach-point=on]').on('click', function () {//显示
			$(this).hide();
			$('[data-attach-point=off]').show();
			$('[data-attach-point=npw]').attr('type', 'password');
	  });
	  $('[data-attach-point=off]').on('click', function () {//隐藏
			$(this).hide();
			$('[data-attach-point=on]').show();
			$('[data-attach-point=npw]').attr('type', 'text');
	  });
	  $('[data-attach-point=btn]').on('click', function () {
			if (oldM && newM) {
				  param.oldPwd=$('[data-attach-point=opw]').val();
				  param.pwd=$('[data-attach-point=npw]').val();
				  InfoChannel.getDataByAjax(url, param, function (data) {
						if (data.flag) {//手机已绑定
							  $("[data-attach-point=suc]").show();
							  setTimeout(function(){
									window.location.href="/account"
							  },1000)
						} else {
							  if(data.type===1){
									$('[data-attach-point=err]').text(data.msg);
							  }else if(data.type===2){
									$('[data-attach-point=err]').text("原始密码不正确");
							  }else if(data.type===3){
									$('[data-attach-point=err]').text("修改密码失败");
							  }

						}
				  });
			}
	  })
});
