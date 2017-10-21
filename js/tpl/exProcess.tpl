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
                    <p>客服会在3个工作日内处理你的换货申请</p>
                    <p>换货编号：<span>{{=it.sn}}</span></p>
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
                    <p class="check-fail-tit">您的换货商品不符合换货规则，无法换货！</p>
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
                    <span class="apply-tit">换货申请已成功，请将换货商品发给商家！</span>
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
        <li  {{? it.is_pass==2||it.is_pass==4||it.is_pass==5}}class="ul-ret-li"{{?? it.is_pass==1&&it.invoice_no!=0&&it.delivery_name!=""}}class="ul-ret-li"{{?}}>
            <div class="ret_mon_box">
                <p class="ret-state-p {{? it.is_pass==1&&it.invoice_no!=0&&it.delivery_name!=""}} big-green{{?}}">买家退货</p>
            </div>
 {{? it.is_pass==1&&it.invoice_no!=0&&it.delivery_name!=""}}
            <!--退货物流状态-->
            <div class="retu-logic-state">
                <div class="retu-logic-con">
                    <div class="retu-logic-top">
                         {{? it.is_pass==2}}<p class="goods-status">商品已被签收</p>{{?}}
                        <p>物流公司：<span>{{=it.user_delivery_name}}</span></p>
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
        <li {{? it.is_pass==2||it.is_pass==4||it.is_pass==5}}class="ul-ret-li"{{?}}>
                    <div class="ret_mon_box">
                        <p class="ret-state-p col-green {{? it.is_pass==2||it.is_pass==4}}big-green{{?}}">重新发货</p>
                    </div>
                    {{? it.is_pass==2&&it.invoice_no!=0&&it.back_delivery_name!=""}}
                                <!--退货物流状态-->
                                <div class="retu-logic-state">
                                    <div class="retu-logic-con">
                                        <div class="retu-logic-top">
                                             {{? it.is_pass==5}}<p class="goods-status">商品已被签收</p>{{?}}
                                            <p>物流公司：<span>{{=it.back_delivery_name}}</span></p>
                                            <p>运单号码：<span>{{=it.back_invoice_no}}</span></p>
                                        </div>
                                        {{? it.back_shipping!=""}}

                                        <ul class="ret-logic-ul">
                                        {{~ it.back_shipping:item}}
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
                                    <div class="check-fail-btn" style="width:120px;background-color:#1661df;color:#fff;border:none;" onclick="confirm()">
                                        <a class="return-rule" style="color:#fff;" >确认收货</a>
                                    </div>
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
        <li {{? it.is_pass==5}}class="ul-ret-li"{{?}}>
            <div class="ret_mon_box">
                <p class="ret-state-p">换货完成</p>
            </div>
        </li>
    </ul>
 {{? it.is_pass==5}}
    <!--退货退款完成-->
    <div class="out-suc-div" style="display:block">
        <div class="complete-apply">
         <div class="apply-dialog-com">
                        <p class="appDio">换货完成</p>
                    </div>
                    <div class="apply-fin-suc">
                        <p>换货编号：<span>{{=it.sn}}</span></p>
                         <p class="hotLine-call">客服热线：<a href="tel:4008606111">4008-606-111</a></p>
                    </div>
        </div>
    </div>
 {{?}}
</div>