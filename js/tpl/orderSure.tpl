<div data-attach-point="section">
<header class="cateHeader">
      <div class="search_back" onclick="history.back()"></div>
      <a class="goodCate">确认订单</a>
        <div class="go-quick-click" id="go-quick-click">
                         <a></a>
                   </div>
         </header>
         <div class="quick-go-div" id="quick-go-div">
               <ul class="botList">
                     <li>
                           <a href="/">首页</a>
                     </li>
                     <li>
                           <a href="/cart">购物车</a>
                     </li>
                     <li>
                           <a href="/user">用户中心</a>
                     </li>
                     <li>
                           <a href="/logisticsAll">物流查询</a>
                     </li>
               </ul>
         </div>
<div class="no-address">
{{? it.address==""}}
      <!--无地址部分-->
      <div class="add-address" style="display: block">
      <a href="/addroInsert" class="address-link">
            <p class="addressTitle">
                  <span class="addiIcon">
                        <img class="no_add" src="/image/noadd.png">
                  </span>
                  <span>添加收货地址</span>
            </p>
        </a>
            <span class="address_tiao"></span>
            <div>
                  <img class="add-xian" src="/image/xian.png">
            </div>

      </div>
{{??}}
      <!--确认地址信息-->

      <div class="address-Info">

            <div class="address_mo">
                <a href="/addressoList" class="address-link">
                  <div class="address_div">
                        <p class="peopleMessage">
                              <span class="name">{{=it.address.consignee}}</span>
                              <span class="phone">{{=it.address.mobile}}</span>
                        </p>
                        <p class="addressMessage">{{=it.address.provinceName}}{{=it.address.cityName}}{{=it.address.districtName}}{{=it.address.address}}
                        </p>
                        {{? it.address.provinceName===("新疆维吾尔自治区")}}
                            <font color="#FF0000">由于新疆地区近期反恐,需本人携带身份证到当地快递网点领取包裹!</font>
                        {{?}}
                  </div>

                  <span class="address_dir"></span>
               </a>
            </div>
            <img class="xian_rep" src="/image/xian.png">
            <input type="hidden" name="addressId" value={{=it.address.address_id}} />

      </div>

{{?}}
      <!--支付信息-->
      <div class="cartBox cart-add-bot">
            <p class="payMethod" data-attach-point="payWay"><a data-attach-point="nowPayWay">在线支付</a>选择支付方式</p>
            <p class="bill" data-attach-point="invoice"><a>不要发票</a>发票信息</p>
      </div>


      <div class="cartBox">
            <div class="payMethod" onclick="showBounds()">
                  <a href="#" class="default-col" data-attach-point="bonus-desc">未使用</a>优惠券
                  {{?it.useBounds.canuseNum!==0}}<span class="cou_num" data-attach-point="canuseNum"><i>{{=it.useBounds.canuseNum}}</i>张可用</span>{{?}}
            </div>
            <div class="payMethod" onclick="showGiftCard()">
                  <a href="#" class="default-col" data-attach-point="gift-desc">未使用</a>礼品卡
            </div>
            <!--<div class="integral" id="integral">
                  <a href="#" class="default-col" data-attach-point="integral">未使用</a>积分
                  <input data-attach-point="points" class="ord-Integral {{? it.maxUsePoints>0}}ord-Integral-focus{{?}}" type="text" {{? it.usePoints==""||it.maxUsePoints<200}}readonly=readonly{{?}} placeholder="共有 {{? it.usePoints!=""}}{{=it.usePoints.usePoints}}{{??}}0{{?}} 个优德积分，本次可用 {{=it.maxUsePoints}} 个积分">
            </div>-->
       </div>
{{? it.goodsInfo.goodsArr.length>0}}
      <!--多商品缩略图-->
      <div class="baoTit clearfix" style="display: block">

      {{~ it.goodsInfo.goodsArr:item}}
            <div class="goodsItem">
                <a href="/goods/{{=item.goods_id}}.html">
                <img src="{{=item.goods_img}}">
                <input type='hidden' value="{{=item.goods_id}}" data-attach-point='gId'>
                <input type='hidden' value="{{=item.goods_number}}" data-attach-point='gNum'>
                </a>
                {{? item.rule}}
                <div class='ruleName'>
                    <em>{{=item.act.name}}</em>{{=item.act.act}}
                </div>
                {{?}}
            </div>
       {{~}}

      </div>
{{??}}

      <!--商品信息列表-->
        {{~ it.goodsInfo.goodsArr:item}}
      <ul class="cartList">
            <li>
                  <div class="displayBox">
                        <div class="cart1Box">
                              <a href="/goods/{{=item.goods_id}}.html"><img src="{{=item.goods_img}}"></a>
                        </div>
                        <div class="cart2Box">
                              <p>{{=item.goods_name}}</p>
                        </div>
                        <div class="cart_price">
                              <span class="cart_pri">{{=item.shop_price}}</span>
                              <span class="cart_num">{{=item.goods_number}}</span>
                        </div>
                  </div>
                  <input type='hidden' value="{{=item.goods_id}}" data-attach-point='gId'>
                  <input type='hidden' value="{{=item.goods_number}}" data-attach-point='gNum'>
            </li>
      </ul>
        {{~}}
{{?}}
      <!--商品价钱-->
      <div class="cartBox3">
            <ul class="goodsMoney">
                  <li>
                        <span class="redPrice" data-attach-point='inactivePrice'>{{= it.goodsInfo.totalPrice}}</span>商品金额
                  </li>
                  <li style="display:none" data-attach-point="routineFee">
                        <span class="fareMoney"></span>货到付款手续费
                   </li>
                  <li>
                        <span class="fareMoney" id="shipping"> {{= it.goodsInfo.shipping}}</span>运费
                  </li>
            </ul>
      </div>

