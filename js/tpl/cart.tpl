{{~it.info.allcart:item:index}}
    <div class="proListBox {{? item.isInorder===1&&item.flag===1}}proListBoxBlue{{?}}">
        <div class="check-box1">
        {{? item.isInorder===1}}
            {{? item.flag===1}}
                <input type="checkbox" id="check{{=index}}" name="chkItem"  recId="{{=item.rec_id}}" onclick="onlyClinkCart(this)" checked>
            {{??}}
                <input type="checkbox" id="check{{=index}}" name="chkItem"  recId="{{=item.rec_id}}" onclick="onlyClinkCart(this)">
            {{?}}
            <label for="check{{=index}}">checkbox</label>
             {{?}}
        </div>
        <a href="javascript:void(0)" class="btnDelete" onclick="cartDelItem(this)" recId="{{=item.rec_id}}"></a>
        <a class="imgBox" href="/goods/{{=item.goods_id}}.html"> <img src="{{=item.goods_img}}"></a>
        <div class="textBox">
            <p class="title"> <a href="/goods/{{=item.goods_id}}.html">{{=item.goods_name}}</a> </p>
            <p class="price"><span class="price_l">¥ {{=item.goods_price}}</span></p>
            <div class="numCount">
                <span class="reduce{{? item.goods_number===1}} reduceDisable{{?}}" data-attach-point="reduceNum"  onclick="cartDel(this)" recId="{{=item.rec_id}}">-</span>
                <input class="count-input" type="text" name="BuyCount" value="{{=item.goods_number}}" onblur="cartBlur(this)" recId="{{=item.rec_id}}">
                <span class="add" onclick="cartAdd(this)" recId="{{=item.rec_id}}">+</span>
            </div>
        </div>
    </div>
{{~}}

<!--底部-->
<div class="ord-bot">
    <a class="red_btn" onclick="cartPay()">去结算</a>

    <span class="finMoney">实付款：<span class="totalMoney">{{=it.info.cartInfo.totalPrice}}</span></span>
    <span class="postage">满99全场包邮</span>
</div>



<!--弹出层-->
<div id="top" class="topdiv">
    <ul class="clear_his">
        <li class="tophis">确认要删除这个宝贝吗？</li>
        <li>
            <span class="cancel" id="cancel"><a>取消</a></span>
            <span class="confirm" id="ok"><a>确定</a></span>
        </li>
    </ul>
</div>
<!--遮罩层-->
<div id="below" class="belowdiv" style="display: none;"></div>
<!--提示框-->
<div class="dialog" style="display: none">
    <a class="diaInfo"></a>
</div>