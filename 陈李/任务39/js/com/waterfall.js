define(['jquery'],function($){

	var warterFall = (function(){

	    function render($node, $ct){
	            var ctWidth = $ct.width(),
	                colWidth = $node.outerWidth(true),
	                colNum = parseInt(ctWidth/colWidth)

	            var col = []
	            for(var i=0;i<colNum; i++){
	                col.push(0)
	            }

	            $node.each(function() {

	                var idx = 0,
	                    minHeight = col[0]
	                for(var i=0;i<colNum;i++){
	                    if(minHeight>col[i]){
	                        minHeight = col[i]
	                        idx = i
	                    }
	                }

	                $(this).css({
	                    left: colWidth*idx,
	                    top: minHeight
	                })
	                col[idx] = $(this).outerHeight(true) + col[idx]
	                $ct.height(Math.max.apply(null,col))
	            })
	    }

	    function init($node, $ct){

	        render($node, $ct)
	        $(window).on('resize',function(){
	            render($node, $ct)
	        })

	    }

	    return {
	        init: init
	    }
	})()

	return warterFall    
})