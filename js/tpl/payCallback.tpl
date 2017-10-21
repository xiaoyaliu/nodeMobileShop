{{? it.st===1}}
<header class="cateHeader">
      <div class="search_back" onclick="history.back()"></div>
      <a class="goodCate">订单支付成功</a>
      <div class="go-quick-click" id="go-quick-click">
            <a></a>
      </div>
</header>


<div class="pay_success">
      <div class="sucInfo">
            <p class="payDio" >订单支付成功</p>
            <p class="payMoney">订单金额：<i class="orderMon">{{=it.total_fee}}</i></p>
      </div>
      <div class="ope">
            <a class="goBuy" href="/">继续购物</a>
            <a class="search_ord" href="/oDetail/{{=it.order_id}}">查看订单</a>
            <div class="clear"></div>
      </div>
      <div class="drawPart" onclick='drawPart({{=it.order_id}})'>抽取优德之夜·热歌榜中榜门票</div>
</div>
{{?? it.st===0}}
<header class="cateHeader">
    <div class="search_back" onclick="history.back()"></div>
    <a class="goodCate">订单支付失败</a>
    <div class="go-quick-click" id="go-quick-click">
        <a></a>
    </div>
</header>
<div class="pay_success">
    <div class="sucInfo">
        <p class="payFail" >订单支付失败</p>
        <p class="payMoney">订单金额：<i class="orderMon">{{=it.total_fee}}</i></p>
    </div>
    <div class="ope">
        <a class="goPay" href="/payChoice/{{=it.order_id}}">继续支付</a>
        <div class="clear"></div>
    </div>
</div>
{{?}}
<div class="quick-go-div" id="quick-go-div" style="display: none;">
        <ul class="botList">
        <li> <a href="/">首页</a> </li>
        <li> <a href="/cart">购物车</a> </li>
        <li> <a href="/user">用户中心</a> </li>
         <li> <a href="/logisticsAll">物流查询</a> </li>
          </ul>
</div>