/**
 * Created by 代佳玲 on 2017/2/18.
 */

import $ from 'jquery';
//import {action}   from "./interface";
export  function ajax (url,{
    type = "get",
    data = {},
    dataType = "json",
    cache = false,
    contentType = 'application/x-www-form-urlencoded',
    success = function (result) {
        success && success(result)
    },
    error = function (result) {
        error && console.log(result.msg);
    }
    }) {
    $.ajax({
        url: url,
        type: type,
        data: data,
        dataType: dataType,
        cache: cache,
        contentType: contentType ,
        success: success,
        error: error
    })
}
function isEmpty(obj){
    if ('' === obj || 'null' === obj || null === obj || undefined === obj || "undefined" === obj) {
        return true;
    }
    return false;
}
export  function format_ms_to_string(ms) {
    var dis = '';
    if (isEmpty(ms)) {
        return '--'
    }
    var m = parseInt(ms) / 60;
    var s = parseInt(ms) - parseInt(m) * 60;
    if (!isEmpty(m) && m >= 1) {
        m = parseInt(m);
        if (m < 10) {
            m = "0" + m;
        }
        dis = m + ':';
    } else {
        dis = "00:"
    }

    if (!isEmpty(s)) {
        if (s < 10) {
            s = "0" + s;
        }
        dis += s;
    } else {
        dis += "00";
    }
    return dis;
}
export function format_size(leng) {
    var dis = '';
    if (isEmpty(leng) || leng === 0) {
        return '--'
    }
    if (leng <= 1024 * 1024) {
        dis = leng / 1024;
        dis = dis.toFixed(2) + "K";
    } else {
        dis = leng / (1024 * 1024);
        dis = dis.toFixed(2) + "M";
    }
    return dis;
}

export function isiOS() {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        return true;
    }
    return false;
}

//基于jQuery或Zepto
export function change_title(title){
    var $body = $('body');
    document.title = title;
    var $iframe = $("<iframe style='display:none;'></iframe>");
    $iframe.on('load',function() {
        setTimeout(function() {
            $iframe.off('load').remove();
        }, 0);
    }).appendTo($body);
}

//事件上报
export function resStatistics(url,action,bizId,uid){
    // $.ajax({
    //     url:url,
    //     data: {
    //         'userId':uid || null,
    //         'bizId':bizId || null,
    //         'action':action
    //     },
    //     type: 'post',
    //     dataType: 'json'});


    // var _mtac = {"performanceMonitor":1,"senseQuery":1};
    // (function() {
    //   var mta = document.createElement("script");
    //   mta.src = "http://pingjs.qq.com/h5/stats.js?v2.0.4";
    //   mta.setAttribute("name", "MTAH5");
    //   mta.setAttribute("sid", "500536105");
    //   mta.setAttribute("cid", "500536110");
    //   var s = document.getElementsByTagName("script")[0];
    //   s.parentNode.insertBefore(mta, s);
    //   console.log("--------33----",mta);
    // })();
    
    window.MtaH5.clickStat(action);
    // window.MtaH5.clickStat(action,{'bizid':bizId});
}

export function wxSetTitle(title) {
    document.title = title;
    var mobile = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(mobile)) {
        var iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden';
        // iframe.setAttribute('src', 'loading.png');
        var iframeCallback = function() {
            setTimeout(function() {
                iframe.removeEventListener('load', iframeCallback);
                document.body.removeChild(iframe);
            }, 0);
        };
        iframe.addEventListener('load', iframeCallback);
        document.body.appendChild(iframe);
    }
}
/**
 * 格式化日期
 * @param date
 */
export function  format_date(date) {

    let newDate = new Date(date),
        Y = newDate.getFullYear(),
        M = newDate.getMonth()+1,
        D = newDate.getDate();
    M = M > 9 ? M : "0" + M;
    D = D > 9 ? D : "0" + D;
    // console.log(date,newDate,Y, M, D);

    return Y + "." + M + "." + D;
 }

/**
 * 格式化价格
 * @param price
 * @returns {*}
 */
export function format_price(price) {
     return !!price ? (price/100).toFixed(2) : '0.00';
 }

 export function isEmptyObj( obj ) {
    var name;
    for ( name in obj ) {
        return false;
    }
    return true;
}
