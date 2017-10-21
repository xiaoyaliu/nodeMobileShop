{{~it:item}}
    <div class="comment-list">
        <div class="comment-list-item">
            <div class="comment-item-info">
                    <span class="comment-item-author">{{=item.user_name}}</span>
                    <span class="product-item-star">
                        {{? item.comment_rank==="5" }}
                            <span class="on"></span><span class="on"></span><span class="on"></span><span class="on"></span><span class="on"></span>
                        {{?? item.comment_rank==="4" }}
                            <span class="on"></span><span class="on"></span><span class="on"></span><span class="on"></span><span class=""></span>
                        {{?? item.comment_rank==="3" }}
                            <span class="on"></span><span class="on"></span><span class="on"></span><span class=""></span><span class=""></span>
                        {{?? item.comment_rank==="2" }}
                            <span class="on"></span><span class="on"></span><span class=""></span><span class=""></span><span class=""></span>
                        {{?? item.comment_rank==="1" }}
                            <span class="on"></span><span class=""></span><span class=""></span><span class=""></span><span class=""></span>
                        {{?}}
                    </span>
                    <div class="clear"></div>
            </div>
            <div class="comment-item-content down-icon">
                <span class="content">{{=item.content}}</span>
            </div>
            <div class="comment-item-date">{{=item.time}}</div>
        </div>
    </div>
{{~}}