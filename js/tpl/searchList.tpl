{{~ it:item}}
    <li>
        <a href="/goods/{{=item.goods_id}}.html">
            <div class="resultShow">
                <div class="resultLeft">
                    <div class="resultBorder">
                        <img src="{{? item.mgoods_img===""||item.mgoods_img===undefined}}{{=item.goods_img}}{{??}}{{=item.mgoods_img}}{{?}}">
                    </div>
                </div>
                <div class="resultRight">
                    <p class="rowP1">{{=item.goods_name}}</p>
                    <div class="rowP2">
                        <span class="row2Span1"><i>¥</i>{{=item.shop_price}}</span>
                        <span class="original-price">{{=item.market_price}}</span>
                    </div>
                </div>
            </div>
        </a>

       {{? item.is_out===1&&item.goods_number>10}}
            <div class="cart" data-attach-point="addCar" gid="{{=item.goods_id}}"></div>
       {{?}}
    </li >
{{~}}