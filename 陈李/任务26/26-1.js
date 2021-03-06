//给元素 $node 添加 class active，给元素 $node 删除 class active
$node.addClass('active');
$node.removeClass('active');

//展示元素$node, 隐藏元素$node
$node.show();
$node.hide();

//获取元素$node 的 属性: id、src、title， 修改以上属性
$node.attr({
    id: 'value1',
    src: 'value2',
    title: 'value3'
});

//给$node 添加自定义属性data-src
$node.attr('data-src', 'value');

//在$ct 内部最开头添加元素$node
$ct.prepend($node);

//在$ct 内部最末尾添加元素$node
$ct.append($node);

//删除$node
$node.remove();

//把$ct里内容清空
$ct.empty();

//在$ct 里设置 html <div class="btn"></div>
$ct.html('<div class="btn"></div>');

//获取、设置$node 的宽度、高度(分别不包括内边距、包括内边距、包括边框、包括外边距)
width();    height();
innerWidth();   innerHeight();
outerWidth();   outerHeight();
outerWidth(true);   outerHeight(true);

//获取窗口滚动条垂直滚动距离
$(document).scrollTop();

//获取$node 到根节点水平、垂直偏移距离
$node.offset();

//修改$node 的样式，字体颜色设置红色，字体大小设置14px
$node.css({
    'color': 'red',
    'font-size': '14px'
});
//遍历节点，把每个节点里面的文本内容重复一遍
$.each($node,function(index, el) {
    console.log( $(el).text() ) ;
});

//从$ct 里查找 class 为 .item的子元素
$ct.find('.item');

//获取$ct 里面的所有孩子
$ct.children();

//对于$node，向上找到 class 为’.ct’的父亲，在从该父亲找到’.panel’的孩子
$node.parents('.ct').find('.panel');

//获取选择元素的数量
$node.length();

//获取当前元素在兄弟中的排行
$node.index();
