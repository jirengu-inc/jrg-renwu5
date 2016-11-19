//曝光图片组件
define(['jquery'],function($){
	function isShow($node){
		var wscrollTop=$(window).scrollTop(),
			wHeight=$(window).height(),
			$nodeTop=$node.offset().top,
			$nodeHeightHalf=$node.height()/2;
		if(($nodeTop+$nodeHeightHalf)<(wscrollTop+wHeight)){
			return true;
		}else{
			return false;
		}
	}
	function setData($swap){
		var $nodesPic=$swap.find(".about-pic");
		$(window).on("scroll",function(){
			$nodesPic.each(function(){
				if(isShow($(this))){
					var imgUrl=$(this).find("img").attr("data-src");
					$(this).find("img").attr("src",imgUrl);
					var $aText=$(this).next();
					if($aText.hasClass("about-text-l")){
						$aText.show().animate({
							left:30
						},600);
					}else{
						$aText.show().animate({
							right:30
						},600);
					}
				}
			})
		})
	}
	// setData($(".about-con"));
	return setData;
})


