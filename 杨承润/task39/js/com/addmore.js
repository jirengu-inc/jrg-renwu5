define(['jquery','com/waterfall'],function($,waterFall){
	var addMore = (function(){
		    var length = 5

		    function loadData($ct){
		        $.ajax({
		            url: '/load',
		            type: 'get',
		            data: {
		                num: length
		            }
		        })
		        .done(function(ret) {
		        	console.log(ret)
		            handle(ret, $ct)
		        })
		        .fail(function() {
		            console.log("error")
		        })
		    }

		    function handle(data, $ct){
		        var tmpl = ''
		        $.each(data.msg,function(k, v){
		            tmpl += '<li class=" '+v+' "></li>'
		        })
		        $ct.append($(tmpl))
		        waterFall.init($ct)
		    }

		    return {
		    	loadData: loadData,
		    	handle: handle
		    }
	})()
	// $('.add').on('click',function(e){
	// 	e.preventDefault();
	// 	addMore.loadData($('.waterfall'))
	// })
	return addMore
})