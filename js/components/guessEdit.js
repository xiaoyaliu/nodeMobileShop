/**
 * Created by zhouxiangbo on 2017/8/28 0028.
 * description:
 */
define([
    'jquery',
    'infoChannel',
    'cookie',
    'utilTool',
    'cityjson'
], function (jquery, InfoChannel,cookie, utilTool,cityjson) {
    //请求链接
    var editUrl=configData.dataHost + '/draw.php';
    var pid=$('[data-attach-point="pid"]').val();
    var unid=$('[data-attach-point="unid"]').val();

    //select本地联动
    var pro_select = document.getElementById("province");
    var city_select = document.getElementById("city");
    var area_select = document.getElementById("area");
    //加载省份
    for(var i in province){
        var opt = document.createElement("option");
        opt.innerText = province[i].name;
        opt.setAttribute("value", province[i].id);
        pro_select.appendChild(opt);
    }
    //给省份添加change事件，选择省份，获取城市
    pro_select.onchange = function(){
        //获取省份ID
        var proid = pro_select.value;

        //先清除原来的城市数据
        city_select.innerHTML = "<option>选择市</option>";
        area_select.innerHTML = "<option>选择区</option>";

        //根据省份id获取 城市列表(遍历省份去匹配)
        for(var i in province){
            if(province[i].id == proid){
                var citys = province[i].city;
                //遍历城市列表
                for(var j in citys){
                    var opt = document.createElement("option");
                    opt.innerText = citys[j].name;
                    opt.setAttribute("value", citys[j].id);
                    city_select.appendChild(opt);
                }
            }
        }
    }
    //给城市添加change事件，选择城市，获取区县
    city_select.onchange = function(){
        //获取城市ID
        var cityid = city_select.value;
        //先清除原来的城市数据
        area_select.innerHTML = "<option>选择区</option>";
        //根据城市ID获取区县列表
        for(var i in area){
            if(area[i].pid == cityid){
                var opt = document.createElement("option");
                opt.innerText = area[i].name;
                opt.setAttribute("value", area[i].id);
                area_select.appendChild(opt);
            }
        }
    }

    //提交
    window.guessSubmit=function(){
        var addr1=$("#province").val();
        var addr2=$("#city").val()
        var addr3=$("#area").val()
        //由id遍历获取name
        for(var i in province){if(province[i].id ==addr1){addr1=province[i].name;}}
        for(var i in province){for(var j in  province[i].city){if(province[i].city[j].id==addr2){addr2=province[i].city[j].name;}}}
        for(var i in area){if(area[i].id ==addr3){addr3=area[i].name;}}
        var editMsg={}
        editMsg.name=$('[data-attach-point="name"]').val();
        editMsg.tel=$('[data-attach-point="tel"]').val();
        editMsg.delAddr=$('[data-attach-point="delAddr"]').val();
        //console.log(editMsg);
        if(editMsg.name==""||editMsg.tel==""||editMsg.delAddr=="" ){
            $('.diaInfo').text('收货信息不许为空哦');
            $(".dialog").show().fadeOut(3500);
        }else if(addr1=="选择省"||addr2=="选择市"||addr3=='选择区'){
            $('.diaInfo').text('请将地址填写完整~');
            $(".dialog").show().fadeOut(3500);
        }else if(!(/^1[34578]\d{9}$/.test(editMsg.tel))){
            $('.diaInfo').text('请输入正确手机号~');
            $(".dialog").show().fadeOut(3500);
        }else{
            $('[data-attach-point="load"]').show();
            $('#below').show();
            var pram={
                action:"addDrawInformation",
                drawId:pid,
                unionId:unid,
                userName:editMsg.name,
                mobileNum:editMsg.tel,
                province:addr1,
                city:addr2,
                district:addr3,
                address: editMsg.delAddr

            }
            console.log(pram);
            InfoChannel.getDataByAjax(editUrl,pram,function(data){
                console.log(data);
                $('[data-attach-point="load"]').hide();
                $('#below').hide();
                if(data.flag){
                    $('.diaInfo').text(data.msg);
                    $(".dialog").show().fadeOut(3500,function () {
                        window.location.href='/guessActivity';
                    });
                }else{
                    $('.diaInfo').text(data.msg);
                    $(".dialog").show().fadeOut(3500);
                }
            });
        }
    }

});