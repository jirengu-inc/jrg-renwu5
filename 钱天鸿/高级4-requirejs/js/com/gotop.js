define(['jquery'],function($){

	var go = (function(){

		function Gotop(){
			this.init();
			this.bind();
		};

		Gotop.prototype = {

			init:function(){
				this.$el = $('<div id="go-top">回到顶部</div>')
				this.$el.css({
					'position':'fixed',
					'bottom':'10px',
					'right':'10px',
					'border':'1px solid blue',
					'padding':'15px',
					'cursor':'pointer',
					'display':'none'
				})
				$('body').append(this.$el);
			},

			bind:function(){
				var _this = this;
				$(window).on('scroll',function(){
					_this.offsetTop = $('body').scrollTop();
					if(_this.offsetTop>500){
						_this.$el.fadeIn('slow');
					}else{
						_this.$el.fadeOut('slow');
					}
				});

				_this.$el.on('click',function(){
					$('body').animate({
						scrollTop:0
					},1000)                                                                                                              
				});
			}

		}

		return Gotop;

	})()

	return go;

})