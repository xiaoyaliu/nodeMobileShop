/**
 * Created with youde
 * company:郑州优德
 * author:caokui
 * date:16-11-30 下午2:02
 * description:
 */
define([
    'jquery'
], function (jquery) {

//展开
    $("[data-attach-point=showBtn]").on("click",function(){
        $(this).hide();
        $("[data-attach-point=closeBtn]").show();
        $(".navBar").slideToggle(300)
    });
    //折叠
    $("[data-attach-point=closeBtn]").on("click",function(){
        $(this).hide();
        $("[data-attach-point=showBtn]").show();
        $(".navBar").slideToggle(300)
    });
    $(window).scroll(function(){
        var h = $(document).scrollTop();
        if(h>0){
            $(".header").css({
                "opacity":0.9,
                "position":"fixed"
            });
        }else{
            $(".header").css({
                "opacity":1,
                "position":"absolute"
            })
        }
    });
});