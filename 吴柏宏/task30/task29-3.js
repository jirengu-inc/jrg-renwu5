var goTop = {
  init:function(){
    if($('#go-top').length > 0){
      return
    }

    var $goTop = $('<div id="go-top">回到顶部</div>');
    $('body').append($goTop);

    this.$goTop = $goTop;
    this.bind();
  },
  bind:function(){
    var self = this;
    $(window).on('scroll',function(){
      var offsetTop = $('body').scrollTop();

      if(offsetTop > 100){
        self.$goTop.show();
      }else{
        self.$goTop.hide();
      }
    })
    self.$goTop.on('click',function(){
      $(window).scrollTop(0);
    })
  }
}

goTop.init();
