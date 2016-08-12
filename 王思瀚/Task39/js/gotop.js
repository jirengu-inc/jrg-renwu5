var $top = $('<div class="top">TOP</div>');

$('body').append($top);

$(window).on('scroll',function(){
    var scrolltop = $('body').scrollTop();
//    console.log(scrolltop)
    if(scrolltop >500){
        $top.show();
    }else{
        $top.hide();
    }

 });

$top.on('click',function(){
   $(window).scrollTop(0);
});
