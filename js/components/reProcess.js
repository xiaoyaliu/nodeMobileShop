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
	  'text!tpl/reProcess.tpl'
], function (jquery, InfoChannel,cookie, doT, utilTool,reProcessTpl) {
	  var uid = $.cookie("uid");
	  var listTpl = doT.template(reProcessTpl);//doT编译模版
	  var url = configData.dataHost + '/my.php';//设置url
	  var oid = utilTool.GetUrlPara();//获取oid
	  var param = {//进度数据
			uid: uid,
			action: "rt_view",
			oid:oid
	  };
	  var paramShip={//提交快递数据
			uid: uid,
			oid:oid,
			action:"set_InvoiceNo"
	  }
	  //获取进度渲染数据
	  InfoChannel.getDataByAjax(url,param,function(data){
			if(data.flag&&data.data.rtType==="re"){
				  paramShip.rtType="re";
				  paramShip.rt_id=data.data.ar_id;
                $("[data-attach-point=data]").html(listTpl(data.data))
			}
            if(data.seo){
			 utilTool.renderKeyWords(data.seo);
			}
			//选择快递
			var select_down= $("[data-attach-point=select-down-list]");
			var select_input=$("[data-attach-point=select-input]");
			//显示下拉快递列表
			select_input.on("click",function(){
				  select_down.show();
			});

			//点击选中快递
			select_down.find("li").on("click",function(){
				  var that=$(this);
				  select_input.val(that.text());
				  paramShip.deliveryName=that.attr("data-id");
				  select_down.hide();
			});

			//提交快递信息
			$("[data-attach-point=saveShipping]").on("click",function(){
				  var reg=/^[0-9]*$/;
				  paramShip.invoiceNo=$("[name=invoiceNo]").val();
				  if(!reg.test(paramShip.invoiceNo)){
						return false;
				  }
				  InfoChannel.getDataByAjax(url,paramShip,function(){
                       if(data.flag){
							 location.reload();
					   }else{
								   var errorDiv = "<div id='common-div'>您提交的数据不对哦~~</div>";
								   $("body").after(errorDiv);
								   errorHide();
					   }
				  })
			})
	  });
	  function errorHide() {
			setTimeout(function () {
				  $("#common-div").remove();
			}, 1000);
	  }
});

