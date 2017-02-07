var gulp=require('gulp');

//引入组件
var minifycss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	minhtml= require('gulp-htmlmin'),
	concat = require('gulp-concat')

gulp.task('html',function(){
	gulp.src('src/*.html')
			   .pipe(minhtml({collapseWhitespace:true}))
			   .pipe(gulp.dest('dist/'));
});

gulp.task('css',function(){
	gulp.src('src/css/*.css')
		.pipe(concat('merge.min.css'))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css/'));
});

//由于之前已经使用r.js压缩过了，所以这里不需要再进行压缩合并了，已学会相关操作了
gulp.task('js',function(){
	gulp.src(['src/js/main.min.js','src/js/lib/require.js'])
		.pipe(concat('merge.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'));

});

gulp.task('img',function(){
	gulp.src('src/img/img-2/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img/img-2/'));
})

gulp.task('build',['img','html','css','js']);