function dontStep(){
	this.speed=4;
	this.score=0;
	this.init();
	this.startGame();
	this.bindEvent();
}
dontStep.prototype.startGame=function(){
	var _this=this;
	time=setInterval(function(){
		_this.move();
	},30)
}
dontStep.prototype.createRow=function(){
	var tpl='	<div class="row">'+
			'<div class="cell"></div>'+
			'<div class="cell"></div>'+
			'<div class="cell"></div>'+
			'<div class="cell"></div>'+
			'</div>';
	$('#con').prepend(tpl);
	var i=Math.floor(Math.random()*4);
	console.log(i)
	$('#con').first().find('.cell').eq(i).addClass('black');
}
dontStep.prototype.init=function(){
	for(var i=0;i<4;i++){
		this.createRow();
	}
}
dontStep.prototype.move=function(){
	var $con=$('#con');
	var top=$con.css('top');
	top=parseInt(top)+this.speed;
	$con.css('top',top)	
	console.log(top)
	if(top>=0){
		this.createRow();
		$con.css('top','-100px')	
	}
	var rowbottom=parseInt($('.row').last().offset().top)+100;
	var conbottom=parseInt($('#main').offset().top)+400;
	if(conbottom<=rowbottom){
		clearInterval(time)
		this.gameOver();
	}
}
dontStep.prototype.gameOver=function(){
	$('.start').hide();
	$('.reStart').show();
	$('#cover').show();
}
dontStep.prototype.speedUp=function(){
	if(this.score%10===0&&this.score!==0){
		this.speed+=2;
	}
}
dontStep.prototype.scoreUp=function(){
	this.score+=1;
	$('#score').text('总分：'+this.score);
	this.speedUp();
}
dontStep.prototype.bindEvent=function(){
	var _this=this;
	$('#con').on('click','.black',function(){
		if($(this).parent().index()===$('.row').last().index()){
			$('#con').find('.row').last().remove();
			_this.scoreUp();
		}
	})
	$('.reStart').on('click',function(e){
		e.preventDefault();
		_this.reStart();
	})
}
dontStep.prototype.reStart=function(){
	$('.row').each(function(){
		this.remove();
	})
	this.speed=4;
	this.score=0;
	$('#score').text('总分：'+0);
	this.init();
	this.startGame();
	$('#cover').hide();
}