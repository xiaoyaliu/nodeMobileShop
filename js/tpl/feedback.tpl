 {{~ it:item}}
 <div class="feedback-item">
        <div class="user-feedback">
            <div class="fixedLabel">
               {{? item.status==="0"}} <div class="no-accept">未受理</div>
                {{?? item.status==="1"}}<div class="accept">已受理</div>{{?}}
            </div>
            <div class="feedback-title">{{=item.reason}}</div>
            <div class="feedback-content">{{=item.desc}}</div>
            {{? item.complainImg.length>0}}
            <div class="feedback-uploadImg">
                <ul>
                   {{~item.complainImg:item1}}
                    <li>
                        <img src="http://www.youde.com{{=item1}}"/>
                    </li>
                    {{~}}
                </ul>
            </div>
            {{?}}
            <div class="feedback-date">{{=item.addtime}}</div>
        </div>
        {{? item.status==="1"}}
        <div class="adm-reply">
            <div class="admInfo">
                <div class="admInfo-head">
                    <span class="admName">管理员</span>
                    <span>回复：</span>
                    <span class="replyDate">{{=item.op_time}}</span>
                </div>
                <div class="admReply">{{=item.oper_anwser}}</div>
            </div>
        </div>
        {{?}}
    </div>
    {{~}}