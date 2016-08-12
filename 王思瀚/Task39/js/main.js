requirejs.config({
  baseUrl:'./js',
  paths:{
        'jquery':'../lib/jquery'
  }
});
//这里我将baseUrl改为./js/app，下面的依赖改为'carousel','exposure'就是直接找名字，报错：Task39/js/carousel ,no such file但是我感觉路径没有写错啊
require(['jquery','app/carousel','app/exposure','app/gotop','app/header','app/waterfall'],function($,carousel,exposure,gotop,header,waterfall){
      carousel.open();
      exposure.open();
      gotop.init();
      header.open();
      waterfall.open();
});
