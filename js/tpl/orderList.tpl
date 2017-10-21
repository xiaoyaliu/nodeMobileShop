
        {{~ it:item:index}}
        <div class="allOrder_info" data-attach-point="orderListOne">
            {{? index!==0}}<p class="bot-gray"></p>{{?}}
            <div class="order_id_box">
                {{? item.order_status_info.code==="os5"||item.order_status_info.code==="os6"}}<a onclick="deleteOrder(this,{{=item.order_id}})"></a>{{?}}
                <p>订单编号：<i>{{=item.order_sn}}</i></p>
                <p class="order_date">下单时间：<i>{{=item.add_time}}</i></p>
            </div>

            {{?item.goodsArr.length===1}}
            <!--待收货单商品-->
            <a class="toBlock" href="/oDetail/{{=item.order_id}}">
            <div class="ord_cont relative" style="display:-webkit-box">
                <div class="ord-cont-img">
                    <img src="{{? !item.goodsArr[0].mgoods_img}}{{=item.goodsArr[0].goods_img}}{{??}}{{=item.goodsArr[0].mgoods_img}}{{?}}" />
                </div>
                <div class="ord-con-name">
                    <p>
                       {{=item.goodsArr[0].goods_name}}
                    </p>

                    {{? item.goodsArr[0].rule_name}}
                    <!--促销信息 begin-->
                    <div class='ruleName3 btm-15'>

                        <em>{{=item.goodsArr[0].rule_name}}</em>{{=item.goodsArr[0].rule_con}}

                    </div>
                    <!--促销信息 end-->
                    {{?}}
                </div>
                <div class="ord-cont-num">
                    <span>{{=item.goodsArr[0].goods_number}}</span>
                </div>
            </div>
            </a>
            {{??}}
              <!--待收货多商品-->

            <a class="toBlock" href="/oDetail/{{=item.order_id}}">
             <div class="ord_cont clearfix">
                 {{? item.goodsArr.length<=3}}
                  {{~ item.goodsArr:item2}}
                    <div class="ord-much-img relative">
                        <img src="{{? item2.mgoods_img===''}}{{=item2.goods_img}}{{??}}{{=item2.mgoods_img}}{{?}}">
                        {{? item2.rule_name}}
                        <div class='ruleNameOne'>
                            <em>{{=item2.rule_name}}</em>{{=item2.rule_con}}
                        </div>
                        {{?}}
                    </div>
                  {{~}}
                  {{??}}
                  <div class="swiper-container swiper-container2">
                          <div class="swiper-wrapper">
                          {{~ item.goodsArr:item2}}
                              <div class="swiper-slide relative">
                                <img src="{{? item2.mgoods_img===''}}{{=item2.goods_img}}{{??}}{{=item2.mgoods_img}}{{?}}">
                                {{? item2.rule_name}}
                                <div class='ruleNameSlide'>
                                    <em>{{=item2.rule_name}}</em>{{=item2.rule_con}}
                                </div>
                                {{?}}
                              </div>
                          {{~}}
                          </div>
                    </div>
                  {{?}}
             </div>
             </a>
            {{?}}
            <div class="ordSettlement clearfix">
                <p>实付金额：<i>{{? item.order_amount!=="0.00"}}{{=item.order_amount}}{{??}}{{=item.money_paid}}{{?}}</i></p>
                {{? item.order_status_info.code==="os1"||item.order_status_info.code==="os2"}}
                    <div class="btn-one">
                                <a class="vied-PD" onclick="cancelOrder(this,{{=item.order_id}})">取消订单</a>
                    </div>
                 {{?? item.order_status_info.code==="os3"}}
                    <div class="btn-two">
                                <a class="vied-PD" href="/logistics/{{=item.order_id}}">查看物流</a>
                                <a class="confirm_get" onclick="affirmOrder(this,{{=item.order_id}})">确认收货</a>
                    </div>
                   {{?? item.order_status_info.code==="os4"}}
                     <div {{? item.is_otc===0}}class="btn-two"{{??}}class="btn-one"{{?}}>
                                 {{? item.return_status==="ex"||item.return_status==="re"}}
                                                  <a class="vied-PD" href="/{{? item.return_status==="ex"}}exProcess{{?? item.return_status==="re"}}reProcess{{?}}/{{=item.order_id}}">退换货中</a>
                                 {{??  item.return_status==="exo"||item.return_status==="reo"}}
                                  <a class="vied-PD" href="/{{? item.return_status==="exo"}}exProcess{{?? item.return_status==="reo"}}reProcess{{?}}/{{=item.order_id}}">退换货完成</a>
                                 {{?? item.is_otc===0}}<a class="vied-PD" onclick="goBuyAgain({{=item.order_id}})">再次购买</a>
                                 {{?}}
                                 <a class="confirm_get" onclick="isEvaluate({{=item.order_id}})">去评价</a>
                      </div>
                   {{?? item.order_status_info.code==="os5"}}
                   <div {{? item.is_otc===0}}class="btn-two"{{??}}class="btn-one"{{?}}>
                        {{? item.return_status==="ex"||item.return_status==="re"}}
                                    <a class="vied-PD" href="/{{? item.return_status==="ex"}}exProcess{{?? item.return_status==="re"}}reProcess{{?}}/{{=item.order_id}}">退换货中</a>
                        {{??  item.return_status==="exo"||item.return_status==="reo"}}
                                     <a class="vied-PD" href="/{{? item.return_status==="exo"}}exProcess{{?? item.return_status==="reo"}}reProcess{{?}}/{{=item.order_id}}">退换货完成</a>
                        {?? item.is_otc===0}}
                                   <a class="confirm_get" onclick="goBuyAgain({{=item.order_id}})">再次购买</a>
                         {{?}}
                    </div>
                    {{?? item.order_status_info.code==="os6"&& item.is_otc===0}}
                    <div class="btn-one">
                                    <a class="confirm_get" onclick="goBuyAgain({{=item.order_id}})">再次购买</a>
                     </div>
                      {{?? item.order_status_info.code==="os7"}}
                    <div class="btn-two">
                                    <a class="vied-PD" onclick="cancelOrder(this,{{=item.order_id}})">取消订单</a>
                                    <a class="confirm_get" href="/payChoice/{{=item.sec}}">在线支付</a>
                     </div>
                  {{?}}
            </div>

        </div>
        {{~}}

