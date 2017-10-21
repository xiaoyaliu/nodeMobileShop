{{~ it:item}}
<a {{? item.chk===1}}class="active"{{?}} data-id="{{=item.code}}" data-attach-point="disease-item" name="disease">{{=item.name}}</a>
{{~}}
<a  data-attach-point="disease-item" id="disease-other">其他</a>