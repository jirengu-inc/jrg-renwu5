function show(){
  var clock;
  $(window).on('scroll',function(){
    if(clock){
      clearTimeout(clock);
    }
    clock = setTimeout(function(){
      checkShow();
      console.log(1);
    },300)
  })

  checkShow();
  function checkShow(){
    $('.item img').each(function(){
      var $cur = $(this);
      if($cur.attr('isLoaded')){
        return;
      }

      if(isShow($cur)){
        showImg($cur);
      }
    })
  }

  function isShow(e){
    var scrollH = $(window).scrollTop(),
        winH = $(window).height(),
        top = e.offset().top;

    if(top < winH + scrollH){
      return true;
    }else{
      return false;
    }
  }

  function showImg(e){
    e.attr('src',e.attr('data-img'));
    e.attr('isLoaded',true);
  }
}
