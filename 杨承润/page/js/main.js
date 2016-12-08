function Carousel(){
	var li=this.li=$('.introduce>li');
	this.init();
	this.bind();
}
Carousel.prototype.init=function(){
	this.li.eq(0).css({
		left:'0',
	})
	this.li.eq(1).css({
		left:'236px',
		width:'726px',
		height:'376px',
		'z-index':'1',
	})
	this.li.eq(2).css({
		left:'660px',
	})
}
Carousel.prototype.bind=function(){
	var left=0;
	$('.cover-l').on('click',function(){
		$('.introduce>li').css({
			'z-index':0
		})
		$('.introduce>li').each(function(){
			console.log(1)
			left=parseInt($(this).css('left'));
			switch(left){
				case 0:
					$(this).animate({
						left:'236',
						width:'726',
						height:'346',
						'z-index':'1'
					},'fast')
					break;
				case 236:
					$(this).animate({
						left:'660',
						width:'540',
						height:'307'
					},'fast')
					break;
				case 660:
					$(this).animate({
						left:'0',
					},'fast')
					break;
			}
		})
	})
	$('.cover-r').on('click',function(){
		$('.introduce>li').css({
			'z-index':0
		})
		$('.introduce>li').each(function(){
			console.log(1)
			left=parseInt($(this).css('left'));
			switch(left){
				case 0:
					$(this).animate({
						left:'660'
					},'fast')
					break;
				case 236:
					$(this).animate({
						left:'0',
						width:'540',
						height:'307'
					},'fast')
					break;
				case 660:
					$(this).animate({
						left:'236',
						width:'726',
						height:'346',
						'z-index':'1'
					},'fast')
					break;
			}
		})
	})
}
var carousel=new Carousel();
$('.login').first().css({
	'border-right':'1px solid gray'
})
$('.red').on('mouseover',function(){
	$('.mes').show();
})
$('.red').on('mouseleave',function(){
	$('.mes').hide();
})
$('.small').css({
	width:'260px'
})
$('.second-nav').on('mouseover','li',function(){
	var index=$(this).index();
	if (!index){
		$(this).css({
			transform:'translateZ(200px) translateX(80px)',
			background:'white',
			'margin-bottom':'30px'
		})
	}else if(index===1){
		$(this).css({
			transform:'translateZ(200px)',
			background:'white',
			'margin-bottom':'30px'
		})
	}else if(index===2){
		$(this).css({
			transform:'translateZ(200px) translateX(-80px)',
			background:'white',
			'margin-bottom':'30px'
		})
	}
})
$('.second-nav').on('mouseleave','li',function(){
	$(this).css({
		transform:'none',
		background:'white',
		'margin-bottom':'15px'
	})
})
var num=-1000;
setInterval(function(){
	if ($(window).scrollTop()<$('header').height()&&num<200) {
	
		console.log(1)
		num+=2;
		$('.header-cover').css({
			transform:'translateZ('+num+'px)'
		})
	}	

},1)
$(window).on('scroll',function(){
	if($(this).scrollTop()>$('header').height()){
		num=-1000;
		$('.header-cover').css({
			transform:'translateZ('+num+'px)'
		})
	}
})