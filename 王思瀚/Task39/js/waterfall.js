var $target = $('.load'),
    start = 1,
    len = 12,
    heightNum = [],
    clock;

$target.on('click',function(){

      if (clock) {
        clearTimeout(clock);
      }
        clock = setTimeout(function(){
          checkImg();
        },100);
});

checkImg();

function checkImg(){
  if (isShow($target)) {
    dosth();
  }
}

function isShow(e){
  var scrollTop = $(window).scrollTop(),
      winH = $(window).height(),
      top = e.offset().top;

  if (winH + scrollTop > 500) {
    
    return true;
  }else{
    return false;
  }
}


function dosth(){
  $.ajax({
    url:'http://platform.sina.com.cn/slide/album_tech',
    type:'get',
    dataType:'jsonp',
    jsonp:'jsoncallback',
    data:{
          app_key:'1271687855',
          num:len,
          page:start
    },
    success:function (ret){
      //status是因为这里可能出现false所以才不能用三个等号吗？一旦使用三个等号就报错
      if (ret.status.code == 0) {
        var dataArr = ret.data;
        var $nodes = renderData(dataArr);
                render($nodes);
                start++;
      }
    }
  })
}

function renderData(items){
      var tpl = '',
          $nodes;
        for (var i = 0; i < items.length; i++) {
              tpl += '<li class="item">';
              tpl += '<a href="#" class="link"><img src="'+items[i].img_url+'"></a>'
              tpl += '<h4 class="header">'+items[i].short_name+'</h4>';
              tpl += '<p class="intro">'+items[i].short_intro+'<p>';
              tpl += '</li>'
        }
        //视频里说的easyTpl的函数怎么写的。。。
        $nodes = $(tpl);//这一步是把tpl变成了什么？
        $('.ul-list').append($nodes);
        return $nodes;
}


function render($nodes){
var nodeWidth = $nodes.outerWidth(true),
//很关键的一点，这里不是用窗口的宽度除元素的宽度，而是用你自己设置的div或ul宽度
    nodeNum = parseInt($('.ul-list').width() / nodeWidth);


if (heightNum.length === 0) {
  for (var i = 0; i < nodeNum; i++) {
          heightNum.push(0);
  }
}

$nodes.each(function(){
    var $cur = $(this);

  $(this).find('img').on('load',function(){
    var idx = 0,
        minHeight = heightNum[0];

    for (var i = 0; i < heightNum.length; i++) {
        if (heightNum[i] < minHeight) {
              idx = i;
              minHeight = heightNum[i];
        }
    }

    $cur.css({
      left:idx*nodeWidth,
      top:minHeight
    });
    heightNum[idx] = heightNum[idx] + $cur.outerHeight(true);
    $('.ul-list').height(Math.max.apply(null,heightNum));
    //刷新容器高度，否则下拉之后产生的新元素会出现在左上角
  })



})
}
