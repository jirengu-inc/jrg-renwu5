requirejs.config({
	baseUrl:'./js',
	paths:{
		'jquery':'lib/jquery.min'
	}
});

requirejs(['app/index'])