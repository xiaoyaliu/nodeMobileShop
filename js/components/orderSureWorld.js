/**
 * Created by zhouxiangbo；
 */
define([
	  'jquery',
	  'infoChannel',
	  'cookie',
	  'doT',
	  'utilTool',
	  'text!tpl/orderSureWorld.tpl',
	  'text!tpl/emptyCoupon.tpl'
], function (jquery, InfoChannel, cookie, doT, utilTool,orderSureTpl, emptyCoupon) {
	  var orderList = doT.template(orderSureTpl);//doT编译模版
	  var emptyCoupon = doT.template(emptyCoupon);//doT编译模版
	  var uid = $.cookie("uid");
	  var param = {
			uid: uid,
			action: "checkOrder"
	  };
	  var allPrice = {
			shippingFee: 0,//运费
			orderPrice: 0,//商品金额
			points: 0,//积分
			voucher: 0,//优惠券减去金额
			giftCartPrice: 0,//礼品卡减去金额
			totalMoney: 0,//实付金额
			always:false,//永远包邮四省
			routineFee:0
	  };

	  var moneyP;
	  var voucherIndex=-1;
	  var nowVoucher=-1;
	  var payWay=0;
	  var nowPayWay=0;
	  var nowInvoice=0;
	  var allPoints;
	  var type2=1;
	  var url = configData.dataHost + '/worldwide.php';//设置url
	  //初始化页面信息
	  InfoChannel.getDataByAjax(url, param, function (data) {

          console.log(data);

			if (data.seo) {
				  utilTool.renderKeyWords(data.seo);
			}
			if (data.flag) {
				console.log(data.flag);
				  $("[data-attach-point=data]").html(orderList(data));
				  $("#go-quick-click").click(function(event){
						$("#quick-go-div").slideToggle();
						event.stopPropagation();
				  });
				  $("body").click(function(){
						if($("#quick-go-div").css("display")=="block"){
							  $("#quick-go-div").slideUp();
						}
				  });
				  if(data.seo) {
						utilTool.renderKeyWords(data.seo);
				  }
				  // if($("[data-attach-point=canuse]").length===0){
					// 	$("[data-attach-point=bonus-tabson]").eq(0).html(emptyCoupon({data:"您还没有可使用的优惠券"}));
				  // }
				  // if($("[data-attach-point=nocanuse]").length===0){
					// 	$("[data-attach-point=bonus-tabson]").eq(1).html(emptyCoupon({data:"您还没有不可用的优惠券"}));
				  // }
				  // allPrice.shippingFee = parseFloat(data.goodsInfo.shipping);
				  // allPrice.orderPrice = parseFloat(data.goodsInfo.totalPrice);
				  // moneyP=allPrice.orderPrice+allPrice.shippingFee;
                   //    allPoints=parseInt(data.usePoints.usePoints);

				  if(allPrice.orderPrice-99>0&&allPrice.shippingFee==8.00){
						allPrice.always=true;
				  }


				  /*****优惠券*******/
				  // var canuseLen = $("[data-attach-point=canuse]").length;//可用优惠券
				  // $("#canuse").text(canuseLen);
				  // $("#nocanuse").text($("[data-attach-point=nocanuse]").length);//不可用优惠券
                  //
				  // if (canuseLen > 0) {
					// 	$("[data-attach-point=canuseNum] i").text(canuseLen)
				  // } else {
					// 	$("[data-attach-point=canuseNum]").remove();
				  // }
                  //
				  // //优惠券可用不可以切换
				  // $("[data-attach-point=bonusTab] li").on("click", function () {
					// 	$(this).addClass("active").siblings("li").removeClass("active");
					// 	$("[data-attach-point=bonus-tabson]").hide();
					// 	$("[data-attach-point=bonus-tabson]").eq($(this).index()).show();
				  // });
                  //
				  // //选择优惠券
				  // $("[name=voucherID]").on("click", function (){
					// 	var that = $(this);
					// 	if (that.is(":checked")) {
					// 		  $("[name=voucherID]").prop("checked",false);
                  //
					// 		  if(allPrice.giftCartPrice===0){
					// 		     that.prop("checked", true);
					// 			voucherIndex=that.attr("data-index");
					// 		  }else{
					// 				$('#common-div').html("优惠券不能与礼品卡同时使用").show();
					// 				setTimeout(function(){
                   //                     $("#common-div").html("").hide();
					// 				},1000)
					// 		  }
					// 	}
				  // });
                  //
				  // //选定优惠券
				  // $("[data-attach-point=bonusSure]").on("click", function () {
					// 	if ($("[name=voucherID]:checked").length > 0) {
					// 		  allPrice.voucher = parseFloat($("[name=voucherID]:checked").attr("data-money"));
					// 		  nowVoucher=voucherIndex;
					// 		  $("[data-attach-point=bonus-desc]").addClass("ord-coupon").html(allPrice.voucher.toFixed(2))
                  //
					// 	} else {
					// 		  allPrice.voucher = 0;
					// 		  voucherIndex=-1;
					// 		  nowVoucher=voucherIndex;
					// 		  $("[data-attach-point=bonus-desc]").removeClass("ord-coupon").html("未使用");
                  //
					// 	}
					// 	hideBonus();
				  // })

				  // //使用礼品卡
				  // $("[data-attach-point=useGift]").on("click",function(){
					// 	if(allPrice.voucher>0){
					// 		  $("[data-attach-point=cardWarn]").html("礼品卡不能与优惠券同时使用");
					// 	}else{
					// 		  $("[data-attach-point=cardWarn]").html("");
					// 		  addGiftCard();
					// 	}
				  // });

				  //取消使用礼品卡
				  $("[data-attach-point=noUseCard]").on("click",function(){
						hideBonus();
						allPrice.giftCartPrice=0;
						$("[data-attach-point=useGift]").show();
						$("[data-attach-point=changeGift]").hide();
						$("[data-attach-point=gift-desc]").removeClass("ord-coupon").html("未使用");
						$("[name=real-id]").val("");
						pay();
				  });

				  // //更改礼品卡
				  // $("[data-attach-point=changeUseCard]").on("click",function(){
					// 	addGiftCard();
				  // });

				  //使用积分
				  $("[data-attach-point=points]").blur(function(){
						var that=$(this);
						var nowPoints=parseInt(that.val());
						   nowPoints=IntegralRule(nowPoints);
						if(nowPoints>0){
						   $(this).val(nowPoints);
							  allPrice.points=(nowPoints/100).toFixed(2);
						   $("[data-attach-point=integral]").addClass("ord-coupon").html(allPrice.points);
							  pay();
						}else{
							  $("[data-attach-point=integral]").removeClass("ord-coupon").html("未使用");
							  that.val("");
						}
				  });

				  //支付show
				  $("[data-attach-point=payWay]").on("click",function(){
						$("[data-attach-point=pay-box]").show();
						$("#below").show();
				  });

				  //支付方式切换
				  $("[data-attach-point=pay-choice]").on("click","label",function(){
                       $(this).addClass("active").siblings("label").removeClass("active");
						nowPayWay=$(this).index();
				  });
				  //确定支付方式
				  $("[data-attach-point=pay-sure]").on("click",function(){
						payWay=nowPayWay;
						pay();

				  });
				  //关闭支付选择框
				  $("[data-attach-point=cancel-payWay]").on("click",function(){
						$("[data-attach-point=pay-choice]").find("label").removeClass("active");
						$("[data-attach-point=pay-choice]").find("label").eq(payWay).addClass("active");
						$("[data-attach-point=pay-box]").hide();
						$("#below").hide();
				  });

				  //发票框显示
				  $("[data-attach-point=invoice]").on("click",function(){
                        $("[data-attach-point=invoice-box]").show();
						$("#below").show();
				  });

				  //发票确认

				  $("[data-attach-point=invoice-sure]").on("click",function(){
						if(invoiceN===1){
							  if($("[name=title]").val()===""){
                                    $("#warnInv").html("请填写发票抬头");
							  }else{
									$('input[name="type1"]').val("1");
									$("#warnInv").html("");
									nowInvoice=1;
									if(parseInt($("[name=type2]:checked").val())===1){
										  type2=1;
										  $("[data-attach-point=invoice] a").html("个人明细");
									}else{
										  type2=2;
										  $("[data-attach-point=invoice] a").html("企业明细");
									}
									$("[data-attach-point=invoice-box]").hide();
									$("#below").hide();
							  }

						}else if(invoiceN===2){
							  // if($('input[name="unit_name"]').val()==''){
								// 	$("#warnInv").html("请填写单位名称");
							  // }
							  // if($('input[name="code"]').val()==''){
								// 	$("#warnInv").html("请填写纳税人识别码");
							  // }
							  // if($('input[name="reg_address"]').val()==''){
								// 	$("#warnInv").html("请填写注册地址");
							  // }
							  // if($('input[name="reg_tel"]').val()==''){
								// 	$("#warnInv").html("请填写注册电话");
							  // }
							  // if($('input[name="bank_name"]').val()==''){
								// 	$("#warnInv").html("请填写纳税人识别码");
							  // }
							  if($('input[name="bank_account"]').val()==''||$('input[name="unit_name"]').val()==''||$('input[name="code"]').val()==''||$('input[name="reg_address"]').val()==''||$('input[name="reg_tel"]').val()==''){
									$("#warnInv").html("请将信息填写完整");
							  }
							  else {
									$("#warnInv").html("");
									$('input[name="type1"]').val("2");
									$("[data-attach-point=invoice] a").html("增值税发票");
									nowInvoice=2;
									$("[data-attach-point=invoice-box]").hide();
									$("#below").hide();
							  }
						}else{
							  $("#warnInv").html("");
							  $('input[name="type1"]').val("0");
							  $("[data-attach-point=invoice] a").html("不要发票");
							  nowInvoice=0;
							  $("[data-attach-point=invoice-box]").hide();
							  $("#below").hide();
						}

				  });

				  //关闭发票
				  $("[data-attach-point=close-invoice]").on("click",function(){
						$("[data-attach-point=invoice-box]").hide();
						$("#below").hide();
						$("[data-attach-point=invoiceChoice]").removeClass("active");
						$("[data-attach-point=invoiceChoice]").eq(nowInvoice).addClass("active");
						$("[data-attach-point=tab-invoice]").hide();
						if(nowInvoice===1){
							  $("[data-attach-point=tab-invoice]").eq(0).show();
							  if(type2===1){
									$("[name=type2]").eq(0).prop("checked",true);
							  }else{
									$("[name=type2]").eq(1).prop("checked",true);
							  }
						}else if(nowInvoice===2){
							  $("[data-attach-point=tab-invoice]").eq(1).show();
						}
				  });

				  //提交数据
				  $("[data-attach-point=submit]").on("click",function(){
				  		var cdCard=$('[data-attach-point="cdCard"]').val();
				  		var realname=$("#realname").val();
				  		var realParam={
                            action:"checkInfoID",
                            realname:realname,
                            idcard:cdCard
						}
                      	if(isCardNo(cdCard)){
                            InfoChannel.getDataByAjax(url,realParam,function(data){
                              if(data.flag){
                                  var data=$("form").serialize();
                                  var url2=url+"?action=done&uid="+uid;
                                  InfoChannel.getDataByAjax(url2,data,function(data){
                                      $.cookie("cartnum", data.cartNum, {path: '/' });
                                      if(data.flag){
                                          if(payWay==0){
                                              location.href="/payChoice/"+data.orderId;
                                          }else{
                                              location.href="/payDown/"+data.orderId;
                                          }
                                      }else{
                                          location.href="/orderFail";
                                      }
                                  })
							 }else{
                                 $(".dialog").text(data.msg).show().fadeOut(3500);
							  }
                           })

						}else{
                            $(".dialog").text("请正确填写身份证号").show().fadeOut(3500);
						}

				  });
			}else{
                $(".dialog").text(data.msg).show().fadeOut(5000).delay(0,function(){
                    //window.location.href="/cart";
                    //window.location.href="/user";
                });
            }
	  });

//身份证验证位数;
    function isCardNo(card)
    {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(reg.test(card) === false)
        {
            return false;
        }else{
        	return true;
		}
    }



	  //显示优惠券
	  window.showBounds = function () {
			$("[data-attach-point=bonusList]").show();
			$("[data-attach-point=section]").hide();
	  };
	  //清除选中优惠券
	  window.hideBonusBack = function () {
			hideBonus();
	  };
	  //隐藏优惠券
	  function hideBonus() {
			$("[data-attach-point=bonusList]").hide();
			$("[data-attach-point=section]").show();
			if(nowVoucher===-1){
				  $("[name=voucherID]").prop("checked",false);
			}
			if(nowVoucher>0&&$("[name=voucherID]:checked").length===0){

				 $("[data-index="+nowVoucher+"]").click();
			}
			pay();
	  };

       //显示礼品卡
	  window.showGiftCard=function(){
			$("[data-attach-point=giftCard]").show();
			$("#below").show();
	  };

	  //隐藏礼品卡
	  window.hideGiftCard=function(){
			$("[data-attach-point=giftCard]").hide();
			$("#below").hide();
	  };

	  //使用礼品卡
	  var addGiftCard = function () {
			var reg =/^[A-Za-z0-9]*$/;
			/*var paramCard={
				  action:"checkCode",
				  uid:uid,
				  ftotal:allPrice.orderPrice,
				  couponCode:$("[name=real-card]").val()
			};*/

          //===== 礼品卡活动商品判断 =====//
          var gIds = new Array;  //购物车里的商品ID
          var gNums = new Array; //购物车里的商品数量
          $("[data-attach-point='gId']").each(function () {
              var thisId = $(this).val();
              gIds.push(thisId);
          });
          $("[data-attach-point='gNum']").each(function () {
              var gNum = $(this).val();
              gNums.push(gNum);
          });
          var giftParams = {
              coupon_code: $("[name=real-card]").val(),
              goodsinfo: gIds.join(":"),
              goodsnum: gNums.join(":"),
              amount: $("[data-attach-point='inactivePrice']").text()
          };

			if (utilTool.checkGiftCard(giftParams.coupon_code)){
                 InfoChannel.getDataByAjax(url+"?action=checkGiftCard",giftParams,function(data){
                     console.log(data);
                        if(data.flag){
                            hideGiftCard();
                            allPrice.giftCartPrice=parseFloat(data.data.denomination);
                            $("[data-attach-point=gift-desc]").addClass("ord-coupon").html(allPrice.giftCartPrice.toFixed(2));
                            $("[data-attach-point=useGift]").hide();
                            $("[data-attach-point=changeGift]").show();
                            $("[data-attach-point=cardWarn]").html("");
                            pay();
                            $("[name=real-id]").val($("[name=real-card]").val());
                        }else{
                            $("[data-attach-point=cardWarn]").html(data.msg);
                        }
					   /*if(data.flag&&data.data.status==="0"){
							 hideGiftCard();
							 allPrice.giftCartPrice=parseFloat(data.data.denomination);
							 $("[data-attach-point=gift-desc]").addClass("ord-coupon").html(allPrice.giftCartPrice.toFixed(2));
							 $("[data-attach-point=useGift]").hide();
							 $("[data-attach-point=changeGift]").show();
							 $("[data-attach-point=cardWarn]").html("");
							 pay();
							 $("[name=real-id]").val($("[name=real-card]").val());
					   }
					   else if(data.data.status==="1"){
							 $("[data-attach-point=cardWarn]").html("该礼品卡不存在");
					   }
					   else if(data.data.status==="3"){
							 $("[data-attach-point=cardWarn]").html("该礼品卡已经使用");
					   }
					   else{
							 $("[data-attach-point=cardWarn]").html(data.msg);
					   }*/
				 })
			}else{
				  $("[data-attach-point=cardWarn]").html("请输入正确的礼品卡哦~");
			}

	  };
	  //发票切换
     var invoiceN=0;
	  window.invoiceChoice=function(n){
			invoiceN=n;
          	$("#warnInv").html("");
			$("[data-attach-point=invoiceChoice]").removeClass("active");
			$("[data-attach-point=invoiceChoice]").eq(n).addClass("active");
			$("[data-attach-point=tab-invoice]").hide();
			if(n===1){
                $("#warnInv").html("");
				  $("[data-attach-point=tab-invoice]").eq(0).show();
			}else if(n===2){
                $("#warnInv").html("");
				  $("[data-attach-point=tab-invoice]").eq(1).show();
			}
	  };

	  //支付
	  var pay = function () {
			if (payWay==0) {
				  payOnline();
				  $("[name=payment]").val(4);
				  $("[data-attach-point=routineFee]").hide();
				  $("[data-attach-point=nowPayWay]").html("在线支付");
			}else {
				  $("[name=payment]").val(3);
				  $("[data-attach-point=routineFee]").show();
				  $("[data-attach-point=nowPayWay]").html("货到付款");
				  payDownline();
			}
			$("[data-attach-point=pay-box]").hide();
			$("#below").hide();
			$("[name=voucherP]").val(allPrice.voucher);
			$("[name=cartName]").val(allPrice.giftCartPrice);
			$("[name=bonus_use]").val(allPrice.points*100);
	  };
	  var payOnline = function () {//在线支付
			$("#integral").show();
			moneyP=allPrice.orderPrice-allPrice.voucher-allPrice.giftCartPrice+allPrice.shippingFee;
			var numPoint=changeUseInte(moneyP);
			if(numPoint<parseInt(allPrice.points*100)||allPrice.points==0){
				  allPrice.points=0;
				  $("[data-attach-point=points]").val(0).blur();
				  if(numPoint-100>0){
						$("[data-attach-point=points]").addClass("ord-Integral-focus");
						$("[data-attach-point=points]").removeAttr("readonly");
				  }else{
						$("[data-attach-point=points]").removeClass("ord-Integral-focus");
						$("[data-attach-point=points]").attr("readonly","readonly");
				  }
				  $("[data-attach-point=points]").attr("placeholder","共有 "+allPoints+" 个优德积分，本次可用 "+numPoint+" 个积分");
			}
			var tMoney=allPrice.orderPrice-allPrice.voucher-allPrice.giftCartPrice-allPrice.points;


			if(allPrice.always){
				  allPrice.shippingFee=8;
			}
            else if(tMoney-99<0&&allPrice.shippingFee==0){
				  allPrice.shippingFee=8;
			}else if(tMoney-99>0&&allPrice.shippingFee==8){
				  allPrice.shippingFee=0;
			}
			allPrice.totalMoney=tMoney+allPrice.shippingFee;
			$("#shipping").html(allPrice.shippingFee.toFixed(2));
			$("#totalMoney").html(allPrice.totalMoney.toFixed(2));
			$("[name=shippingFee]").val(allPrice.shippingFee);
	  };
	  var payDownline = function () {//货到付款
			$("#integral").hide();
			allPrice.totalMoney=allPrice.orderPrice-allPrice.voucher-allPrice.giftCartPrice;
			if (allPrice.totalMoney >= 0&&allPrice.totalMoney<=589) {
				  allPrice.routineFee=3;

			}else{
				  allPrice.routineFee=(allPrice.totalMoney+8)*0.01;
			}
			allPrice.totalMoney=Number(allPrice.totalMoney+ allPrice.routineFee+8).toFixed(1);
			$("[data-attach-point=routineFee] span").html(allPrice.routineFee.toFixed(2));
			$("#shipping").html(8.00);
			$("#totalMoney").html(Number(allPrice.totalMoney).toFixed(2));
			$("[name=shippingFee]").val(8);

	  };


      //积分规则100-240  按实付金额即最高抵扣200积分240.01-800即最高抵扣1000积分800.01往上到无上限  即最高抵扣2000积分
	  function IntegralRule(hasPoints) {
			var numPoint;
			if (moneyP - 100 >= 0 && moneyP - 240 <= 0) {
				  numPoint = hasPoints >= 200 ? 200 : hasPoints;
			}
			else if (moneyP - 240 > 0 && moneyP - 800 <= 0) {
				  numPoint = hasPoints >= 1000 ? 1000 : hasPoints;
			} else if (moneyP - 800 > 0) {
				  numPoint = hasPoints >= 2000 ? 2000 : hasPoints;
			}else{
				  numPoint=0;
			}
			return numPoint;
	  }

      function changeUseInte(MoneyP){
			var numPoint;
			if (moneyP - 100 >= 0 && moneyP - 240 <= 0) {
				  numPoint = allPoints >= 200 ? 200 : allPoints;
			}
			else if (moneyP - 240 > 0 && moneyP - 800 <= 0) {
				  numPoint = allPoints >= 1000 ? 1000 : allPoints;
			} else if (moneyP - 800 > 0) {
				  numPoint = allPoints >= 2000 ? 2000 : allPoints;
			}else{
				  numPoint=0;
			}

			return numPoint;
	  }
});