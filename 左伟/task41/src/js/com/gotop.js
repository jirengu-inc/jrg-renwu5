//回到顶部
define(['jquery'],function($){
	function goTop($ct){
		this.$ct=$ct;
		this.$target=$('<div class="go-top">Go Top</div>');
		this.create();
		this.bind();
	}
	goTop.prototype.create=function(){
		this.$ct.prepend(this.$target);
		this.$target.hide();
	}
	goTop.prototype.bind=function(){
		var _this=this;
		$(window).on("scroll",function(){
			var winScrollTop=$(window).scrollTop();
			if(winScrollTop>300){
				_this.$target.show();
			}else{
				_this.$target.hide();
			}
		});
		this.$target.on("click",function(){
			$(window).scrollTop(0);
		});
	}
	// var gotop1=new goTop($("body"));
	// gotop1.create();
	// gotop1.bind();
	return goTop;
})

