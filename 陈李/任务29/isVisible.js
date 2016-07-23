function isVisible($node){
    var height = $node.offset().top,
        scrollTop = $(window).scrollTop(),
        windowHeight = $(window).height();

    if( height <= scrollTop+windowHeight ){
        return true;
    }
    else {
        return false;
    }
}


$(window).on('scroll',function(){
    if( isVisible($node) ){
        console.log(true);
    }
});


$(window).on('scroll',function(){
    if( isVisible($node) && !$node.data('data-times')){
        console.log(true);
        $node.data('data-times',true);
    }
});
