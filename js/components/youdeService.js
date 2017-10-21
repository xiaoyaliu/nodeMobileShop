/**
 * Created with Cocos2d-x3.0 jsb.
 * company: 郑州优德
 * author:caokui
 * date: 16-1-23 上午10:07
 * summary:首页
 */
define([
    'jquery',
    'swiper'
], function (jquery,swiper) {
    $(".swiper-pagination").hide();
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        direction: 'vertical',
        onTransitionEnd: function (swiper) {
            var el = swiper.activeIndex;
            if(el>=1){
                $(".swiper-pagination").show();
            }else{
                $(".swiper-pagination").hide();
            }
        }
    });
    var swiper2 = new Swiper('.swiper-container1', {
        onTransitionStart: function (swiper) {
            $(".left").hide();
        }
    });
})