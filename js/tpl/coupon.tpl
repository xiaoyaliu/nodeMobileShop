<ul class="coupon" data-attach-point="tab">
      <li class="active" onclick="tabChange(this,0)">
            <a>未使用&nbsp;<span>({{=it.canuseNum}})</span></a>
      </li>
      <li onclick="tabChange(this,1)">
            <a>已使用&nbsp;<span>({{=it.useedNum}})</span></a>
      </li>
      <li onclick="tabChange(this,2)">
            <a>已过期&nbsp;<span>(<strong data-attach-point="nouseNum">{{=it.nouseNum}}</strong>)</span></a>
      </li>
</ul>
<!--未使用优惠券-->
<div class="coupon-unused-box" data-attach-point="tabSon">
    {{? it.canuse.length>0}}
    {{~it.canuse:item}}
    <div class="coupon-unused">
            <div class="cou-box">
                  <p class="coupon-tit"><span>{{=item.denomination}}</span>元优惠券</p>
                  <p class="minSpend">【消费满{{=item.couponmeet}}可用】</p>
                   <p class="ce-time">{{=item.receivetime}}--{{=item.endtime}}
                                          <a class="browse">去逛逛，现在使用</a>
                                      </p>

            </div>
      </div>
      {{~}}
      {{??}}
      <div class="coupon-null">
            <div class="null-coupon">
                  <div class="empty_coupon">
                        <div class="dole">
                              <img src="/image/null-cou.png">
                        </div>
                        <p>您目前没有优惠券</p>
                        <div class="dole-center">
                              <a href="/" class="go_dole_btn">去逛逛</a>
                        </div>
                  </div>
            </div>
      </div>
      {{?}}
</div>
<!--已使用-->
<div class="coupon-used-box"  data-attach-point="tabSon" style="display: none">
      {{? it.useed.length>0}}
       {{~it.useed:item}}
      <div class="coupon-used">
            <div class="used-con-box">
                  <p class="used-tit"><span>{{=item.denomination}}</span>元优惠券</p>
                  <p class="used-minSpend">【消费满{{=item.couponmeet}}可用】</p>
                   <p class="ce-time">{{=item.receivetime}}--{{=item.endtime}}</p>
            </div>
            <span class="cou-used-img"></span>
      </div>
      {{~}}
            {{??}}
            <div class="coupon-null">
                  <div class="null-coupon">
                        <div class="empty_coupon">
                              <div class="dole">
                                    <img src="/image/null-cou.png">
                              </div>
                               <p>您目前没有优惠券</p>
                                                      <div class="dole-center">
                                                            <a href="/" class="go_dole_btn">去逛逛</a>
                                                      </div>
                        </div>
                  </div>
            </div>
            {{?}}
</div>
<!--已过期-->
<div class="coupon-expired-box"  data-attach-point="tabSon" style="display: none">
 {{? it.nouse.length>0}}
       {{~it.nouse:item}}
      <div class="coupon-expired">
            <div class="expired-con-box">
                  <p class="expired-tit"><span>{{=item.denomination}}</span>元优惠券</p>
                  <p class="expired-minSpend">【消费满{{=item.couponmeet}}可用】</p>
                   <p class="ce-time">{{=item.receivetime}}--{{=item.endtime}}</p>
            </div>
            <span class="cou-expired-img"></span>
            <div class="cou-Opacity" data-attach-point="deleteBtn" onclick="deleteCoupon(this,{{=item.id}})"></div>
      </div>
      {{~}}
       <div class="delete-All"  data-attach-point="deleteAll">
                  <p>全部删除</p>
              </div>
            {{??}}
            <div class="coupon-null">
                  <div class="null-coupon">
                        <div class="empty_coupon">
                              <div class="dole">
                                    <img src="/image/null-cou.png">
                              </div>
                               <p>您目前没有优惠券</p>
                               <div class="dole-center">
                                    <a href="/" class="go_dole_btn">去逛逛</a>
                                </div>
                        </div>
                  </div>
            </div>
            {{?}}
</div>