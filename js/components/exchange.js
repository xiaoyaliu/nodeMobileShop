define([
	  'jquery',
	  'infoChannel',
	  'cookie',
	  'jqueryForm',
	  'doT',
	  'utilTool',
	  'text!tpl/exchange.tpl'
], function (jquery, InfoChannel, cookie,jqueryForm, doT, utilTool, exchangeTpl) {
	  var listTemp = doT.template(exchangeTpl);//doT编译模版
	  var uid=$.cookie("uid");
	  var oid = utilTool.GetUrlPara();
	  var param = {
			uid: uid,
			action:"goreturn",
			oid:oid
	  };
	  var subParam={
			uid:uid,
			oid:oid,
			action:"subreturn"
	  };
	  var maxMoney=0;
	  var selectAll=$("[data-attach-point=selectAll]");
	  var url = configData.dataHost + '/my.php';//设置url
	  InfoChannel.getDataByAjax(url, param, function (data) {//初始化数据
			if(data.flag){
				  if(data.seo) {
						utilTool.renderKeyWords(data.seo);
				  }
			    $("[data-attach-point=data]").html(listTemp(data.data));
				  maxMoney=data.data.orderInfo.re_total;
			//退货数量改变

				  $("[data-attach-point=count-input]").on("blur",function(){
						var that=$(this);
						var phoneVal=that.val();
						var maxVal=that.attr("data-max");       //最大值
						phoneVal=phoneVal.replace('/[^d]+/g', ''); //替换非数字字符为空格
						phoneVal=parseInt(phoneVal,10);
						if(maxVal-phoneVal<0){                    //不能大于最大值
							  phoneVal=maxVal;
						}
						if(isNaN(phoneVal)){
							  phoneVal = 1;
						}
						that.val(phoneVal);
						allSelectPrice();
				  });
			}


//增加数量

	  $("[data-attach-point=addNum]").on("click",function(){
			var add=$(this);
			if(!add.hasClass("reduceDisable")) {
				  var countOpe = add.parents("[data-attach-point=app-num]");
				  var that = countOpe.find("[data-attach-point=count-input]");
				  var phoneVal = parseInt(that.val()) + 1;
				  var maxVal = that.attr("data-max");
				  countOpe.find("[data-attach-point=reduceNum]").removeClass("reduceDisable");
				  that.val(phoneVal);
				  allSelectPrice();
				  if (maxVal - phoneVal <= 0) {                    //不能大于最大值
						add.addClass("reduceDisable");
						return false;
				  }
			}
			allSelectPrice();
	  });
//减少数量

	  $("[data-attach-point=reduceNum]").on("click",function(){
			var countOpe=$(this).parents("[data-attach-point=app-num]");
			var that=countOpe.find("[data-attach-point=count-input]");
			var phoneVal=that.val();
			if(phoneVal==2){
				  countOpe.find("[data-attach-point=reduceNum]").addClass("reduceDisable")
			}
			if(phoneVal-1>0){
				  countOpe.find("[data-attach-point=addNum]").removeClass("reduceDisable");
				  that.val(parseInt(phoneVal)-1);
			}
			allSelectPrice();
	  });

		//选择商品
			$("[data-attach-point=labelBox]").on("click",function(){
				  if ($(this).is(':checked')){
						$(this).parents("[data-attach-point=return-goods]").addClass("select");
				  }else{
						$(this).parents("[data-attach-point=return-goods]").removeClass("select");
				  }
				  changeState();
				  allSelectPrice();
			})

			//判断退货或退换货
			if($("[name=money]").length>0){
				  subParam.rt="rt1";//全部退货
			}else{
				  subParam.rt="rt3";//换货
			}
	  });
	  //选种商品价格
	  var allPrice=0;
	  function allSelectPrice(){
			allPrice=0;
			$("[data-attach-point=return-goods].select").each(function(){
				  var that=$(this);
				  allPrice=allPrice+parseInt(that.find("[data-attach-point=count-input]").val())*parseFloat(that.find("[data-attach-point=gd-one-price]").html());
			});
			allPrice=allPrice.toFixed(2);
			$("[data-attach-point=total-money]").html(allPrice);
	  }
	  //修改全选价格
	  function changeState() {
			if($("[data-attach-point=return-goods]").length===$(".select").length){
				  selectAll.attr("checked",true);
			}else if(selectAll.is(':checked')){
				  selectAll.removeAttr("checked");
			};
	  };
	  //全选
	  selectAll.on("click",function(){
			var that=$(this);
			if(that.is(':checked')){
				  $("[data-attach-point=return-goods]").addClass("select");
				  $("[data-attach-point=labelBox]").attr("checked",true);
			}else{
				  $("[data-attach-point=return-goods]").removeClass("select");
				  $("[data-attach-point=labelBox]").removeAttr("checked");
			}
			allSelectPrice();
	  })
	  //输入退款金额
	  $("[name=money]").on("blur",function(){
			var that=$(this);
			that.val(that.val().replace(/[^\d.]/g,"")) //清除"数字"和"."以外的字符
			that.val(that.val().replace(/^\./g,"")); //验证第一个字符是数字而不是
			that.val(that.val().replace(/\.{2,}/g,".")); //只保留第一个. 清除多余的
			that.val(that.val().replace(".","$#$").replace(/\./g,"").replace("$#$","."));
			that.val(that.val().replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')); //只能输入两个小数
			if(that.val()-allPrice>0){
				  that.val(allPrice)
			}

	  });

	  //提交申请
	  var errorDiv = "<div id='common-div'></div>";
	  $("[data-attach-point=submitBtn]").on("click",function(){
			subParam.reason=$("[name=reason]").val();
			if($("[data-attach-point=return-goods].select").length===0){
				  $("body").after(errorDiv);
				  $("#common-div").html("请选择退/换货商品");
				  errorHide();
				  return false;
			}
			else if(subParam.reason==""){
				  $("body").after(errorDiv);
				  $("#common-div").html("请填写申请原因");
				  errorHide();
				  return false;
			}else if(subParam.rt!=="rt3"){
				  if($("[name=money]").val()==""){
						$("#common-div").html("请填写退款金额");
						errorHide();
						return false;
				  }else if(subParam.money-allPrice>0){
						$("#common-div").html("不能大于最大退款限额");
						errorHide();
						return false;
				  }else{
						subParam.money=$("[name=money]").val();
				  }
			}
			subParam.remarks=$("[name=remarks]").val();
			subParam.gidArr=[];
			subParam.imgArr=[];
			$("[data-attach-point=return-goods].select").each(function() {
				  var that = $(this);
				  subParam.gidArr.push(that.find("[data-attach-point=gid]").val());
				  subParam[that.find("[data-attach-point=count-input]").attr("name")]=that.find("[data-attach-point=count-input]").val();
			});
			if(subParam.rt!=="rt3"){
				  if($("[data-attach-point=return-goods]").length===$(".select").length){
						subParam.rt="rt1";
				  }else{
						subParam.rt="rt2";
				  }
			}
			$(".hidImg").each(function(){
                  subParam.imgArr.push($(this).val());
			});
			InfoChannel.getDataByAjax(url,subParam,function(data){
				  if(data.flag){
						window.location.href="/order/os";
				  }
			})
	  });

	  //移除弹出窗
	  function errorHide() {
			setTimeout(function () {
				  $("#common-div").remove();
			}, 1000);
	  }
	  var i=0;
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
									nowLoad.append('<a class="upload_img" onclick="delShow(this)"><i onclick="delImg(this)" data-attach-point="'+i+'"></i><img style='+top+' src="' +src+ '" /><input type=hidden data-attach-point="'+i+'" class="hidImg" name="img[]" value='+i+' /></a>');
									var image = $(that).val();
									if ($.trim(image) == "") {
										  alert("请选择图片！");
										  return;
									}
									var url2 = configData.dataHost + "/returnup.php?action=up&uid="+uid;
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
	  //删除图片
	  window.delShow=function(that){
			var that=$(that);
			that.find("i").show();
	  };
	  window.delImg=function(that){
			$(that).parent("a").remove();
	  };
});