{{? it.length>0}}
{{~ it:item}}
 <div class="browse-Info-box" data-attach-point="browser-box">
            <div class="brow-tit">
                  <a onclick="delBrowser(this,{{=item.rec_id}})"></a>
                  <p>优德医药网</p>
            </div>
           <a  href="/goods/{{=item.goods_id}}.html" style=""display:block;>
                <div class="brow_cont">
                      <div class="brow-cont-img">
                            <img src="{{? !item.info.mgoods_img}}{{=item.info.goods_img}}{{??}}{{=item.info.mgoods_img}}{{?}}">
                      </div>
                      <div class="brow-con-name">
                            <p>{{=item.info.goods_name}}</p>
                      </div>
                </div>
             </a>
            <div class="brow-allPrice">
                  <p>
                        价格：
                        <span class="total-price">{{=item.info.shop_price}}</span>
                  </p>

                  {{? item.info.is_otc==="0"}}
                   <a class="brow_btn" onclick="goBuy({{=item.goods_id}})">立即购买</a>
                  {{??}}
                    <a class="brow_btn brow_btn_otc" href="/needReg/{{=item.goods_id}}">需求登记</a>
                  {{?}}
            </div>
            <p class="bot-gray"></p>
      </div>
      {{~}}
      {{??}}
      <div class="no-visit">
          <div class="empty_visit taCenter">
              <div class="img_visit">
                  <img src="/image/none.png">
              </div>
              <p>还没有相关信息</p>
              <div class="go_home"><a href="/" class="bule_btn">去逛逛</a></div>
          </div>
      </div>
      {{?}}