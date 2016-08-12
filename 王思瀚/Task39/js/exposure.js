var li1 = $('#t1'),
    li2 = $('#t2'),
    li3 = $('#t3'),
    li4 = $('#t4'),
    li5 = $('#t5');

 $(window).on('scroll',function(){
   var winH = $(window).height(),
       winS = $(window).scrollTop(),
       li1H = li1.offset().top,
       li2H = li2.offset().top,
       li3H = li3.offset().top,
       li4H = li4.offset().top,
       li5H = li5.offset().top;

   if (winH + winS > li1H) {
      li1.animate({'opacity':1},1000);
   }
   if (winH + winS > li2H) {
      li2.animate({'opacity':1},1000);
   }
   if (winH + winS > li3H) {
      li3.animate({'opacity':1},1000);
   }
   if (winH + winS > li4H) {
      li4.animate({'opacity':1},1000);
   }
   if (winH + winS > li5H) {
      li5.animate({'opacity':1},1000);
   }


 });
