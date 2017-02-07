//瀑布流
define(['jquery'],function($){
	function waterfall($nodes){
		var colSumHeight=[],
			nodeWidth=$nodes.children().outerWidth(true),
			colNum=parseInt($nodes.width()/nodeWidth);
		for(var i=0;i<colNum;i++){
			colSumHeight.push(0);
		};
		$nodes.children().each(function(){
			var $cur=$(this);
			var idx=0;
			var minHeight=colSumHeight[0];
			for(var i=0;i<colNum;i++){
				if(minHeight>colSumHeight[i]){
					minHeight=colSumHeight[i];
					idx=i;
				}
			}
			$cur.css({
				left:nodeWidth*idx,
				top:minHeight,
				opacity:1
			});
			colSumHeight[idx]=$cur.outerHeight(true)+colSumHeight[idx];
			$nodes.height(Math.max.apply(null,colSumHeight));
		});
	}
	//waterfall($(".por-load"));
	return waterfall;
})
