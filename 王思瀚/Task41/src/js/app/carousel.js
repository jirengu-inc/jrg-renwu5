define(['jquery'],function($){
    var carousel ={
        init: function(){
                      this.$ct = $('.content');

                      this.$tab= $('.tab');
                      this.$pre = $('.pre');
                      this.$next = $('.next');
                      this.$items=$('.content').children();
                      this.imgWidth=$(window).width();
                      this.imgCount=this.$items.size();
                      this.$ct.append(this.$items.first().clone());
                      this.$ct.prepend(this.$items.last().clone());
                      //这块如果用imgRealCount=$ct.children().size();这个写法就会最后一张图片白屏
                      this.imgRealCount=this.imgCount + 2;
                      this.$ct.find('li').css('width',this.imgWidth);
                      this.$ct.find('.cover').css('width',this.imgWidth);
                      this.$ct.css({
                          left:0-this.imgWidth,
                          width:this.imgRealCount*this.imgWidth
                      });

                      this.curIdx = 0;
                      this.isAnimate = false;
        },


        bind: function(){
                      var $cur = this;
                      $cur.$next.on('click',function(e){
                          e.preventDefault();
                          //这个不加阻止的bug又出现了，视频中老师并没有加啊！
                          $cur.playNext();
                      });
                      $cur.$pre.on('click',function(e){
                          e.preventDefault();
                          $cur.playPre();
                      });
                      $cur.$tab.on('click','li',function(){
                         var idx = $(this).index();
                          if(idx>$cur.curIdx){
                              $cur.playNext(idx -$cur.curIdx);
                          }else if(idx < $cur.curIdx){
                              playPre($cur.curIdx-idx);
                          }
                       //   curIdx = idx;  wrong
                      });
        },

       playNext: function(idx){
                     var $cur = this;
                     var idx = idx || 1;
                     if(!$cur.isAnimate){
                         $cur.isAnimate = true;
                         $cur.loadImg($cur.curIdx+2);
                         $cur.$ct.animate({left:'-='+($cur.imgWidth*idx)},function(){
                             $cur.curIdx = $cur.curIdx +idx;
                             if($cur.curIdx == $cur.imgCount){
                                $cur. $ct.css({left:0-$cur.imgWidth});
                                 $cur.curIdx =0;
                             }

                             $cur.isAnimate =false;
                             $cur.setActive();
                         });
                     }
       },

       playPre:function(idx){
                     var $cur = this;
                     var idx = idx || 1;
                          if(!$cur.isAnimate){
                              $cur.isAnimate = true;
                              $cur.loadImg($cur.curIdx);
                              $cur.$ct.animate({left:'+='+($cur.imgWidth*idx)},function(){
                                  $cur.curIdx = $cur.curIdx - idx;
                                  if($cur.curIdx == -1){
                                     $cur.$ct.css({left:0-$cur.imgWidth*$cur.imgCount});
                                      $cur.curIdx = $cur.imgCount - 1;
                                  }

                                  $cur.isAnimate =false;
                                  $cur.setActive();
                              });
                          }
       },

       autoPlay: function(){
                     var $cur = this;
                     $cur.clock = setInterval(function(){
                         $cur.playNext();
                     },7000);
       },

       setActive: function(){
                    var $cur = this;
                     $cur.$tab.children().removeClass('active').eq($cur.curIdx).addClass('active');
       },

       loadImg: function(idx){
                   var $cur = this;
                   var idx = idx || 0;
                   $cur.$node =$cur.$ct.children().eq(idx);
                   $cur.$img = $cur.$node.find('.cover');
                    //   console.log($img);
                   $cur.imgUrl=$cur.$img.attr('data-image');
                   if($cur.$node.data('isSet')){
                       return;
                   }

                   $cur.$img.css('background-image','url('+$cur.imgUrl+')');
                   $cur.$node.data('isSet',true);
       },
       open: function(){
         this.init();
         this.bind();
         this.loadImg(1);
         this.autoPlay();
       }

    };
    return carousel;
});
