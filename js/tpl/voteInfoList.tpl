{{~ it:item}}
<tr>
    <td>{{=item.order}}</td>
    <td data-attach-point="mascotName" width="20%">{{=item.mascot_name}}</td>
    <td>{{=item.num}}</td>
    <td>
        <a href='javascript:' onclick="viewUsers(this)">查看作者</a>

        {{? item.checked==1}}
                <a href='javascript:' onclick='changeStatus(this)'>已选中</a>
        {{??}}  <a href='javascript:' onclick='changeStatus(this)'>选中</a>
        {{?}}

        {{? item.checked==1}}
                <input type='hidden' value='{{=item.checked}}'/>
        {{??}}  <input type='hidden' value='{{=item.checked}}'/>
        {{?}}
    </td>
</tr>
{{~}}