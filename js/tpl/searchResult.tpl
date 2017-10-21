{{~ it:item}}
     <li  onclick="href_if({{=item.goodsid}})">
        <div class="clearfix">
            <div class="list_left">
                <a href="javascript:void(0);"><img src="{{=item.img}}" alt=""></a>
            </div>
            <div class="list_fight">
                <div class="list-detail">
                    <p class="ftcolor"><a href="javascript:void(0);">{{=item.brief}}</a></p>
                    <p class="fcolor">产品规格：{{=item.attr}}</p>
                    <p class="fcolor">产品单价：￥{{=item.shop_price}}</p>
                </div>
                <div class="list-detail2">
                    {{~item.viewplan:value:index}}
                         <p class="fcolor">{{? value.proname==0}}{{= ""}}{{??}}{{= value.proname}}{{?}}</p>
                         <p class="ccolor">{{= value.proget}}</p>
                    {{~}}
                     <p class="ccolor">{{? item.coupon==null}}{{= ""}}{{??}}{{= item.coupon}}{{?}}</p>
                </div>
            </div>
        </div>
        <div class="so-footer"><img src="../image/so-line.jpg" alt=""></div>
    </li>
{{~}}