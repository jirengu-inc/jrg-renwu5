require.config({

	baseUrl: './js',
	paths: {
		'jquery': 'lib/jquery-3.1.0.min'
	}
})

require(['jquery', 'com/goTop', 'com/fullCarousel'],function($, goTop, Carousel){

	//gotop
	var goTop = new goTop($('body'))
	goTop.target.addClass('go-top')

	//carousel
	Carousel.open()
})