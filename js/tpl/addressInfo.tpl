
<header class="cateHeader">
      <div class="search_back" onclick="history.back()"></div>
      <a class="goodCate">编辑收货地址</a>
</header>
<!--收货信息-->
<div class="insertBox">
      <form data-attach-point="form">
            <div class="newAddress">
                  <div class="address">
                        <span>收&nbsp;货&nbsp;人&nbsp;：</span>
                        <input type="text" name="consignee" maxlength="20" onkeyup="value=value.replace(/[^A-Za-z\u4E00-\u9FA5]/g,'')" onbeforepaste="clipboardData.setData(''text'',clipboardData.getData(''text'').replace(/[^A-Za-z\u4E00-\u9FA5]/g,''))" value="{{=it.addressRs.consignee}}">
                  </div>
                  <div class="address">
                        <span>联系方式：</span>
                        <input type="text" name="mobile" maxlength="11" value="{{=it.addressRs.mobile}}">
                  </div>
                  <div class="address addressIn">
                        <span>所在地区：</span>
                        <input type="button" data-attach-point="addressInfo" value="{{=it.addressRs.provinceName}}{{=it.addressRs.cityName}}{{=it.addressRs.districtName}}" onclick="areaShow()">
                  </div>
                  <div class="address addressDetail">
                        <span>详细地址：</span>
                        <textarea class="textArea" onkeyup="value=value.replace(/[^A-Za-z\d\u4E00-\u9FA5]/g,'')" onbeforepaste="clipboardData.setData(''text'',clipboardData.getData(''text'').replace(/[^A-Za-z\d\u4E00-\u9FA5]/g,''))" name="address">{{=it.addressRs.address}}</textarea>
                  </div>
                  <div class="address">
                        <p class="detail_p">设为默认地址：</p>
                        <div class="button_mo button_off_mo{{? it.addressRs.is_default=="1" }} button_on_mo{{?}}"></div>
                  </div>
            </div>
            <input type="hidden" id="hide1" name="province" value="{{=it.addressRs.province}}">
            <input type="hidden" id="hide2" name="city" value="{{=it.addressRs.city}}">
            <input type="hidden" id="hide3" name="district" value="{{=it.addressRs.district}}">
            <input type="hidden"  name="setdefault" value="{{=it.addressRs.is_default}}">
            <input type="hidden"  name="address_id" value="{{=it.addressRs.address_id}}">
            <div class="operate">
                  <button type="button" class="saveBtn btn-primary btn-block" onclick="save()">保&nbsp;存</button>
            </div>
      </form>
</div>