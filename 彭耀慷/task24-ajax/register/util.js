//为el增加一个样式名为cls的新样式
function addClass(el, cls) {
    if (!hasClass(el, cls)) {
        el.className += " " + cls;
    }
}

//移除el中的样式cls
function removeClass(el, cls) {
    var reg = new RegExp('\\b' + cls + '\\b', 'g'),
        tmp = el.className.replace(reg, '').replace(/\s{2,}/g, ' ');
    el.className = trim(tmp);
}

//判断el中是否拥有cls样式
function hasClass(el, cls) {
    var reg = new RegExp('\\b' + cls + '\\b', 'g');
    return reg.test(el.className);
}

//去除字符串两边空白字符
function trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
}

//简单的用户名判断：长度3-10个字符，只能包括字母、数字、下划线
function isValidUsername(str){
    var reg = /^\w{3,10}$/;
    return reg.test(str);
}

//简单的密码判断：长度6-15个字符，包括大写字母、小写字母、数字、下划线至少两种
function isValidPassword(str){
    if(str.length<6||str.length>15){
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

