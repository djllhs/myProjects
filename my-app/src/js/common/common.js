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
    $.ajax({
        url:url,
        data: {
            'userId':uid || null,
            'bizId':bizId || null,
            'action':action
        },
        type: 'post',
        dataType: 'json'});
}