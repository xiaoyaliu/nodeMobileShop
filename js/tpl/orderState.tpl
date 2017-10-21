<!--订单状态-->
{{? it.all>0}}

        <li data-attach-point="allLi">
            <a data-attach-point="all" onclick="allList()">
                    <span>
                        <i class="shopcar_num">{{=it.all}}</i>
                        <img src="../image/allorder.png">
                    </span>全部订单
            </a>
        </li>
        <li data-attach-point="waitPayLi">
            <a data-attach-point="waitPay" onclick="waitPayList()">
                    <span>
                        <i class="shopcar_num">{{=it.waitPay}}</i>
                        <img src="../image/waitpay.png">
                    </span>待付款
            </a>
        </li>
        <li data-attach-point="waitConfirmLi">
            <a data-attach-point="waitConfirm" onclick="waitConfirmList()">
                    <span>
                        <i class="shopcar_num">{{=it.waitConfirm}}</i>
                        <img src="../image/waitgood.png">
                    </span>待收货
            </a>
        </li>
        <li data-attach-point="waitRateLi">
            <a data-attach-point="waitRate" onclick="waitRateList()">
                    <span>
                         <i class="shopcar_num">{{=it.waitRate}}</i>
                        <img src="../image/waitpi.png">
                    </span>待评价
            </a>
        </li>
{{??}}

    <li class="active">
        <a data-attach-point="all" onclick="allList()">
                <span>
                    <img src="../image/allorder.png">
                </span>全部订单
        </a>
    </li>
    <li>
        <a data-attach-point="waitPay" onclick="waitPayList()">
                <span>
                    <img src="../image/waitpay.png">
                </span>待付款
        </a>
    </li>
    <li>
        <a data-attach-point="waitConfirm" onclick="waitConfirmList()">
                <span>
                    <img src="../image/waitgood.png">
                </span>待收货
        </a>
    </li>
    <li>
        <a data-attach-point="waitRate" onclick="waitRateList()">
                <span>
                    <img src="../image/waitpi.png">
                </span>待评价
        </a>
    </li>
{{?}}