define(["jquery","app/carousel","app/goTop","app/waterFall"],function ($,carousel,goTop,waterFall) {
    new GoTop($('#layout'),$('.J_GoTop'));
    new Carousel($('.carousel').eq(0))
    
    waterFall()

});