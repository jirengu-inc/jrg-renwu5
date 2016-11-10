define(['jquery'],function($){
	
	var waterFall=(function(){
		function render($ct){
			var ulWid=$ct.width();
			var $porLi=$ct.find('li');
			var liWid=$porLi.outerWidth(true);
			var colNum=parseInt(ulWid/liWid);
			var heightSum=[];
			for(var i=0;i<colNum;i++){
				heightSum.push(0)
			}
			$porLi.each(function(){
				var idx=0,
					minHeight=heightSum[0],
					curH=$(this).outerHeight(true);
				console.log(minHeight)
				for(var i=0;i<colNum;i++){
					if(minHeight>heightSum[i]){
						minHeight=heightSum[i];
						idx=i;
					}
				}
				$(this).css({
					left:liWid*idx,
					top:minHeight
				})
				heightSum[idx] += curH;
				$ct.height(Math.max.apply(null,heightSum))
			})
		}
		function init($ct){
			render($ct)
			$(window).on('resize',function(){
			    render($ct)
			})
		}
		return{
			init:init
		}
	})()
	// waterFall.init($('.por-nav'))
	return waterFall
})