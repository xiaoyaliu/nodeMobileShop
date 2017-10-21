{{~ it.orderGoods:item}}
<div class="access-box-con" data-attach-point="commentOne">
            <div class="att_cont">
                  <div class="att-cont-img">
                        <a href="/goods/{{=item.goods_id}}.html"><img src="{{=item.goods_img}}"></a>
                  </div>
                  <div class="att-con-name">
                        <p>{{=item.goods_name}}</p>
                  </div>
            </div>
            <div class="access-Info clearfix">
                  <div class="access-item-info">
                        <span class="access-item-tit">是否与描述一致：</span>
                        <span class="access-item-star" data-attach-point="setP" name="star[{{=item.goods_id}}]">
                            <span onclick="setScore(this,1)"></span>
                            <span onclick="setScore(this,2)" class=""></span>
                            <span onclick="setScore(this,3)" class=""></span>
                            <span onclick="setScore(this,4)" class=""></span>
                            <span onclick="setScore(this,5)" class=""></span>
                        </span>

                        <div class="clear"></div>
                  </div>
                  <div class="access-con">
                         <div class="acc-tit">
                             <span>评价商品:</span>
                         </div>
                        <textarea placeholder="说说你的看法" maxlength="250" name="comment[{{=item.goods_id}}]"></textarea>
                  </div>
                   <input type="hidden" data-role="score"  name="star[{$og_v.goods_id}]"'/>
            </div>
            <div class="refund-img clearfix">
                              <form class="upload-form">
                                  <a><img src="/image/upload_03.png"></a>
                                   <div class="file-input-wrapper">
                                       <input type="file" class="file-input" multiple="multiple"  accept="image/*" name="{{=item.goods_id}}" data-attach-point="file" onchange="uploadImg(this)">
                                    </div>
                                    <div data-attach-point="imgList" class="upload-img-list">

                                    </div>
                                 <input type="hidden" value="{{=item.goods_id}}" name="gid"/>
                                 <input type="hidden" value="{{? it.orderGoods.length===1}}1{{??}}0{{?}}" name="isSingle"/>
                              </form>
              </div>
</div>
{{~}}
<div class="operate">
      <button type="button" class="saveBtn btn-primary" data-attach-point="save" onclick="subSave()">提交评价</button>
</div>