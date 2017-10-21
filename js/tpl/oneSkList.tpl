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
                    <p class="rowP1 rowP3">{{=item.goods_name}}</p>
                    <p class="rowP4"><span class="rowP4-span">{{=item.attr_value}}</span></p>
                    <div class="rowP2">
                        <span class="row2Span1 viprow2Span1"><i>¥</i>{{=item.act_price}}</span>
                       <span class="row2Span1 viprow2Span1 viprow2Span2"><del><i>¥</i>{{=item.shop_price}}</del></span>
                    </div>
                </div>
            </div>
        </a>
    </li >
{{~}}