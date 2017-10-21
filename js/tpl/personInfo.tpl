<div class="all-con">
    <div class="person-img">
        <p class="top-gray"></p>
        <p class="per-photo"><a>头像</a><img src="{{=it.avatar}}"></p>
    </div>

    <ul class="person-ul clearfix">
        <li>
            {{?it.isUp==="y"}}
                <a class="rig-go" data-attach-point="uid">用户名</a><span>{{=it.user_name}}</span>
            {{??}}
                <a>用户名</a><span>{{=it.user_name}}</span>
            {{?}}
        </li>
        <li>
            <a class="rig-go" data-attach-point="real">姓名</a><span data-attach-point="real-name">{{=it.real_name}}</span>
        </li>
        <li data-attach-point="sx">
             {{?it.sex==="1"}}
                <a class="rig-go">性别</a><span data-id="1">男</span>
             {{??it.sex==="2"}}
                <a class="rig-go">性别</a><span data-id="2">女</span>
             {{??it.sex==="0"}}
                <a class="rig-go">性别</a><span data-id="0">保密</span>
             {{?}}
        </li>
        <li data-attach-point="bth">
           <!-- <a class="rig-go">生日</a><span>{{=it.birthday}}</span>-->
           <label for="appDate" class="rig-data-go">生日</label>
           <input value="{{=it.birthday}}" readonly="readonly" name="appDate" id="appDate" type="text">
        </li>
    </ul>
    <div class="clear"></div>



    <div class="bot-con">
        <ul class="allergy">
            <li data-attach-point="allergyli">
                <a>是否用药过敏</a>
                {{?it.anaphylactic===""}}
                    <span flag="0">否</span>
                {{??}}
                    <span flag="1">是</span>
                {{?}}
            </li>
            <li data-attach-point="historyLi">
                <a>病史/家族史</a><span class="disease" data-attach-point="disease">{{~ it.diseaseArr:item}}{{=item.zh}} {{~}}{{? it.disease_other}}{{=it.disease_other}}{{?}}</span>
            </li>
        </ul>
    </div>
     <!--保存按钮-->
    <div class="operate">
        <button type="button" class="saveBtn btn-block" data-attach-point="save">保存</button>
    </div>
</div>


