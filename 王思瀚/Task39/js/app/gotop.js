define(['jquery'],function($){
    var gotop = {
      init: function(){
              this.create();
              this.bind();
            },

      create: function(){
              this.top = $('<div class="top">TOP</div>');
              $('body').append(this.top);
      },

      bind:function(){
              var $cur = this;
              $(window).on('scroll',function(){
                  var scrolltop = $('body').scrollTop();

                  if(scrolltop >500){
                      $cur.top.show();
                  }else{
                      $cur.top.hide();
                  }

               });

              $cur.top.on('click',function(){
                 $(window).scrollTop(0);
              });
      }

    };
    return gotop;
});
