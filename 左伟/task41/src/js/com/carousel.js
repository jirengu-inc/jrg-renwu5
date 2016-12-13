//轮播组件：改变dom的方法；
define(['jquery'],function($){
	
	var Carousel=function($node){
		var $pic=$node.find(".hd-pic-list"),
			$list=$node.find(".hd-list"),
			$items=$pic.children(),
			picCount=$items.length,//加载前的图片数量
			picWidth=$(window).width(); //图片为全屏，
		var $pre=$node.find(".hd-pre"),
		    $next=$node.find(".hd-next");
		var isAnimate=false; //检验动画的锁，false表示可以执行其他操作，true表示打开锁，禁止其他操作；
		var curIdx=0; 
		$pic.append($items.first().clone());
		$pic.prepend($items.last().clone());
		var realLen=$pic.children().length;
		$pic.find("li").css({width:picWidth});
		$pic.find("li>div").css({width:picWidth});
		$pic.css({left:-picWidth,width:picWidth*realLen});
		$list.find("li").on("click",function(){
			var idx=$(this).index();
			if(curIdx>idx){
				playPre(curIdx-idx);
			}
			if(curIdx<idx){
				playNext(idx-curIdx);
			}
		});
		$pre.on("click",function(){
			playPre();
		});
		var clock;
		$next.on("click",function(){
			playNext();
		});
		setBg(1);
		playAuto();
		function playPre(idx){
			var idx=idx || 1;
			if(!isAnimate){
				isAnimate=true;
				stopAuto();
				setBg(curIdx);
				$pic.animate({left:"+="+picWidth*idx},function(){
					curIdx=(picCount+curIdx-idx)%picCount;
					if(curIdx===(picCount-1)){
						setBg(picCount);
						$pic.css({left:-picWidth*picCount});
					}
					setList();
					isAnimate=false;
					playAuto();
				});
			}
		}
		function playNext(idx){
			var idx=idx || 1;
			if(!isAnimate){
				isAnimate=true;
				stopAuto();
				setBg(curIdx+2);
				$pic.animate({left:"-="+picWidth*idx},function(){
					curIdx=(curIdx+idx)%picCount;
					if(curIdx===0){
						$pic.css({left:-picWidth});
					}
					setList();
					isAnimate=false;
					playAuto();
				});
			}
		}
		
		function setList(){
			$list.children().removeClass("hd-active").eq(curIdx).addClass("hd-active");	
		}
		function playAuto(){
			clock=setInterval(function(){
				playNext();
			},1500);
		}
		function stopAuto(){
			clearInterval(clock);
		}
		function setBg(idx){
			var idx=idx || 0;
			var $node=$pic.children().eq(idx);
			var $pic_div=$node.find("div");
			var picurl=$pic_div.attr("data-bg");
			if($node.data('isBgset')) return;
			$pic_div.css('background-image','url('+picurl+')');
			$node.data('isBgset',true);
		}
	}
	// Carousel($("#header"));
	return Carousel;
})
