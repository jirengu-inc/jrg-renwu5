$.fn.carousel = function(){
  this.each(function(elem,index){

    var _this = $(this);
    var bullet = _this.parent().find('.bullet');
    var bulletItems = bullet.children();
    cloneChild();
    var items = _this.children();
    var count = items.size;
    var itemWidth = _this.parent().width();
    setImg();
    var isAnimate = false;
    var current = 0;
    var clock;

    bind();
    autoPlay();

    function cloneChild(){
      var $cur = _this.children();
      _this.append($cur.first().clone());
      _this.prepend($cur.last().clone());
    }

    function setImg(){
      _this.css({
            width: count * itemWidth,
            left: 0 - itemWidth
      });
      items.css({
            width: itemWidth
      });
    }

    function playNext(){
      play(parseInt((current+1)%count));
    }

    function playPre(){
      play(parseInt(current-1+count)%count);
    }

    function autoPlay(){
      clock = setInterval(function(){
        playNext();
      },2000);
    }

    function stopPlay(){
      clock && clearInterval(clock);
    }

    function setBullet(index){
      bulletItems.removeClass('active').eq(index).addClass('active');
    }

    function bind(){
      bullet.on('click',function(e){
        stopPlay();
        var index = $(this).index();
        play(index+1);

        setTimeout(function(){
          autoPlay();
        },1000);
      });
    }
    function play(index){
      if (isAnimate) return ;
              isAnimate = true;
              _this.animate({left:-itemWidth*index},500,function(){
                  if (index == 0) {
                      _this.css('left',-itemWidth*(count-1));
                      index = count-1;
                  } else if (index == count-1) {
                      _this.css('left',-itemWidth);
                      index = 1 ;
                  }
                  setBullet(index-1);
                  current = index;
                  isAnimate = false;
              });
    }


  });
};
