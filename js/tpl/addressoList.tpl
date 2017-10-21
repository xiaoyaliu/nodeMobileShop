      <header class="cateHeader">
            <div class="search_back" onclick="history.back()"></div>
            <a class="goodCate">收货地址</a>
      </header>
      <!--收货地址列表-->
      {{? it.length>0}}
            <div class="addressList">
            {{~ it:item:index}}
                  <ul class="addressList_ul" data-attach-point="addressList">
                        <li class="topLi" onclick="goOrderSure({{=item.address_id}})">
                              <div class="address_li_div">
                                    <p class="peopleMessage">
                                          <span>{{=item.consignee}}</span>
                                          <span>{{=item.mobile}}</span>
                                    </p>
                                    <p class="addressMessage">
                                         {{=item.provinceName}}{{=item.cityName}}{{=item.districtName}}{{=item.address}}
                                    </p>
                              </div>
                        </li>
                        <li class="editBox" style="display: -webkit-box ">
                              <div class="address_li_div">
                                    <div class="ofterAdd">
                                         {{? item.is_default==="1"}}
                                          <input type="checkbox" data-attach-point="checked" checked="checked"  id="default{{=index}}">
                                          <label data-attach-point="label" onclick="setDefault(this,{{=item.address_id}})">默认地址</label>
                                          {{??}}
                                          <input type="checkbox"  data-attach-point="checked" id="default{{=index}}">
                                          <label data-attach-point="label" onclick="setDefault(this,{{=item.address_id}})">设为默认</label>
                                          {{?}}
                                    </div>
                              </div>
                              <div class="address_edit">
                                    <span><a href="/addroEdit/{{=item.address_id}}">编辑</a></span>
                              </div>
                              <div class="address_delete">
                                    <span onclick="delAddress(this,{{=item.address_id}})">删除</span>
                              </div>
                        </li>
                  </ul>

               {{~}}
            </div>

            <div class="add_ress_box">
                  <input type="button" onclick="insertAdd()" value="新增收货地址">
            </div>
             {{??}}

            <div class="null_address">
                        <div class="cart_null">
                              <div class="empty_cart addCenter">
                                    <div class="img_add">
                                          <img src="/image/noaddress.png">
                                    </div>
                                    <p>您还没有收货地址哦！</p>
                                    <div class="go_add"><a insertAdd() class="go_add_btn">现在添加</a></div>
                              </div>
                        </div>
                  </div>
                  {{?}}