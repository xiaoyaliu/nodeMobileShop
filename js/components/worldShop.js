// /**
//  * author:zhouxiangbo
//  */
// define([
//     'jquery',
//     'infoChannel',
//     'utilTool',
//     'doT',
//     'text!tpl/searchResult.tpl'
// ], function (jquery, InfoChannel, UtilTool, doT, srTpl) {
// //doT编译模版
//     var srTemp = doT.template(srTpl);
//
// //前端分页参数
//     var start = 0;//数据开始位置
//     var end = 0;//数据截至位置
//     var size = 8;//步长
//     var dataList = [];
//
// //初始化数据
//     var url = configData.dataHost + '/index.php';//设置url
//     //var url = 'http://192.168.1.174/index.php';//设置url
//     var param = {
//         action: 'getFamLast'
//     };
//     InfoChannel.getDataByAjax(url, param, function (obj) {
//         if(obj.status){
//             dataList=obj.data;
//         }
//     });
//
// //滚动加载
//     $(document).bind('scroll', onScroll);
//     function onScroll(event) {
//         //是否到底部（这里是判断离底部还有100px开始载入数据）.
//         var closeToBottom = ($(window).scrollTop() + $(window).height() > $(document).height() - 100);
//         if (closeToBottom) {
//             if (end < dataList.length) {
//                 start=end;
//                 end = start + size;
//                 var arr = dataList.slice(start, end);
//                 if (arr.length !== 0) {
//                     $('[data-attach-point=sr]').append(srTemp(arr));
//                 } else {
//                     $('[data-attach-point=none]').show();
//                 }
//             }else {
//                 $('[data-attach-point=none]').show();
//             }
//         }
//     };
//
// //
//     window.href_if=function(that){
//         window.location.href="/goods/"+that+".html";
//     }
// //设置回到顶部动效
//     UtilTool.goTop();
//
//
// })