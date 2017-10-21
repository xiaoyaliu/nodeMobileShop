<div class="jfRecordSection">
    <div class="recordList-2 clearfix">
        <div class="recordListCont clearfix">
            <div class="recordListCont-1"><img src="{{=it.goods.goods_img}}" alt=""></div>
            <div class="recordList-1">
                <p class="recordTitle">{{=it.goods.goods_name}}</p>
                <p class="recordP">
                    <span class="jf">{{=it.goods.goods_integral}}</span>积分
                    <span>1件</span>
                    {{?it.goods.status==1}}
                    <span class="jfZt">已收到订单</span>
                    {{??it.goods.status==2}}
                    <span class="jfZt">配货中</span>
                    {{??it.goods.status==3}}
                    <span class="jfZt">配送中</span>
                    {{??it.goods.status==4}}
                    <span class="jfZt">已完成</span>
                    {{??it.goods.status==5}}
                    <span class="jfZt">已取消</span>
                    {{?}}
                </p>
            </div>
        </div>
    </div>
</div>
<div class="whMessage">
    <p>物流信息</p>
    {{?it.logistics==null}}
        <p data-attach-point='wlMessage' class="wlMessage">
                 <span>暂无更多物流信息</span>
        </p>
    {{??}}
        {{~it.logistics.lastResult.data:item}}
                <p data-attach-point='wlMessage' class="wlMessage">
                    <span>{{=item.time}}</span>
                    <span>{{=item.context}}</span>
                </p>
        {{~}}
    {{?}}


</div>