//点击按钮加载后端的数据
define(['jquery','com/waterfall'],function($,waterfall){

	function addMore($node,$nodes){
		waterfall($nodes);
	//	var $newNodes=$nodes.children().clone(true);
		console.log($nodes);
		$node.on("click",function(){
			$.ajax({
				url:'res.php',
				type:'GET',
				dataType:'json',
				data:{
					num:6
				}
			}).done(function(ret){
				if(ret === 1){
					var $newNodes=$nodes.children().clone(true);//为什么不能把这个放在事件绑定外面，放在外面后，就只能执行一次插入内容
					$nodes.append($newNodes);
					waterfall($nodes);
				}
			}).fail(function(){
				console.log('error...');
			});
		});
	};
	//addMore($(".load-more"),$(".por-load"));
	return addMore;
})

