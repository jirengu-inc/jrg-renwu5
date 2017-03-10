define(['jquery'],function($){

	var water = (function(){

		function WaterFall($ct){
			this.$ct = $ct;
			this.init();
			this.bind();
		}

		WaterFall.prototype = {

			init:function(){
				this.curPage = 0;
				this.perPageCount = 10;

				this.checkShow();
			},

			checkShow:function(){
				var _this = this;
				if( _this.isShow($('.load')) ){
					_this.loadAndPlace();
				}
			},

			isShow:function($el){
				var _this = this
				this.scrollH = $(window).scrollTop();
				this.winH = $(window).height();
				this.offsetTop = $el.offset().top;
				this.$el = $el.height();

				if(_this.offsetTop<_this.scrollH+_this.winH && _this.scrollH<_this.offsetTop+_this.$el){
					return true;
				}else{
					return false;
				}
			},

			bind:function(){
				var _this = this;
				$('.load').on('click',function(){
					_this.loadAndPlace();
				})
			},

			loadAndPlace:function(){
				var _this = this,
					curPage = this.curPage,
					perPageCount = this.perPageCount

				$.get('/hello',{curPage:curPage,perPageCount:perPageCount})
					.done(function(ret){
						if(ret && ret.status.code === '0'){
							_this.place(ret.data);
							_this.curPage++;
						}
					}).fail(function(){
						console.log('error');
					});
			},

			renderData:function(items){ //items为获取的ret.data数据
				var tpl = '',
					$nodes;
				for(var i = 0;i<items.length;i++){
					tpl += '<li class="item">';
					tpl += '<a class="link" href="#"><img src=" ' + items[i].img_url + ' alt="" /></a>';
					tpl += '<h3 class="header">' + items[i].short_name + '</h3>';
					tpl += '<p class="desp">' + items[i].short_intro + '</p>';
					tpl += '</li>'
				}
				$nodes = $(tpl);
				this.$ct.append($nodes);
				return $nodes;
			},

			place:function(nodeList){
				var _this = this,
					$nodes = this.renderData(nodeList); //节点生成后添加到页面上

				var defereds = []; //创建存储 defered 对象的数组
				$nodes.find('img').each(function(){
					var defer = $.Deferred(); //生成Deferred对象
					$(this).load(function(){ //当每个图片加载完成后，执行 resolve
						defer.resolve();
					});
					defereds.push(defer);
				});
				$.when.apply(null,defereds).done(function(){ //当所有的图片都执行 resolve 后，即全部图片加载后，执行下面的内容
					console.log('new images all loaded...');
					//当节点里的图片全部加载后再使用瀑布流计算，否则会因为图片未加载 item 高度计算错误导致瀑布流高度计算出问题
					_this.waterFallPlace($nodes);
				})

			},

			waterFallPlace:function($nodes){
				var _this = this;
				this.nodeWidth = $('.item').outerWidth(true);
				this.picWrapWidth = $('.pic-ct').width();
				this.colNum = parseInt(this.picWrapWidth/this.nodeWidth);

				if(this.colSumHeight){ //花了好长时间，原来问题出在这里,如果没有判断的话,colSumHeight=[]会重新开始执行，第一次的10张图片会被覆盖
					console.log('我已经有值了');
				}else{
					this.colSumHeight = []; /*column列 row行*/
					for(var i=0;i<this.colNum;i++){
						_this.colSumHeight.push(0);
						
						//console.log(_this.colSumHeight);
					};
				}

				$nodes.each(function(){
					var $cur = $(this);

					_this.idx = 0;
					_this.minSumHeight = colSumHeight[0];

					for(var i=0;i<_this.colSumHeight.length;i++){
						if(_this.minSumHeight > _this.colSumHeight[i]){
							_this.minSumHeight = _this.colSumHeight[i];
							_this.idx = i;
						};
					};

					$cur.css({
						left:_this.nodeWidth*_this.idx,
						top:_this.minSumHeight
					});

					_this.colSumHeight[idx] = $cur.outerWidth(true)+_this.colSumHeight[idx];
					$('.load').height(Math.max.apply(null,_this.colSumHeight));

				});
			}
				
		};

		return WaterFall;

	})();

	return water;
});