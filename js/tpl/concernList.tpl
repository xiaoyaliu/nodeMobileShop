{{~ it:item}}
      <div class="att-Info-box" data-attach-point="browser-box">
                  <div class="att-tit">
                      <a onclick="delBrowser(this,{{=item.rec_id}})"></a>
                      <p>优德医药网</p>
                  </div>
                   <a  href="/goods/{{=item.goods_id}}.html" style=""display:block;>
                      <div class="att_cont">
                          <div class="att-cont-img">
                              <img src="{{? !item.mgoods_img}}{{=item.goods_img}}{{??}}{{=item.mgoods_img}}{{?}}">
                          </div>
                          <div class="att-con-name">
                              <p>
                                  {{=item.goods_name}}
                              </p>
                          </div>
                      </div>
                  </a>
                  <div class="att-allPrice">
                      <p>
                          价格：
                          <span class="total-price"> {{=item.shop_price}}</span>
                      </p>
                      <a class="att_btn" onclick="goBuy({{=item.goods_id}})">立即购买</a>
                  </div>
                  <p class="bot-gray"></p>
              </div>
              {{~}}

