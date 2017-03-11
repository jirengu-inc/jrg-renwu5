define(['jquery'],function($){

	var Carou = (function(){

		function Carousel($carousel){
			this.$carousel = $carousel;
			this.init();
			this.bind();
		}

		Carousel.prototype = {

			init:function(){
				this.$ct = this.$carousel.find('.img-ct');
				this.$items = this.$ct.children();
				this.$pre = $('.pre');
				this.$next = $('.next');
				this.$bullet = $('.bullet');
				this.imgHeight = $(window).height();
				this.imgWidth = $(window).width();
				this.imgCount = this.$items.size(); 

				this.$firstImg = this.$ct.find('li').first();
				this.$lastImg = this.$ct.find('li').last();

				this.$ct.append(this.$firstImg.clone());
				this.$ct.prepend(this.$lastImg.clone());

				this.imgRealCount = this.$ct.children().size();
				this.$ct.find('.item').css('width',this.imgWidth);
				this.$ct.find('.cover').css({'width':this.imgWidth,'height':this.imgHeight});

				this.$ct.css({
					left:0-this.imgWidth,
					width:this.imgWidth*this.imgRealCount
				});

				this.curIdx = 0;
				this.animate = false;
			},

			bind:function(){
				var _this = this;
				this.$next.on('click',function(e){
					e.preventDefault();
					_this.playNext();
				});

				this.$pre.on('click',function(e){
					e.preventDefault();
					_this.playPre();
				});

				this.$bullet.find('li').on('click',function(){
					var idx = $(this).index();
					if(idx > _this.curIdx){
						_this.playNext(idx - _this.curIdx);
					}
					if(idx < _this.curIdx){
						_this.playPre(_this.curIdx - idx);
					}
				});
				_this.setBg(1); 
				//_this.autoPlay();
			},


			playNext:function(idx){
				var idx = idx || 1;
				var _this = this;
				if(this.animate) return;
				this.animate = true;
				_this.setBg((this.curIdx+idx+1)); //就是移动几格就加载那张图片
				console.log(this.curIdx);
				console.log(idx);
				this.$ct.animate({left:'-=' + idx*_this.imgWidth},function(){
					_this.curIdx = (_this.curIdx+idx)%(_this.imgCount);
					if(_this.curIdx===0){
						_this.$ct.css({left:0 - _this.imgWidth});
					}
					_this.animate = false;
					_this.setBullet();
				});
			},

			playPre:function(idx){
				var idx = idx || 1;
				var _this = this;
				if(this.animate) return;
				this.animate = true;
				this.setBg(this.curIdx-idx+1); 
				console.log(this.curIdx);
				console.log(idx);
				this.$ct.animate({left:'+=' + idx*_this.imgWidth},function(){
					_this.curIdx = (_this.imgCount+_this.curIdx-idx)%(_this.imgCount);
					if(_this.curIdx===_this.imgCount-1){
						_this.$ct.css({left:0 - _this.imgCount*_this.imgWidth});
					}
					_this.animate = false;
					_this.setBullet();
				});
			},

			setBg:function(idx){
				var	_this = this;
				var	idx = idx || 0;
				this.$node = this.$ct.children().eq(idx);
				this.$cover = this.$node.find('.cover');
				this.imgUrl = this.$cover.attr('data-bg-img');

				if(_this.$node.data('isBgSet')) return; //防止重复设置图片地址
				_this.$cover.css('background-image','url(' + _this.imgUrl + ')');
				// console.log(this.$node.html());
				_this.$node.data('isBgSet',true);
			},

			setBullet:function(){
   				this.$bullet.children().removeClass('active')
   					.eq(this.curIdx).addClass('active');
   				//console.log(this.curIdx)
   			},

			autoPlay:function(){
				var _this = this;
				this.clock = setInterval(function(){
					_this.playNext();
				},3000);
			},

			stopPlay:function(){
				clearInterval(this.clock);
			},
		};

		return {
			init:function($ct){
				$ct.each(function(idx,node){
					new Carousel($(node));
				});
			}
		};

	})()

	return Carou
});