/**
 * Created by liuxiaoya；
 *date 2016/9/9 0009.
 *description需求登记
 */
define([
	  'jquery',
	  'infoChannel',
	  'cookie',
	  'utilTool'
], function (jquery, InfoChannel, cookie, utilTool) {

	  var uid = $.cookie("uid");
	  var aid = utilTool.GetUrlPara();
	  var param = {
			action: "ginfo",
			gid:aid
	  };
	  var url = configData.dataHost + '/index.php';//设置url
	  InfoChannel.getDataByAjax(url,param,function(data){
			if(data.flag){
				  $("#goodsName").html(data.data.goods_name);
				  $("[name=goods_name]").val(data.data.goods_name);
				  $("#goodsPrice").html(data.data.shop_price);
			}
	  });
	  //增加数量

	  $("[data-attach-point=addNum]").on("click",function(){
				  var that=$(this).prev("[name=goods_num]");
				  var phoneVal = parseInt(that.val()) + 1;
				  that.val(phoneVal);
	  });
//减少数量

	  $("[data-attach-point=reduceNum]").on("click",function(){
			var that=$(this).next("[name=goods_num]");
			var phoneVal=that.val();
			if(phoneVal-1>0){
				  that.val(parseInt(phoneVal)-1);
			}
	  });

	  //改变数量
	  $("[name=goods_num]").on("blur",function(){
			var that=$(this);
			var phoneVal=that.val();
			phoneVal=parseInt(phoneVal); //替换非数字字符为空格
			that.val(phoneVal);
	  });

	  //显示省份
	  $("[data-attach-point=show_province]").on("click",function(){
			if($("#selProvinces li").length===0){
				  var paramAddr={
						action:"prolist"
				  };
				  InfoChannel.getDataByAjax(url,paramAddr,function(data){
						if(data.flag){
							  for(var i in data.data){
									$("#selProvinces ul").append("<li data-id="+data.data[i].region_id+">"+data.data[i].region_name+"</li>");
							  }
							  $("#below").show();
							  $("#selProvinces").show();
						}
				  });
			}else{
				  $("#below").show();
				  $("#selProvinces").show();
			}
	  });
	  //显示城市
	  $("[data-attach-point=show_city]").on("click",function(){
			$("#selCities").show();
	  });
	  //显示区
	  $("[data-attach-point=show_area]").on("click",function(){
			$("#selDistricts").show();
	  });
	  //掩藏省份
	  $("#below").on("click",function(){
			$("#selProvinces").hide();
			$("#selCities").hide();
			$("#selDistricts").hide();
	  });

	  //选择省份
	  $("#selProvinces").on("click","li",function(e){
			if($(this).hasClass("active")){
				  return;
			}
			$(this).siblings("li").removeClass("active");
			$(this).addClass("active");
			var id=$(this).attr("data-id");
            $("[data-attach-point=show_province]").html($(this).html());
			$("[name=province]").val(id);
			$("[data-attach-point=show_city]").html("请选择市");
			$("[data-attach-point=show_area]").html("请选择区");
			$("[name=district]").val("");
			$("[name=city]").val("");
			$("#below").hide();
			$("#selProvinces").hide();
			changed( id, 2, 'selCities');

	  });
	  //选择城市
	  $("#selCities").on("click","li",function(e){
			if($(this).hasClass("active")){
				  return;
			}
			$(this).siblings("li").removeClass("active");
			$(this).addClass("active");
			var id=$(this).attr("data-id");
			$("[data-attach-point=show_city]").html($(this).html());
			$("[name=city]").val(id);
			$("[data-attach-point=show_area]").html("请选择区");
			$("[name=district]").val("");
			$("#below").hide();
			$("#selCities").hide();
			changed(id, 3, 'selDistricts');
	  });
	  //选择区
	  $("#selDistricts").on("click","li",function(e){
			if($(this).hasClass("active")){
				  return;
			}
			$(this).siblings("li").removeClass("active");
			$(this).addClass("active");
			var id=$(this).attr("data-id");
			$("[data-attach-point=show_area]").html($(this).html());
			$("[name=district]").val(id);
			$("#below").hide();
			$("#selDistricts").hide();
	  });

	  function changed(id,type,oDom){
			InfoChannel.getDataByAjax(url,{pid:id,type:type,action:"zonelist"},function(data){
				  $("#"+oDom).find("ul").html("");
				  if(data.flag) {
						for (var i in data.data) {
							  $("#"+oDom).find("ul").append("<li data-id=" + data.data[i].region_id + ">" + data.data[i].region_name + "</li>");
						}
				  }
			});
	  };

	  //提交需求登记
	  $("[data-attach-point=submit-btn]").on("click",function(){
			var data=$("form").serialize();
			var errorDiv="<div id='common-div'></div>";
			var i=/^[\u4e00-\u9fa5_a-zA-Z0-9]{1,20}/;
			if(!i.test($('[name=name]').val())){
				  $("body").after(errorDiv);
				  $("#common-div").html("姓名只能由1-20位中文,英文或数字组成");
				  $("#common-div").css("width","90%");
				  errorHide();
				  return false;
			}
			if(!utilTool.checkPhone($("[name=mobile]").val())){
				  $("body").after(errorDiv);
				  $("#common-div").html("请输入正确的手机号码");
				  errorHide();
				  return false;
			}
			if($("[name=district]").val()==""){
				  $("body").after(errorDiv);
				  $("#common-div").html("请选择所在地区");
				  errorHide();
				  return false;
			}
			if($("[name=address]").val()==""){
				  $("body").after(errorDiv);
				  $("#common-div").html("请填写详细地址");
				  errorHide();
				  return false;
			}
			var url2=url+"?action=demand&goods_id="+aid;
			if(uid){
                  url2=url2+"&uid="+uid;
			};
			InfoChannel.getDataByAjax(url2,data,function(data){
				  if(data.flag){
						window.location.href="/goods/"+aid;
				  }else{
						$("body").after(errorDiv);
						$("#common-div").html("登记没有成功哦~");
						errorHide();
				  }
			})

	  });
	  function errorHide(){
			setTimeout(function(){
				  $("#common-div").remove();
			},1000);
	  }
});