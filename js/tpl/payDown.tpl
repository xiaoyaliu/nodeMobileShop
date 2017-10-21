<header class="cateHeader">
            <div class="search_back" onclick="history.back()"></div>
            <a class="goodCate">提交订单</a>
      </header>

      <div class="complete-ord">
            <div class="com-dialog-com">
                  <p class="appDio">提交成功</p>
            </div>
            <div class="ord-fin-suc">
                  <p><label>订单编号：</label><span>{{=it.orderSn}}</span></p>
                  <p><label>定单金额：</label><i class="ord_pay">{{=it.orderAmount}}</i></p>
                  <p><label>支付方式：</label><span>货到付款</span></p>
            </div>
      </div>

      <div class="submit_ord_btn">
            <a class="look_ord" href="/oDetail/{{=it.orderId}}">查看订单</a>
            <a class="goBuy" href="/">继续购物</a>
            <div class="clear"></div>
     </div>