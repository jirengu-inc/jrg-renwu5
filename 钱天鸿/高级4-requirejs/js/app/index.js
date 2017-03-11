
define(['jquery','com/carousel','com/waterfall_ajax','com/gotop'],function($,carousel,waterfall,gotop){
	carousel.init($('.carousel'));
	new waterfall($('.pic-ct'));
	new gotop();
})