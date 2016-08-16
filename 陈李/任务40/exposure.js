var Exposure = (function(){

	return {

		init: function($target){
			return $target.offset().top< $(window).height()+ $(window).scrollTop()
		},

		bind: function($target, callback){
			var _this = this
			$(window).on('scroll', function(){
				if(_this.init($target)){
					callback.call($target)
				}
			})
		},

		one: function($target, callback){
			var _this = this
			$(window).on('scroll', function(){
				if(_this.init($target) && !$target.data('flag')){
					callback.call($target)
					$target.data('flag', true)
				}
			})
		}
	}

})()
