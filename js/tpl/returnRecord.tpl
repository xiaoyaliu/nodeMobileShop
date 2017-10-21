 <div data-attach-point="re">
 {{~ it.reList:item}}
 <div class="return_shop">
                <!--订单号-->
                <div class="ret_id_box">
                    <p>订单编号：<i>{{=item.order_sn}}</i></p>
                    <p class="order_date">申请时间：<i>{{=item.add_time}}</i>
                        <span class="state_now">{{=item.rtSt}}</span>
                    </p>
                </div>
                {{? item.goodsArr.length===1}}
                <!--退货商品单个-->
                {{~ item.goodsArr:item2}}
                <div class="refund-return">
                    <div class="refund-ret-img">
                        <a href="/goods/{{=item2.goods_id}}.html"><img src="{{=item2.goods_img}}"></a>
                    </div>
                    <div class="refund-ret-name">
                        <p>{{=item2.goods_name}}</p>
                        <p class="refund-ret-cou">
                            <span>{{=item.money}}</span>
                            <span class="num_ref">×{{=item.goods_num}}</span>
                        </p>
                    </div>
                </div>
                {{~}}
                {{??}}
                 <!--退货商品多个-->
                 <div class="much_shop clearfix">
                 {{~ item.goodsArr:item2}}
                                      <a href="/goods/{{=item2.goods_id}}.html"><img src="{{=item2.goods_img}}"></a>
                      {{~ }}
                  </div>
                  {{?}}
                <div class="ret-allPrice">
                    <p>
                        价格：
                        <span class="total-price">{{=item.money}}</span>
                    </p>
                    <a class="look_Info" href="reProcess/{{=item.order_id}}">查看详情</a>
                </div>
 </div>
 {{~}}
 </div>
 <div data-attach-point="ex" style="display:none;">
  {{~ it.exList:item}}
  <div class="return_shop">
                 <!--订单号-->
                 <div class="ret_id_box">
                     <p>订单编号：<i>{{=item.order_sn}}</i></p>
                     <p class="order_date">申请时间：<i>{{=item.add_time}}</i>
                         <span class="state_now">{{=item.rtSt}}</span>
                     </p>
                 </div>
                 {{? item.goodsArr.length===1}}
                 <!--换货商品单个-->
                 {{~ item.goodsArr:item2}}
                 <div class="refund-return">
                     <div class="refund-ret-img">
                         <a href="{{=item2.goods_id}}"><img src="{{=item2.goods_img}}"></a>
                     </div>
                     <div class="refund-ret-name">
                         <p>{{=item2.goods_name}}</p>

                     </div>
                 </div>
                 {{~}}
                 {{??}}
                  <!--换货商品多个-->
                  <div class="much_shop clearfix">
                  {{~ item.goodsArr:item2}}
                                       <a href="{{=item2.goods_id}}"><img src="{{=item2.goods_img}}"></a>
                       {{~ }}
                   </div>
                   {{?}}
                 <div class="ret-allPrice">
                     <p>

                     </p>
                     <a class="look_Info" href="exProcess/{{=item.order_id}}">查看详情</a>
                 </div>
  </div>
  {{~}}
  </div>