<div class="cate_third_pro"> <img src="image/topcate.jpg"> </div>
<div class="sp_container"style="display: block">
    <ul class="right_ul">
    {{~ it.info_right.categorylist:item}}
        <li> <a href="/classify/{{=item.cat_id}}"><img src="{{=item.images}}" ><span>{{=item.cat_name}}</span></a></li>
    {{~}}
    </ul>
</div>