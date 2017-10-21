      <div class="ord_id_box">
            <p>订单编号：<i>{{=it.orderInfo.order_sn}}</i></p>
            <p class="order_date">下单时间：<i>{{=it.orderInfo.add_time}}</i></p>
      </div>
{{~ it.orderGoodsInfo:item:index}}
      <div class="con-return clearfix" data-attach-point="return-goods">
            <div class="sel-return">
                  <div class="check-box1">
                        <input type="checkbox" data-attach-point="labelBox" id="check{{=index}}">
                        <label for="check{{=index}}">check</label>
                  </div>
                  <div class="imgBox">
                        <img src="{{=item.goods_img}}">
                  </div>
                  <div class="textBox">
                        <p class="title">
                              <a>{{=item.goods_name}}</a>
                        </p>
                        <p class="price">
                              <span class="price_l">¥<strong data-attach-point="gd-one-price">{{? item.activity_price=="0"||item.activity_price=="0.00"}}{{=item.activity_price}}{{??}}{{=item.goods_price}}{{?}}</strong></span>
                        </p>
                  </div>
            </div>
            <div class="app-count clearfix">
                  <p>换货数量</p>
                  <div class="app-num" data-attach-point="app-num">
                        <span class="reduce {{? item.goods_number==1}}reduceDisable{{?}}" data-attach-point="reduceNum">-</span>
                        <input class="count-input" type="text" data-attach-point="count-input" data-max={{=item.goods_number}} name="num[{{=item.rec_id}}]" value="{{=item.goods_number}}">
                        <span class="add reduceDisable" data-attach-point="addNum">+</span>
                  </div>
            </div>
            <input type=hidden data-attach-point="gid" value="{{=item.rec_id}}"/>
      </div>
      {{~ }}