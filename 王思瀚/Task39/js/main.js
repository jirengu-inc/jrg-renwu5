requirejs.config({
  baseUrl:'./js/app',
  paths:{
        'jquery':'../lib/jquery'
  }
});

require(['jquery','carousel','exposure','gotop','header','waterfall'],function($,carousel,exposure,gotop,header,waterfall){
      carousel.open();
      exposure.open();
      gotop.init();
      header.open();
      waterfall.open();
});
