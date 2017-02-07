require.config({
	baseUrl:'./js',
	paths:{
		'jquery':'lib/jquery-1.8.3.min'//相对于baseUrl的位置；
	}
})
require(['jquery','com/gotop','com/carousel','com/waterfall','com/loadmore','com/exposure'],function($,goTop,Carousel,waterfall,addMore,setData){
	
	//gotop
	var gotop1=new goTop($("body"));
	gotop1.create();
	gotop1.bind();

	//carousel
	Carousel($("#header"));

	//waterfall
	waterfall($(".por-load"));

	//loadmore
	addMore($(".load-more"),$(".por-load"));

	//exposure
	setData($(".about-con"));
})