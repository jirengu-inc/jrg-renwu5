var header = $('#header');


$(window).on('scroll',function(){
  var bodyS = $('body').scrollTop(),
      target = header.offset().top;
  if (bodyS > 500 && target > 500) {
    header.css({
      backgroundColor: 'black'
    });
  }else{
    header.css({
      backgroundColor: 'transparent'
    });
  }
});
