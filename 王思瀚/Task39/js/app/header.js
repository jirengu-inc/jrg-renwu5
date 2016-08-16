define(['jquery'],function($){
      var header = {
            init: function(){
                  this.header = $('#header');
            },
            bind: function(){
              var $cur = this;
              $(window).on('scroll',function(){
                $cur.bodyS = $('body').scrollTop();
                $cur.target = $cur.header.offset().top;
                if ($cur.bodyS > 500 && $cur.target > 500) {
                  $cur.header.css({
                    backgroundColor: 'black'
                  });
                }else{
                  $cur.header.css({
                    backgroundColor: 'transparent'
                  });
                }
              });
            },
            open: function(){
                  this.init();
                  this.bind();
            }
      };
      return header;
});
