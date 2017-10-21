/**
 * Created with youde
 * company:郑州优德
 * author:caokui
 * date:16-8-26 上午9:19
 * description:
 */
define([
    'jquery',
    'infoChannel',
    'cookie',
    'doT',
    'utilTool',
    'mobiscroll01',
    'mobiscroll02',
    'mobiscroll03',
    'text!tpl/personInfo.tpl',
    'text!tpl/diseaseList.tpl'
], function (jquery, InfoChannel, cookie, doT, utilTool,mobiscroll01,mobiscroll02,mobiscroll03, personInfoTpl,diseaseTpl) {
    //返回
    $('[data-attach-point=sb]').on('click', function () {
        window.history.back();
    });
    var url = configData.dataHost + '/my.php';//设置url
    var personTpl = doT.template(personInfoTpl);//doT编译模版
    var diseaseTpl=doT.template(diseaseTpl);//doT编译模版
    var uid = $.cookie("uid");
    var params={
        action:"info",
        uid:uid
    };
    var info_upUserName={
        action:"info_upUserName",
        uid:uid
    }

    var subData={};
    InfoChannel.getDataByAjax(url, params, function(obj){
        console.log(obj);
          if(obj.seo) {
                utilTool.renderKeyWords(obj.seo);
          }
        $('[data-attach-point=mst]').html(personTpl(obj.data.userInfo));//加载模版
        $("[data-attach-point=disease-choose]").html(diseaseTpl(obj.data.disData));//加载模版
        var dis=obj.data.userInfo.disease_other;
        if(dis!==""){
        $('[data-attach-point=other-details]').val(obj.data.userInfo.disease_other);
            $("#disease-other").addClass("active");
              subData.disease_other=obj.data.userInfo.disease_other;
        }else{
              $('[data-attach-point=other-details]').hide();
        }
          subData.sex=obj.data.userInfo.sex;
          if(obj.data.userInfo.anaphylactic==""){
                subData.guomin=0
          }else{
                subData.guomin=1;
          }
          subData.anaphylactic= obj.data.userInfo.anaphylactic;
/*修改用户名*/
        $("[data-attach-point=uid]").on('click',function(){//跳转
            $('[data-attach-point=mt]').hide();
            $('[data-attach-point=ufo]').show();
        });
        $("[data-attach-point=ufogo]").on('click',function(){//返回
            $('[data-attach-point=mt]').show();
            $('[data-attach-point=ufo]').hide();
        });
        $("[data-attach-point=suid]").on('click',function(){//确定
            var name=$("[data-attach-point=uname]").val();
            if(name===""){
                $('.diaInfo').text('用户名不能为空');
                $(".dialog").show().fadeOut(2000);
                return;
            }else if(name.length<3||name.length>20){
                $('.diaInfo').text('请输入3到20个字符');
                $(".dialog").show().fadeOut(2000);
            }else{
                info_upUserName.upName=name;
                InfoChannel.getDataByAjax(url,info_upUserName,function(data){
                    console.log(data);
                    console.log(info_upUserName);
                     if(data.flag){
                         $("[data-attach-point=uid]").next().text(name);
                         $('[data-attach-point=mt]').show();
                         $('[data-attach-point=ufo]').hide();
                    }
                })
            };

        });
/*修改名字*/
        $("[data-attach-point=real]").on('click',function(){//跳转
            $('[data-attach-point=mt]').hide();
            $('[data-attach-point=nm]').show();
        });
        $("[data-attach-point=nmgo]").on('click',function(){//返回
            $('[data-attach-point=mt]').show();
            $('[data-attach-point=nm]').hide();
        });
        $("[data-attach-point=nmok]").on('click',function(){//确定
            var name=$("[data-attach-point=nmvl]").val();
            var reg=/^[\u4E00-\u9FA5]{2,4}$/;
            if(name===""){
                $('.diaInfo').text('姓名不能为空');
                $(".dialog").show().fadeOut(2000);
                return;
            }else if(!reg.test(name)){
                $('.diaInfo').text('姓名格式不正确');
                $(".dialog").show().fadeOut(2000);
                return;
            }
            $("[data-attach-point=real]").next().text(name);
            $('[data-attach-point=mt]').show();
            $('[data-attach-point=nm]').hide();
        });
/*修改姓别*/
        $("[data-attach-point=sx]").on('click',function(){
            $('#below').show();
            $('[data-attach-point=sex]').show();
        });
        //取消
        $("[data-attach-point=cl]").on('click',function(){
            $('#below').hide();
            $('[data-attach-point=sex]').hide();
        });
        //选择
        $("[data-attach-point=choose]").on('click',function(){
            var sex=$(this).attr('flag');
            var fg=$(this).find("a").text();
            $('#below').hide();
            subData.sex=sex;
            $('[data-attach-point=sex]').hide();
            $('[data-attach-point=sx]').find("span").text(fg);
            $('[data-attach-point=sx]').find("span").attr("sex",sex);

        });
/*修改生日*/
        $('[data-attach-point=bth]').on('click',function(){
            var currYear = (new Date()).getFullYear();
            var opt={};
            opt.date = {preset : 'date'};
            opt.datetime = {preset : 'datetime'};
            opt.time = {preset : 'time'};
            opt.default = {
                theme: 'android-ics light', //皮肤样式
                display: 'modal', //显示方式
                mode: 'scroller', //日期选择模式
                dateFormat: 'yyyy-mm-dd',
                lang: 'zh',
                showNow: true,
                nowText: "今天",
                startYear: currYear - 300, //开始年份
                endYear: currYear + 300 //结束年份
            };
            $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));

        });
/*是否过敏*/
        $("[data-attach-point=allergyli]").on('click',function(){
            $('[data-attach-point=mt]').hide();
            $('[data-attach-point=allergy]').show();
            var flg=$(this).find('span').attr('flag');
            if(flg==='0'){
                hideRadio();
                subData.guomin=0;
            }else{
                showRadio();
                subData.guomin=1;
                subData.anaphylactic= obj.data.userInfo.anaphylactic;
                $('[data-attach-point=txt]').children('textarea').text(obj.data.userInfo.anaphylactic)
            }


        });
       /* $("[data-attach-point=alygo]").on('click',function(){//返回
            $('[data-attach-point=mt]').show();
            $('[data-attach-point=allergy]').hide();
        });*/
        $('[data-attach-point=so]').on('click',function(){//选择
            var flag=$(this).children('input').attr('id');
            if(flag==='no'){
                hideRadio();
            }else{
                showRadio();
            }
        })
        $('[data-attach-point=alyok]').on('click',function(){//确定
            var obj=$('[data-attach-point=so]').children('input:checked') ;
            var vl=obj.val();
            var li=$('[data-attach-point=allergyli]');
            if(vl==='0'){
                li.children('span').attr('flag',vl);
                li.children('span').text('否');
                subData.guomin=0;
            }else{
                li.children('span').attr('flag',vl);
                li.children('span').text('是');
                subData.guomin=1;
                subData.anaphylactic= $('[data-attach-point=txt]').children('textarea').text();
            }
            $('[data-attach-point=mt]').show();
            $('[data-attach-point=allergy]').hide();
        });
  /*病史/家族史*/
        $('[data-attach-point=historyLi]').on("click",function(){//显示
            $('[data-attach-point=mt]').hide();
            $('[data-attach-point=history]').show();
            choiceSave();
        });
        $("[data-attach-point=hisgo]").on('click',function(){//返回
            $('[data-attach-point=mt]').show();
            $('[data-attach-point=history]').hide();
        });
        $('[data-attach-point=disease-item]').on("click",function(){//选择
            var that=$(this);
            if(that.hasClass("active")){
                that.removeClass("active");
                 if(that.attr("id")=="disease-other"){
                     $("[data-attach-point=other-details]").hide();
                       $("[data-attach-point=other-details]").val("");
                 }
            }else{
                that.addClass("active");
                if(that.attr("id")=="disease-other"){
                    $("[data-attach-point=other-details]").show();
                }
            }
            choiceSave();
        });
          $("[data-attach-point=his-sure]").on("click",function(){
                $('[data-attach-point=mt]').show();
                $('[data-attach-point=history]').hide();
                var zhi=" ";
                $("[name=disease].active").each(function(){
                      zhi=zhi+$(this).html()+" ";
                });
                if($("#disease-other").hasClass("active")&&$("[data-attach-point=other-details]").val()!=""){
                      zhi=zhi+$("[data-attach-point=other-details]").val();
                }else{
                      $("#disease-other").removeClass("active");
                }
                $("[data-attach-point=disease]").html(zhi)
          })
        $("[data-attach-point=save]").on("click",function() {
              subData.real_name = $.trim($("[data-attach-point=real-name]").html());
              var strs = new Array(); //定义一数组
              strs = $("#appDate").val().split("-"); //字符分割
              subData.birthdayYear = strs[0];
              subData.birthdayMonth = strs[1];
              subData.birthdayDay = strs[2];
              subData.disease = [];
              if ($("#disease-other").hasClass("active")) {
              subData.disease_other = $('[data-attach-point=other-details]').val();
              }else{
                    subData.disease_other="";
              }
            if($('[name=disease].active').length>0){
                $('[name=disease].active').each(function(){
                    subData.disease.push($(this).attr("data-id"));
                });
            };
            subData.action="upinfo";
              subData.uid=uid;
            InfoChannel.getDataByAjax(url,subData,function(data){
                  if(data.flag){
                       window.location.href="/user";
                  }
            })
        })
    });


    function hideRadio(){
        $("#no").attr("checked",true);
        $("#yes").removeAttr('checked');
        $("[data-attach-point=txt]").hide();
    };
    function showRadio(){
        $("#no").removeAttr('checked');
        $("#yes").attr("checked",true);
        $("[data-attach-point=txt]").show();
    };
    function choiceSave(){
        if($('[data-attach-point=disease-choose] a.active').length>0){
            $("[data-attach-point=his-sure]").removeClass("gray-fon");
        }else{
            $("[data-attach-point=his-sure]").addClass("gray-fon");
        }
    }
});