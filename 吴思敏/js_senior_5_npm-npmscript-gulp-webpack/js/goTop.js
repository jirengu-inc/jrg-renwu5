
function GoTop(ct,target){
	this.ct=ct;
	this.target=target;
	//绑定事件
	this.bindEvent();
	this.target.html(this.createNode())
}
//prototype
GoTop.prototype={
	bindEvent:function(){
		var that = this;
		//滚动事件
		$(window).scroll(function(event){
			// var needShow=$(window).scrollTop() > window.innerHeight;
			// console.log(needShow)
			if($(window).scrollTop() > window.innerHeight){
				that.target.removeClass('hide')
			}else{
				that.target.addClass('hide')
			}
		})
		//点击事件
		this.target.click(function(){
			$(window).scrollTop(0)//回到顶部
		})
	},
	createNode:function(){
		return '<span>回到顶部↑</span>'
	}
}
new GoTop($('#layout'),$('.J_GoTop'))



