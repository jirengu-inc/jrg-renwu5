var $ct = $('.content'),
    $tab= $('.tab'),
    $pre = $('.pre'),
    $next = $('.next'),
    $items=$ct.children(),
    imgWidth=$(window).width(),
    imgCount=$ct.children().size();
$ct.append($items.first().clone());
$ct.prepend($items.last().clone());
 imgRealCount=$ct.children().size();
$ct.find('li').css('width',imgWidth);
$ct.find('.cover').css('width',imgWidth);
$ct.css({
    left:0-imgWidth,
    width:imgRealCount*imgWidth
});

var curIdx = 0;
var isAnimate = false;
$next.on('click',function(e){
    e.preventDefault();
    //这个不加阻止的bug又出现了，视频中老师并没有加啊！
    playNext();
});
$pre.on('click',function(e){
    e.preventDefault();
    playPre();
});
$tab.on('click','li',function(){
   var idx = $(this).index();
    if(idx>curIdx){
        playNext(idx -curIdx);
    }else if(idx < curIdx){
        playPre(curIdx-idx);
    }
 //   curIdx = idx;  wrong
});
function autoPlay(){
    clock = setInterval(function(){
        playNext();
    },7000);
}
function playNext(idx){
    var idx = idx || 1;
    if(!isAnimate){
        isAnimate = true;
        loadImg(curIdx+2);
        $ct.animate({left:'-='+(imgWidth*idx)},function(){
            curIdx = curIdx +idx;
            if(curIdx == imgCount){
                $ct.css({left:0-imgWidth});
                curIdx =0;
            }

            isAnimate =false;
            setActive();
        });
    }
}
   function playPre(idx){
    var idx = idx || 1;
    if(!isAnimate){
        isAnimate = true;
        loadImg(curIdx);
        $ct.animate({left:'+='+(imgWidth*idx)},function(){
            curIdx = curIdx - idx;
            if(curIdx == -1){
               $ct.css({left:0-imgWidth*imgCount});
                curIdx = imgCount - 1;
            }

            isAnimate =false;
            setActive();
        });
    }
}
function setActive(){
    $tab.children().removeClass('active').eq(curIdx).addClass('active');
}

function loadImg(idx){
    var idx = idx || 0;
    var $node =$ct.children().eq(idx);
    var $img = $node.find('.cover');
     //   console.log($img);
    var imgUrl=$img.attr('data-image');
    if($node.data('isSet')){
        return;
    }
    console.log(imgUrl);
    $img.css('background-image','url('+imgUrl+')');
    $node.data('isSet',true);
}
loadImg(1);
autoPlay();
