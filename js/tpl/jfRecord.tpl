 {{~it:item}}

 <div class="recordList clearfix">
        <p class="recordOtherNum">订单号: <span>{{=item.order_sn}}</span></p>
        <a href="/jfExchangeDetail/{{=item.order_id}}.html">
            <div class="recordListCont clearfix">
                <div class="recordListCont-1"><img src="{{=item.goods_img}}" alt=""></div>
                <div class="recordListCont-2">
                    <p class="recordTitle">{{=item.goods_name}}</p>
                    <p class="recordJf"><span>{{=item.goods_integral}}</span>积分<img src="/image/jf.png" alt=""></p>
                    <p class="recordNum">数量：x<span>1</span></p>
                </div>
            </div>
        </a>
        <div class="zt clearfix">
        {{?item.status==1}}
            <span class="zt-span">已收到订单</span>
            <button class="zt-watchBtn" onclick="exitOther({{=item.order_id}})">取消订单</button>
        {{??item.status==2}}
            <span class="zt-span">配货中</span>
            <button class="zt-againBtn" onclick="dhAgain({{=item.goods_id}})">再次兑换</button>
        {{??item.status==3}}
            <span class="zt-span">配送中</span>
            <button class="zt-watchBtn" onclick="quire({{=item.order_id}})">确认收货</button>
            <button class="zt-againBtn" onclick="watchWl({{=item.order_id}})">查看物流</button>
        {{??item.status==4}}
            <span class="zt-span">已完成</span>
            <button class="zt-watchBtn" onclick="delOther({{=item.order_id}})">删除订单</button>
            <button class="zt-againBtn" onclick="dhAgain({{=item.goods_id}})">再次兑换</button>
        {{??item.status==5}}
            <span class="zt-span">已取消</span>
            <button class="zt-watchBtn" onclick="delOther({{=item.order_id}})">删除订单</button>
            <button class="zt-againBtn" onclick="dhAgain({{=item.goods_id}})">再次兑换</button>
        {{?}}
        </div>
    </div>

{{~}}