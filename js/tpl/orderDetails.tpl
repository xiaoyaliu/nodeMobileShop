<div class="order-info-box" style="display: block">
      <div class="order-head-id">
            <p>订单号：<i>{{=it.orderInfo.order_sn}}</i></p>
      </div>
      <div class="address-Info" style="display:block">
            <div class="address_mo">
                  <div class="address_div">
                        <p class="peopleMessage">
                              <span class="name">{{=it.orderInfo.consignee}}</span>
                              <span class="phone">{{=it.orderInfo.mobile}}</span>
                        </p>
                        <p class="addressMessage">
                              {{=it.orderInfo.addInfo}}
                        </p>
                  </div>
                <span class="ord-img-rig">
                </span>
            </div>
            <img class="xian_rep" src="/image/xian.png">
      </div>

      <ul class="cartList ord_cont_bot" style="display: block">
      {{~it.goodsArr:item}}
            <li>
                  <div class="displayBox relative">
                        <div class="cart1Box">
                              <a href="/goods/{{=item.goods_id}}.html"><img src="{{=item.goods_img}}"></a>
                        </div>
                        <div class="cart2Box">
                              <p>{{=item.goods_name}}</p>
                              {{? item.rule_name}}
                              <div class='ruleName3 btm-0' style='text-align:left;'>

                                  <em>{{=item.rule_name}}</em>{{=item.rule_con}}

                              </div>
                              {{?}}
                        </div>
                        <div class="cart_price cart_price_order">
                              <span class="cart_pri_red">{{=item.goods_price}}</span>
                              <span>X{{=item.goods_number}}</span>
                        </div>
                  </div>
            </li>
            {{~}}
      </ul>
{{? it.orderInfo.invoice_id!=="0"}}
      <div class="change-p">
            <div class="distribe cf">
                  <h3 class="invoice-left">发票信息</h3>
            </div>
            <div class="inv-cont">
                {{? it.invoiceDetail.type1==="1"}}
                  <div class="inv-con-left">
                        <p>普通发票</p>
                        <p>发票抬头:{{? it.invoiceDetail.type2==="1"}}个人{{?? it.invoiceDetail.type2==="2"}}企业{{?}}</p>
                        <p>发票内容:明细</p>
                  </div>
                  {{?? it.invoiceDetail.type1==="2"}}
                  <div class="inv-con-left">
                          <p>增值税发票</p>
                          <p>单位名称:{{=it.invoiceDetail.unit_name}}</p>
                          <p>纳税人识别码:{{=it.invoiceDetail.code}}</p>
                          <p>注册地址:{{=it.invoiceDetail.reg_address}}</p>
                          <p>注册电话:{{=it.invoiceDetail.reg_tel}}</p>
                          <p>银行账户:{{=it.invoiceDetail.bank_account}}</p>
                   </div>
                   {{?}}
            </div>
      </div>
      <p class="bot-gray-b"></p>
{{?}}
      <div class="step-pay">
            <div class="step-pay-con">
                  <div class="step-pay-tot">
                        <div class="pay-tot-l">
                              实付详情
                        </div>
                  </div>
                  <div class="step-pay-tot">
                        <div class="pay-info-l">+ 商品金额</div>
                        <div class="pay-info-r">¥{{=it.orderInfo.goods_amount}}</div>
                  </div>
                  <div class="step-pay-tot">
                        <div class="pay-info-l">+ 运费</div>
                        <div class="pay-info-r">¥{{=it.orderInfo.shipping_fee}}</div>
                  </div>

                  <div class="step-pay-tot">
                        <div class="pay-info-l">- 使用优惠券</div>
                        <div class="pay-info-r">¥{{=it.orderInfo.coupon_val}}</div>
                  </div>
                  <!--
                  <div class="step-pay-tot">
                        <div class="pay-info-l">
                              - 积分抵扣
                        </div>
                        <div class="pay-info-r">
                              ¥{{=it.orderInfo.integral_money}}
                        </div>
                  </div>
                  -->
                  <div class="step-pay-tot">
                        <div class="pay-info-l">
                              + 货到付款手续费
                        </div>
                        <div class="pay-info-r">
                              ¥{{=it.orderInfo.card_fee}}
                        </div>
                  </div>

            </div>

            <div class="pay-sum">
                  <div>实付款:
                        <span>¥{{? it.orderInfo.order_amount!=="0.00"}}{{=it.orderInfo.order_amount}}{{??}}{{=it.orderInfo.money_paid}}{{?}}</span>
                  </div>
                  <p>下单时间:{{=it.orderInfo.add_time}}</p>
                  {{? it.orderInfo.pay_time!=""}}<p>付款时间:{{=it.orderInfo.pay_time}}</p>{{?}}
            </div>
      </div>
      <div class="btn-bar">
            {{? it.orderInfo.order_status_info.code==="os1"||it.orderInfo.order_status_info.code==="os2"}}
                         <div class="bottom-but"><a class="bb-btn1" onclick="cancelOrder()">取消订单</a></div>
            {{?? it.orderInfo.order_status_info.code==="os4"}}
                         {{? it.is_otc===0}}<div class="bottom-but"><a class="bb-btn1 shop-again" onclick="goBuyAgain()">再次购买</a></div>{{?}}
                          <div class="bottom-but"><a class="bb-btn1" onclick="isEvaluate({{=it.orderInfo.order_id}})">评价商品</a></div>
                         {{? it.orderInfo.return_status===0}}<div class="bottom-but"><a class="bb-btn1" href="/returnChoose/{{=it.orderInfo.order_id}}">退换货</a></div>{{?}}
            {{?? it.orderInfo.order_status_info.code==="os3"}}
                         <div class="bottom-but"><a class="bb-btn1 shop-again" onclick="affirmOrder()">确认收货</a></div>
                         <div class="bottom-but"><a class="bb-btn1" href="/logistics/{{=it.orderInfo.order_id}}">查看物流</a></div>
             {{?? it.orderInfo.order_status_info.code==="os5"}}
                         {{? it.is_otc===0}}<div class="bottom-but"><a class="bb-btn1 shop-again" onclick="goBuyAgain()">再次购买</a></div>{{?}}
                          <div class="bottom-but"><a class="bb-btn1" onclick="deleteOrder()">删除订单</a></div>
                         {{? it.orderInfo.return_status===0}}<div class="bottom-but"><a class="bb-btn1" href="/returnChoose/{{=it.orderInfo.order_id}}">退换货</a></div>{{?}}
              {{?? it.orderInfo.order_status_info.code==="os6"}}
                          {{? it.is_otc===0}}<div class="bottom-but"><a class="bb-btn1 shop-again" onclick="goBuyAgain()">再次购买</a></div>{{?}}
                          <div class="bottom-but"><a class="bb-btn1" onclick="deleteOrder()">删除订单</a></div>
             {{?? it.orderInfo.order_status_info.code==="os7"}}
                          <div class="bottom-but"><a class="bb-btn1 shop-again" href="/payChoice/{{=it.orderInfo.sec}}">在线支付</a></div>
                           <div class="bottom-but"><a class="bb-btn1" onclick="cancelOrder()">取消订单</a></div>
               {{??}}
             {{?}}
             {{? it.orderInfo.return_status==="ex"||it.orderInfo.return_status==="re"}}
                    <div class="bottom-but"><a class="bb-btn1" style="width:100px;"href="/{{? it.orderInfo.return_status==="ex"}}exProcess{{?? it.orderInfo.return_status==="re"}}reProcess{{?}}/{{=it.orderInfo.order_id}}">退换货进行中</a>
                     </div>
              {{?}}
              {{? it.orderInfo.return_status==="exo"||it.orderInfo.return_status==="reo"}}
                                  <div class="bottom-but"><a class="bb-btn1" style="width:100px;"href="/{{? it.orderInfo.return_status==="exo"}}exProcess{{?? it.orderInfo.return_status==="reo"}}reProcess{{?}}/{{=it.orderInfo.order_id}}">退换货已完成</a>
                                   </div>
               {{?}}
      </div>
</div>