</div>


<!--底部-->
<div class="ord-commit">
      <a class="red_btn" data-attach-point="submit">提交订单</a>实付金额：
      <span class="total-Money" id="totalMoney">{{= it.goodsInfo.realPay}}</span>
</div>
</div>
<!--使用优惠券-->
<div class="use-cou-box" data-attach-point="bonusList" style="display:none;">
      <header class="cateHeader">
            <div class="search_back" onclick="hideBonusBack()"></div>
            <a class="goodCate">使用优惠券</a>
      </header>
      <div class="out-cou-div">
            <ul class="out-cou-ul" data-attach-point="bonusTab">
                  <li class="active"><a>可用优惠券(<span id="canuse"></span>)</a></li>
                  <li class=""><a>不可用优惠券(<span id=nocanuse></span>)</a></li>
            </ul>
            <div class="clear"></div>
            <!--可用优惠券-->
            <div data-attach-point="bonus-tabson" style="display: block">
            <div data-attach-point="canuse-box" style="padding-bottom:48px;padding-top:48px;">
            {{~ it.useBounds.canuse:item:index}}
                 {{? item.couponmeet-it.goodsInfo.totalPrice<=0}}
                    <label for="usable{{=index}}" data-attach-point="canuse">
                        <div class="usable-cou">
                              <div class="sel-cou">
                                    <input type="checkbox" name="voucherID" data-index={{=index}} data-money="{{=item.denomination}}" value="{{=item.id}}" id="usable{{=index}}">
                                     <div></div>
                              </div>
                              <div class="rig-sel-cou">
                                    <p class="dis-count">满<i>{{=item.couponmeet}}</i>元减<i>{{=item.denomination}}</i>元</p>

                                    <p class="end-date">有效期至<span>{{=item.endtime}}</span></p>
                              </div>
                        </div>
                    </label>
                  {{?}}
                  {{~}}

                  </div>
                  <div class="use-con-btn">
                        <a data-attach-point="bonusSure">确认</a>
                  </div>
            </div>
            <!--不可用优惠券-->
            <div data-attach-point="bonus-tabson" style="display: none" >
             <div style="padding-bottom:48px;padding-top:48px;">
             {{~ it.useBounds.canuse:item:index}}
                 {{? item.couponmeet-it.goodsInfo.totalPrice>0}}
                  <div class="disable-cou" data-attach-point="nocanuse">
                        <div class="rig-sel-cou">
                              <p class="dis-count">满<i>{{=item.couponmeet}}</i>元减<i>{{=item.denomination}}</i>元</p>

                              <p class="end-date">有效期至<span>{{=item.endtime}}</span></p>
                        </div>
                  </div>
                  {{?}}
             {{~}}
            {{~ it.useBounds.nouse:item:index}}
                  <div class="disable-cou" data-attach-point="nocanuse">
                        <div class="rig-sel-cou">
                              <p class="dis-count">满<i>{{=item.couponmeet}}</i>元减<i>{{=item.coupontime}}</i>元</p>

                              <p class="end-date">有效期至<span>{{=item.endtime}}</span></p>
                        </div>
                  </div>
            {{~}}
            </div>
            </div>
      </div>
</div>