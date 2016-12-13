
//添加class
function addClass(el,cls){

    return el.className += ' '+ cls;

}
//删除class
function removeClass(el, cls){
    var reg = new RegExp( '(\\s|^)'+cls+'(\\s|$)', 'g');

    el.className =  el.className.replace(reg, "");
}
