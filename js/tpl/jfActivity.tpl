{{~ it:item}}
  <div class="cont-list">
        <div class="contList-img"><a href="jfDetail/{{=item.goods_id}}.html">
             {{? item.phone_img===""||item.phone_img===undefined}}
                <img src="/image/like3.jpg" alt="">
             {{??}}
                <img src="{{=item.phone_img}}" alt="">
             {{?}}
         </a></div>
        <p>{{=item.goods_name}}</p>
        <div class="pace">
            <span>￥<i>{{=item.shop_price}}</i></span>
            <span class="cr pace-icon"><img src="image/jf.png" alt=""><i >{{=item.integral_num}}</i>积分</span>
            <button class="btn" onclick="exchange({{=item.goods_id}})">立即兑换</button>
        </div>
 </div>
{{~}}