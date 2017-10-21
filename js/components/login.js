/**
 * Created with youde
 * company:郑州优德
 * author:caokui
 * date:16-5-27 下午1:20
 * description:登录
 */
define([
    'jquery',
    'utilTool',
    'cookie',
    'infoChannel'
], function (jquery,UtilTool,cookie,InfoChannel) {
    var url = configData.dataHost + '/user.php';//设置url
//返回
    $('[data-attach-point=gb]').on('click', function () {
        window.history.back();
    });
//登录按钮
    $('[data-attach-point=lg]').on('click',function(){
    //验证名与密码是否为空
        var un=$('[data-attach-point=un]').val();
        var pw=$('[data-attach-point=pw]').val();
        if(un.length===0||pw.length===0){
            $('[data-attach-point=err]').text('请输入用户名和密码');
            return false;
        };
    //获取是否免登录
        var tempFlag=null;
        var el=$('[data-attach-point=sc]');
        if(el.is(':checked')){//选中
            tempFlag=1;
        }else{
            tempFlag=0;
        }
    //提交登录
        var param={
            'action':'login',
            'userName':un,
            'passWord':pw,
            'remember':tempFlag
        };
        if($.cookie("loginFrom")==="/orderSure"){
            param.from="order";
        }
        InfoChannel.getDataByAjax(url, param,function(data){
            if(data.flag){
                $.cookie("uid", data.user_id, {path: '/' });
                $.cookie("uname", data.userName, {path: '/' });
                $.cookie("cartnum", data.cartNum, {path: '/' });
                if($.cookie("loginFrom")){
                    window.location.href=$.cookie("loginFrom");
                    $.cookie("loginFrom", '', {expires:-1,path: '/' });

                }else{
                    window.location.href="/";
                }
                //window.location.href='/user';//跳转到个人中心

            }else{
                $('[data-attach-point=err]').text(data.msg);
            }
        });
    });
//用户框与密码框获得焦点
    $('[data-attach-point=un]').on('focus',function(){
        $('[data-attach-point=err]').text('');
    });
    $('[data-attach-point=pw]').on('focus',function(){
        $('[data-attach-point=err]').text('');
    });
//设置密码框的显示与隐藏
    $('[data-attach-point=on]').on('click',function(){//显示
        $(this).hide();
        $('[data-attach-point=off]').show();
        $('[data-attach-point=pw]').attr('type','password');
    });
    $('[data-attach-point=off]').on('click',function(){//隐藏
        $(this).hide();
        $('[data-attach-point=on]').show();
        $('[data-attach-point=pw]').attr('type','text');
    });




    //************************加载优化配置文件***************************************************
    //require(['libConfig']);
})