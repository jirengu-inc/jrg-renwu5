require.config({

	baseUrl: './js',
	paths: {
		'jquery': 'lib/jquery-3.1.0.min'
	}
})

require(['jquery', 'com/goTop', 'com/fullCarousel', 'com/waterfall', 'com/addmore', 'com/exposure'],function($, goTop, Carousel, waterFall, addMore ,exposure){

	//gotop
	var goTop = new goTop($('body'))
	goTop.target.addClass('go-top')

	//carousel
	Carousel.open()
	$(window).on('resize',function(){
		Carousel.init()                      //窗口变化重新计算图片宽度 其他解决方案？todo
	})

	//waterfall
	var $ct = $('.waterfall')
	var $node = $ct.find('li')
	waterFall.init($node, $ct)

	//addmore
	$('.add').on('click',function(){
		addMore.loadData($node, $ct)
	})

	//exposure
	var $item = $('#a-list').find('li')
	$item.each(function(){
		exposure.init($(this))
	})
})