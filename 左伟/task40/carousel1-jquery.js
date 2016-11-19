//封装插件
$.fn.carousel=function (){
	var $this=$(this);
	console.log($this);
	var Carousel=(function(){
		var Carousel=function ($node){
			this.$pre=$node.find(".pre")	  //向上滑动按钮
			this.$next=$node.find(".next")    //向下滑动按钮
			this.$pic=$node.find(".pic-list") //图片的包裹层
			this.$list=$node.find(".list")    //轮播下面的序列条
			this.$items=this.$pic.children()

			picCount=this.$items.length
			picWidth=this.$items.width()

			this.curIdx=0
			this.isAnimate=false

			this.$pic.css({width:picWidth*picCount})
			this.init()

		}
		Carousel.prototype={
			bind:function(){
				var _this=this;
				_this.$pre.on('click',function(){
					_this.playPre();
				});
				_this.$next.on('click',function(){
					_this.playNext();
				});
				_this.$list.find("li").on("click",function(){
					var idx=$(this).index();
					if(idx>_this.curIdx){
						_this.playNext(idx-_this.curIdx);
					}
					if(idx<_this.curIdx){
						_this.playPre(_this.curIdx-idx);
					}
				})
			},
			playPre:function(idx){
				var _this=this;
				var idx=idx || 1;
				if(!_this.isAnimate){
					_this.isAnimate=true;
					_this.stopAuto();
					for(var i=0;i<idx;i++){
						_this.$pic.prepend(_this.$pic.children().last());
					}
					_this.$pic.css({left:-picWidth*idx});
					_this.$pic.animate({left:'+='+idx*picWidth},function(){
						_this.curIdx=(_this.curIdx+picCount-idx)%picCount;
						_this.setList();
						_this.isAnimate=false;
						_this.playAuto();
					});
				}
			},
			playNext:function(idx){
				var _this=this;
				var idx=idx || 1;
				if(!_this.isAnimate){
					_this.isAnimate=true;
					_this.stopAuto();
					_this.$pic.animate({left:'-='+idx*picWidth},function(){
						for(var i=0;i<idx;i++){
							_this.$pic.append(_this.$pic.children().first());
						}
						_this.$pic.css({left:0});
						_this.curIdx=(_this.curIdx+idx)%picCount;
						_this.setList();
						_this.isAnimate=false;
						_this.playAuto();
					})
				}
			},
			setList:function(){
				var _this=this;
				_this.$list.children().removeClass("active").eq(_this.curIdx).addClass("active");
			},
			playAuto:function(){
				var _this=this;
				this.clock=setInterval(function(){
					_this.playNext();
				},2000)
			},
			stopAuto:function(){
				clearInterval(this.clock);
			},
			init:function(){
				this.playAuto();
				this.bind();
			}
		}
		return Carousel;	
	}());
	new Carousel($this);
}

$('.carousel').each(function(){
	$(this).carousel();
})