<div data-attach-point="point">
      <div class="total-score">
            <p>您的总积分<em>{{=it.list.info.totalPoints}}</em>当前积分<em>{{=it.usePoints}}</em></p>
      </div>
      <p class="gray-bom"></p>

      <ul class="score-ul">
            <li class="active"  data-attach-point="all"><a>全部</a></li>
            <li data-attach-point="goadd"><a>收入</a></li>
            <li data-attach-point="gore"><a>支出</a></li>
      </ul>
      <p class="bott-gray"></p>
      <div class="gray-con">
            <ul class="score-Info" data-attach-point="pointlist">
            {{~ it.list.pointlist:item}}
                  <li {{? item.p_status==="ad"}}data-attach-point="add"{{??}}data-attach-point="re"{{?}}>
                        <p>
                              <span class="score-come lef">{{=item.title}}</span>
                              <span class="sco-date rig">{{=item.addtime}}</span>
                        </p>
                        <p>
                              <span class="ord_id lef">订单编号：<i>2016071283984</i></span>
                              <span class="rig">{{=item.points}}</span>
                        </p>
                        <p></p>
                  </li>
                  {{~}}
            </ul>
      </div>
</div>
