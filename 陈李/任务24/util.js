// 判断el是否为一个数组，返回一个bool值
function isArray (el) {
    return typeof el === 'object' && el instanceof Array;
}

//判断el是否为一个json，返回一个bool值
function isJson(el){
    return typeof el === 'object' && el.toString() === '[object Object]';
}

// 使用递归来实现一个深拷贝
// 拷贝对象以及内部嵌套的值可以是字符串、数字、布尔、数组、json对象中的任意项。不会包含函数、正则对象等
function cloneObject(obj){
    var newObj;

    //数字、布尔值、字符串
    if(typeof obj === "number" || typeof obj === "boolean" || typeof obj === "string"){
        newObj = obj;
    }

    //数组


    //json

}

//判断el是否拥有classname
function hasClass(el,cls){
    var str = el.className;
    var reg = new RegExp('\\b'+cls+'\\b');
    return reg.test(str);
}

//增加el的classname
function addClass(el,cls){
    var str = el.className;
    if(!hasClass(el,cls)){
        str += ' ' + cls;
    }
}

//删除el的classname
function removeClass(el,cls){
    var str = el.className;
    var reg = new RegExp('\\b'+cls+'\\b');
    return str.relace(reg,'');
}

//去除字符串两边空白字符
function trim(str){
    return str.replace(/^\s*|\s*$/g,'');
}

//简单的用户名判断：长度6-20个字符，只能包括字母、数字、下划线
function isValidUsername(str){
    var reg = /^\w{6,20}$/;
    return reg.test(str);
}

//简单的密码判断：长度6-20个字符，包括大写字母、小写字母、数字、下划线至少两种
function isValidPassword(str){
    if(str.length<6||str.length>20){
        return false;
    }
    if(/(^[a-z]+$)|(^[A-Z]+$)|(^_+$)|(^\d+$)/g.test(str)){
        return false;
    }
    return true;
}

/*简单的ajax封装，
 *    ajax({
 *         url: '',                //接口地址
 *         type: '',               // 类型， post 或者 get,
 *        data: {
 *                                 //提交数据
 *        },
 *        success: function(ret){
 *                                  //数据处理函数
 *        },
 *        error: function(){
 *                                  //报错函数
 *        }
 *     });
 */
function ajax(opts){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var ret = JSON.parse(xmlhttp.responseText);
            opts.success(ret);
        }
        if(xmlhttp.status == 404){
            opts.error();
        }
    };

    // 需要发送的信息转换成字符串
    var dataStr = '';
    for(var key in opts.data){
        dataStr += key + '=' + opts.data[key] + '&';
    }
    dataStr = dataStr.substr(0,dataStr.length-1);

    if(opts.type.toLowerCase() == 'post'){
        xmlhttp.open(opts.type,opts.url,true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(dataStr);
    }
    if(opts.type.toLowerCase() == 'get'){
        xmlhttp.open(opts.type,opts.url+'?'+dataStr,true);
        xmlhttp.send();
    }

}
