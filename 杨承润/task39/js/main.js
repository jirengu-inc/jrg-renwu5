require.config({
	baseUrl: './js',
	paths: {
		'jquery': 'lib/jquery-3.1.0.min'
	}
})
require(['jquery','com/goTop','com/carousel','com/exposure','com/waterfall','com/addmore'],function($,gotop,carousel,Exposure,waterFall,addMore){
	//gotop
	gotop($('body')).init();

	//carousel
	carousel.init($('#carousel'))

	//exposure
	$('.exposure>li').each(function(){
		Exposure.init($(this))
	})

	//waterfall
	waterFall.init($('.por-nav'))

	//addmore
	$('.add').on('click',function(e){
		e.preventDefault();
		addMore.loadData($('.waterfall'))
	})
})