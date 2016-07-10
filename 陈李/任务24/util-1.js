function addClass(el,cls){
        el.className += ' ' + cls;
}
function isValidUsername(str){
    var reg = /^\w{3,10}$/;
    return reg.test(str);
}
