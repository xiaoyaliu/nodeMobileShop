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
], function (jquery,UtilTool,InfoChannel) {
    var url = configData.dataHost + '/user.php';//设置url
    var emkey=$.cookie("emkey");
    var emparam={
        action: 'checkUrl_retrieve',
        key:emkey
    };
    InfoChannel.getDataByAjax(url, emparam, function (data){
        if(data.flag){
            if (data.seo) {
                UtilTool.renderKeyWords(data.seo);
            }
            $('[data-attach-point=th]').show();
            $('[data-attach-point=thn]').hide();
        }else{
            $('[data-attach-point=th]').hide();
            $('[data-attach-point=thn]').show();
        }
    });
//第三步设置密码-邮箱
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
            key:emkey,
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