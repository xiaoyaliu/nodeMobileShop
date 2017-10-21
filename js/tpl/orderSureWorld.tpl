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
                <a href="/addressWorldList" class="address-link">
                  <div class="address_div">
                        <p class="peopleMessage">
                              <span class="name">{{=it.address.consignee}}</span>
                              <input type="hidden" id="realname" value="{{=it.address.consignee}}">
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
   <!--身份证号-->
      <div class="cartBox3">
            <ul class="goodsMoney">
                  <li>身份证号:<input data-attach-point='cdCard' name="idcard" type="text" placeholder="请输入身份证号码" /></li>
            </ul>
      </div>
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