define(['jquery'],function($){
    var exposure = {
              init: function(){
                              this.li1 = $('#t1');
                              this.li2 = $('#t2');
                              this.li3 = $('#t3');
                              this.li4 = $('#t4');
                              this.li5 = $('#t5');
              },
              bind: function(){
                              var $cur = this;
                              $(window).on('scroll',function(){
                                    $cur.winH = $(window).height();
                                    $cur.winS = $(window).scrollTop();
                                    $cur.li1H = $cur.li1.offset().top;
                                    $cur.li2H = $cur.li2.offset().top;
                                    $cur.li3H = $cur.li3.offset().top;
                                    $cur.li4H = $cur.li4.offset().top;
                                    $cur.li5H = $cur.li5.offset().top;

                                if ($cur.winH + $cur.winS > $cur.li1H) {
                                   $cur.li1.animate({'opacity':1},1000);
                                }
                                if ($cur.winH + $cur.winS > $cur.li2H) {
                                   $cur.li2.animate({'opacity':1},1000);
                                }
                                if ($cur.winH + $cur.winS > $cur.li3H) {
                                   $cur.li3.animate({'opacity':1},1000);
                                }
                                if ($cur.winH + $cur.winS > $cur.li4H) {
                                   $cur.li4.animate({'opacity':1},1000);
                                }
                                if ($cur.winH + $cur.winS > $cur.li5H) {
                                   $cur.li5.animate({'opacity':1},1000);
                                }


                              });
              },
              open: function(){
                              this.init();
                              this.bind();
              }
    };
    return exposure;
});
