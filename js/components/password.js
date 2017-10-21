/**
 * Created with youde
 * company:郑州优德
 * author:caokui
 * date:16-5-27 下午1:20
 * description:找回密码手机端
 */
define([
    'jquery',
    'utilTool',
    'infoChannel'
], function (jquery, UtilTool,InfoChannel) {
    var url = configData.dataHost + '/user.php';//设置url
    var moKey=null;
//返回
    $('[data-attach-point=gb]').on('click', function () {
        window.history.back();
    });
//检测账户
    var $accErr=$('[data-attach-point=accErr]');
    $('[data-attach-point=acc]').on('focus',function(){
        $accErr.text("");
    });
//第一步
    $('[data-attach-point=acf]').on('click', function (){
        var name=$('[data-attach-point=acc]').val();
        var param={
            action:'checkUserName_retrieve',
            user_name:name
        };
        InfoChannel.getDataByAjax(url, param,function(data){
            moKey=data.key;
            if(data.flag){
                $('[data-attach-point=one]').hide();
                if(data.type==='m'){
                    $('[data-attach-point=mb]').text(data.mobile);
                    $('[data-attach-point=twoM]').show();
                }else if(data.type==='e'){
                    $('[data-attach-point=em]').text(data.email);
                    $('[data-attach-point=twoE]').show();
                }else if(data.type==='n'){
                    $accErr.text("您的账号不能找回密码，请联系客服。");
                }
            }else{
                $accErr.text(data.msg);
            }
        });

    });

//第二步-手机
    $('[data-attach-point=code]').on('focus',function(){
        $('[data-attach-point=ms]').text('');
    });
    //获取验证码
    $('[data-attach-point=get]').on('click',function () {
        var self = this;
        var vl = moKey;
        var param = {
            action: 'sendCode_retrieve',
            mobile: vl
        };
        InfoChannel.getDataByAjax(url, param, function (data) {
            var ms = $('[data-attach-point=ms]');
            ms.text('');
            if (data.flag) {//设置倒计时
                countDown(self);
            }
            ms.text(data.msg);

        });
    });
    //倒计时
    function countDown(self) {
        var clock = '';
        var nums = 60;
        $(self).attr("disabled", 'disabled');//将按钮置为不可点击
        $(self).text(nums + '秒后可重新获取');
        $(self).addClass('gray-but');
        clock = setInterval(doLoop, 1000); //一秒执行一次
        function doLoop() {
            nums--;
            if (nums > 0) {
                $(self).text(nums + '秒后可重新获取');
            } else {
                clearInterval(clock); //清除js定时器
                $(self).removeAttr("disabled");
                $(self).text('获取验证码');
                $(self).removeClass('gray-but');
                nums = 60; //重置时间
            }
        }
    };
    //下一步
    $('[data-attach-point=mxt]').on('click',function (){
        var code=$('[data-attach-point=code]').val();
        if(code===''){
            $('[data-attach-point=ms]').text('验证码不能为空');
        }else{
            var param = {
                action: 'checkCode_retrieve',
                rcode: code,
                key:moKey
            };
            InfoChannel.getDataByAjax(url, param, function (data){
               if(data.flag){
                    $('[data-attach-point=twoM]').hide();
                    $('[data-attach-point=th]').show();
               }else{
                   $('[data-attach-point=ms]').text(data.msg);
               }
            });
        }
    });

//第二步-邮箱
$('[data-attach-point=sem]').on('click',function(){
    var param = {
        action: 'sendEmail_retrieve',
        Email: moKey
    };
    InfoChannel.getDataByAjax(url, param, function (data){
        if(data.flag){
            $('[data-attach-point=pa]').hide();
            $('[data-attach-point=su]').show();
            $('[data-attach-point=sul]').attr('href',data.loginUrl);
        }else{
            $('[data-attach-point=err]').show();
        }
    });
});
//第三步设置密码-手机
    var regu ='(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{5,20}';
    var  re= new RegExp(regu);
    $('[data-attach-point=mset]').on('click',function(){
        var fpw=$('[data-attach-point=pwf]').val();
        var spw=$('[data-attach-point=pws]').val();
        if(fpw===''||spw===""){
            $('[data-attach-point=err]').text('密码不能为空');
            return false;
        };
        if(!re.test(fpw)){
            $('[data-attach-point=err]').text('密码应为6-20位字母或数字组合');
            return false;
        };
        if(!re.test(spw)){
            $('[data-attach-point=err]').text('密码应为6-20位字母或数字组合');
            return false;
        };
        if(fpw!==spw){
            $('[data-attach-point=err]').text('两次密码不一致，请重新输入');
            return false;
        };
        var param={
            action:'setPwd_retrieve',
            key:moKey,
            pwd:fpw,
            pwdagain:spw
        };
        InfoChannel.getDataByAjax(url, param, function (data) {
            $('[data-attach-point=th]').hide();
            if(data.flag){
                $('[data-attach-point=fs]').show();
            }else{
                $('[data-attach-point=fe]').show();
            }
        })
    });
    $('[data-attach-point=pwf]').on('focus',function(){
        $('[data-attach-point=err]').text('');
    });
    $('[data-attach-point=pws]').on('focus',function(){
        $('[data-attach-point=err]').text('');
    });

    //************************加载优化配置文件***************************************************
    //require(['libConfig']);
})