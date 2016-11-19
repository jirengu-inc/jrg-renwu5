define(['jquery'],function($){
	var Exposure=(function(){
		function init($node){
			$node.css('opacity', 0)
			$(window).on('scroll',function(){
				var offsettop=$node.offset().top;
				var scrolltop=$(window).scrollTop();
				var height=$(window).height();
				if (offsettop>=scrolltop+height) {
					$node.animate({'opacity': 1}, 2500)
				}
			})
		}
		return {
			init:init
		}
	})()
	// $('.exposure>li').each(function(){
	// 	Exposure.init($(this))
	// })
	return Exposure
})