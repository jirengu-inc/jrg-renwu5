define(['jquery'],function($){

	var exposure = (function(){

		function init($node){

			$node.css('opacity', 0)
			$(window).on('scroll',function(){
				var offsetHeight = $node.offset().top
				var height = $(window).height()
				var scrollHeight = $(window).scrollTop()
				
				if(offsetHeight< height+ scrollHeight){
					$node.animate({'opacity': 1}, 1500)
				}				
			})

		}

		return {
			init: init
		}
	})()

	return exposure
})