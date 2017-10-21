<div class="order-head-id">
        <p>订单号：<i>{{=it.order_sn}}</i></p>
    </div>
    <div class="address-Info" style="display:block">
        <div class="address_mo">
            <div class="address_div">
                <p class="peopleMessage">
                    <span class="name">{{=it.consignee}}</span>
                    <span class="phone">{{=it.mobile}}</span>
                </p>
                <p class="addressMessage">
                    <span>{{=it.provinceName}}</span>
                    <span>{{=it.cityName}}</span>
                    <span>{{=it.districtName}}</span>
                </p>
            </div>
            <span class="ord-img-rig">
                </span>
        </div>
    </div>
    <ul class="cartList ord_cont_bot" style="display: block">
        <li>
            <div class="displayBox">
                <div class="cart1Box">
                    <a><img src="{{=it.goods_img}}"></a>
                </div>
                <div class="cart2Box">
                    <p>{{=it.goods_name}}</p>
                    <p class="jfExchange-Cart2">积分:<span>{{=it.goods_integral}}</span></p>
                </div>

            </div>
            <div class="jfExchangeNum">
                <span>数量:x<span>1</span></span><br>
            </div>
        </li>
    </ul>
    <p class="bot-gray-b"></p>
    <div class="btn-bar">
        {{?it.status==1}}
         <div class="bottom-but"><a class="bb-btn1" data-attach-point='dhAgain' name="" onclick="exitOther({{=it.order_id}})">取消订单</a></div>
        {{??it.status==2}}
            <div class="bottom-but"><a class="bb-btn1" data-attach-point='dhAgain' name="" onclick="dhAgain({{=it.goods_id}})">再次兑换</a></div>
        {{??it.status==3}}
           <div class="bottom-but"><a class="bb-btn1" data-attach-point='watchWl' name="" onclick="quire({{=it.order_id}})">确认收货</a></div>
           <div class="bottom-but"><a class="bb-btn1" data-attach-point='watchWl' name="" onclick="watchWl({{=it.order_id}})">查看物流</a></div>
        {{??it.status==4}}
           <div class="bottom-but"><a class="bb-btn1" data-attach-point='watchWl' name="" onclick="delOther({{=it.order_id}})">删除订单</a></div>
           <div class="bottom-but"><a class="bb-btn1" data-attach-point='dhAgain' name="" onclick="dhAgain({{=it.goods_id}})">再次兑换</a></div>
        {{??it.status==5}}
            <div class="bottom-but"><a class="bb-btn1" data-attach-point='watchWl' name="" onclick="delOther({{=it.order_id}})">删除订单</a></div>
            <div class="bottom-but"><a class="bb-btn1" data-attach-point='dhAgain' name="" onclick="dhAgain({{=it.goods_id}})">再次兑换</a></div>
        {{?}}
    </div>
