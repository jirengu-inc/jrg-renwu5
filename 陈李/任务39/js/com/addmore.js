define(['jquery', 'com/waterfall'],function($, waterFall){

	var addMore = (function(){
	    var length = 5

	    function loadData($node, $ct){
	        $.ajax({
	            url: '/load',
	            type: 'get',
	            data: {
	                num: length
	            }
	        })
	        .done(function(ret) {
	        	console.log(ret)
	            handle(ret, $node, $ct)
	        })
	        .fail(function() {
	            console.log("error")
	        })
	    }

	    function handle(data, $node, $ct){
	        var tmpl = ''
	        $.each(data.msg,function(k, v){
	            tmpl += '<li class=" '+v+' "></li>'
	        })
	        $ct.append($(tmpl))
	        waterFall.init($ct.find('li'), $ct)
	    }

	    return {
	    	loadData: loadData,
	    	handle: handle
	    }

	})()

	return addMore
})