define(['jquery'],function($){

	function Carousel($carousel){
		this.$carousel=$carousel;
		var $ct=this.$ct=$carousel.find('.img-ct');
		var $img=this.$img=$ct.children();
		this.imgsCount=$img.length;
		var imgWidth=this.imgWidth=$(window).width();
		this.curIdx=0;
		this.isCarousel=false;
		$ct.append($img.first().clone());
		$ct.prepend($img.last().clone());
		var realCount=this.realCount=$ct.children().length;
		$ct.find('li').css({width:imgWidth});
		$ct.find('cover').css({width:imgWidth});
		$ct.css({
			left:0-imgWidth,
			width:imgWidth*realCount
		});
		this.setBg(1);
		this.autoPlay();
	}
	Carousel.prototype.setBg=function(idx){
		var idx=idx||0,
			$node=this.$ct.children().eq(idx),
			$cover=this.$ct.find('.cover'),
			imgUrl=$cover.attr('data-img');
		if ($node.data('isBgSet')) return;
		$cover.css({'background-image':'url('+imgUrl+')'});
		$node.data('isBgSet',true)
	}
	Carousel.prototype.playNext=function(idx){
		var idx=idx||1;
		var _this=this;
		if(!_this.isCarousel){
			_this.isCarousel=true;
			_this.setBg(_this.curIdx+2);
			_this.$ct.animate({left:'-='+(idx*_this.imgWidth)},function(){
				console.log(_this.imgWidth)
				_this.curIdx+=idx;
				if(_this.curIdx===_this.imgsCount){
					_this.curIdx=0;
					_this.$ct.css({
						'left':0-_this.imgWidth,
					})
				}
				_this.isCarousel=false;
			})
		}
	}
	Carousel.prototype.autoPlay=function(){
		var _this=this;
		setInterval(function(){
			_this.playNext();
		},1000)
	}
	var carousel =(function(){
		function init($carousel){
			var carousel=new Carousel($carousel)
		}
		return{
			init:init
		}
	})();
	
	return carousel
})