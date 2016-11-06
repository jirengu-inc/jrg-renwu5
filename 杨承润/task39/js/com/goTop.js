define(['jquery'],function($){
	function goTop($node){
		this.ct=$node;
		this.target=$('<div id="go-top">回到顶部</div>');
		this.init();
	}
	goTop.prototype={
		init:function(){
			console.log(1)
			this.createEvent();
			this.bind();
		},
		createEvent:function(){
			this.ct.append(this.target);
		},
		bind:function(){
			var _this=this;
			_this.target.on('click',function(){
				$(window).scrollTop(0);
			})
			$(window).on('scroll',function(){
				if ($(window).scrollTop()>$(window).height()) {
					_this.target.fadeIn('slow');
				}else{
					_this.target.fadeOut('slow');
				}
			})
		}
	}
	function gotop($node){
		function init(){
			var go=new goTop($node);
		}
		return {
			init:init
		}
	}
	// gotop($('body')).init();
	return gotop;
})