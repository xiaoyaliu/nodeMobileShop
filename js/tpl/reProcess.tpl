<!--退货退款-->
<div class="return-box-state">
    <ul class="ul-ret ul-after ul_green">
        <li class="ul-ret-li{{? it.is_pass==0}} ul-ret-li-cur{{?}}">
            <div class="ret_mon_box ret_first">
                <p class="ret-state-p col-green  {{? it.is_pass==0}}big-green{{?}}">提交申请</p>
            </div>
            {{? it.is_pass==0}}
            <!--提交申请成功-->
            <div class="success-apply" style="display:block">
                <div class="apply-dialog-suc">
                    <p class="appDio">提交成功</p>
                </div>
                <div class="apply-Info-suc">
                    <p>客服会在3个工作日内处理你的退货退款申请</p>
                    <p>退货编号：<span>{{=it.sn}}</span></p>
                    <p class="hotLine-call">客服热线：<a href="tel:4008606111">4008-606-111</a></p>
                </div>
            </div>
            {{?}}
        </li>
        <li {{? it.is_pass!=0}}class="ul-ret-li"{{?}}>
            <div class="ret_mon_box">
                <p class="ret-state-p  {{? it.is_pass==1&&it.invoice_no==0&&it.delivery_name==""}}big-green{{?? it.is_pass==3}}big-green{{?}}">客服审核</p>
            </div>
            {{? it.is_pass==3}}
            <!--审核失败-->
            <div class="check-fail" style="display: block">
                <div class="check-fail-dia">
                    <p class="checkDio">审核失败</p>
                </div>
                <div class="check-Info-fail">
                    <p class="check-fail-tit">您的退货商品不符合退货规则，无法退货！</p>
                    <p class="hotLine-call">客服热线：<a href="tel:4008606111">4008-606-111</a></p>
                </div>
                <div class="check-fail-btn">
                    <a class="return-rule" href="/returnRule" style="display:block;">查看退/换货规则</a>
                </div>

            </div>
            {{?}}
            {{? it.is_pass==1&&it.invoice_no==0&&it.delivery_name==""}}
            <!--审核通过-->
            <div class="check-suc">
                <p class="check_state">审核通过
                <!--<p>快递单号<i>*</i>--><br>
                    <span class="apply-tit">你的退货退款申请已成功，请退货给商家！</span>
                </p>
                <div class="return-details-input">
                    <input readonly="readonly" type="text" class="re select-input" data-attach-point="select-input" placeholder="请选择" autocomplete="off">
                    <ul class="select-down-list" data-attach-point="select-down-list" style="display: none;">
                       {{~ it.shippingInfo:item}}
                        <li data-id="{{=item.shipping_code}}">{{=item.shipping_name}}</li>
                        {{~}}
                    </ul>
                </div>
                <div class="return-details-input">
                    <input type="text" class="re" name="invoiceNo" autocomplete="off" placeholder="请输入您的快递编号">
                </div>
                <div class="return-details-but">
                    <button class="ret-commit" data-attach-point="saveShipping">提交</button>
                </div>

            </div>
            {{?}}
        </li>
        <li  {{? it.is_pass==2||it.is_pass==4}}class="ul-ret-li"{{?? it.is_pass==1&&it.invoice_no!=0&&it.delivery_name!=""}}class="ul-ret-li"{{?}}>
            <div class="ret_mon_box">
                <p class="ret-state-p {{? it.is_pass==1&&it.invoice_no!=0&&it.delivery_name!=""}} big-green{{?}}">买家退货</p>
            </div>
 {{? it.is_pass==1&&it.invoice_no!=0&&it.delivery_name!=""}}
            <!--退货物流状态-->
            <div class="retu-logic-state">
                <div class="retu-logic-con">
                    <div class="retu-logic-top">
                         {{? it.is_pass==2}}<p class="goods-status">商品已被签收</p>{{?}}
                        <p>物流公司：<span>{{=it.delivery_name}}</span></p>
                        <p>运单号码：<span>{{=it.invoice_no}}</span></p>
                    </div>
                    {{? it.shipping!=""}}

                    <ul class="ret-logic-ul">
                    {{~ it.shipping:item}}
                        <li>
                            <div class="ret-mon-div ret_first">
                                <div class="left-data">{{=item.time}}</div>
                                <div class="ret-time">
                                    <p class="clearfix"><span class="rt-log-sta">{{=item.context}}</span></p>
                                </div>
                            </div>
                        </li>
                        {{~}}
                    </ul>
                    {{??}}
                     <ul class="ret-logic-ul">
                     <li>
                      物流更新中
                      </li>
                    </ul>
                    {{?}}
                </div>
            </div>
             {{?}}
        </li>
        <li {{? it.is_pass==2||it.is_pass==4}}class="ul-ret-li"{{?}}>
            <div class="ret_mon_box">
                <p class="ret-state-p">退货完成</p>
            </div>
        </li>
    </ul>
 {{? it.is_pass==2}}
    <!--退货退款完成-->
    <div class="out-suc-div" style="display:block">
        <div class="complete-apply">
            <div class="apply-dialog-com">
                <p class="appDio">退货退款完成</p>
            </div>
            <div class="apply-fin-suc">
                <p>退款金额：<span class="ret-price">¥{{=it.money}}</span></p>
                <p>退货编号：<span>{{=it.sn}}</span></p>
                <p class="hotLine-call">客服热线：<a href="tel:4008606111">4008-606-111</a></p>

            </div>

        </div>
    </div>
 {{?}}
  {{? it.is_pass==4}}
                <div class="check-fail" style="display: block">
                  <div class="check-fail-dia">
                      <p class="checkDio">退款失败</p>
                  </div>
                  <div class="check-Info-fail">
                      <p class="check-fail-tit">您可以联系客服咨询失败原因！</p>
                      <p class="hotLine-call">客服热线：<a href="tel:4008606111">4008-606-111</a></p>
                  </div>
              </div>
  {{?}}
</div>