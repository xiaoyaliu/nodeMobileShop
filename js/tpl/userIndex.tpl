<div class="head-img">
        <div class="search_back go-back" onclick="window.history.back()"></div>
        <div class="my-info"> <span class="my-img"> <img src="{{=it.avatar}}"> </span>

            <div class="my-person-info" style="display: block">
             <p class="my-head-name" data-attach-point="mn"></p>
                   {{? it.rank_id==="14" }}
                      <p class="my-head-type my-head-type1">{{=it.rank}}</p>
                   {{?? it.rank_id==="13" }}
                      <p class="my-head-type my-head-type2">{{=it.rank}}</p>
                   {{?? it.rank_id==="12" }}
                       <p class="my-head-type my-head-type3">{{=it.rank}}</p>
                    {{?? it.rank_id==="11" }}
                        <p class="my-head-type my-head-type4">{{=it.rank}}</p>
                    {{?? it.rank_id==="10" }}
                        <p class="my-head-type my-head-type5">{{=it.rank}}</p>
                    {{?}}

            </div>
        </div>
    </div>
            <!--商品状态-->
    <ul class="user_center_list clearfix">
    <li> <a href="/order/wp"> <span> <i class="shopcar_num">{{=it.waitPay}}</i> <img src="image/waitpay.png"> </span>待付款 </a> </li>
    <li> <a href="/order/wc"> <span> <i class="shopcar_num">{{=it.waitConfirm}}</i> <img src="image/waitgood.png"> </span>待收货 </a> </li>
    <li> <a href="/order/wr"> <span> <i class="shopcar_num">{{=it.waitRate}}</i> <img src="image/waitpi.png"> </span>待评价 </a> </li>
    </ul>
