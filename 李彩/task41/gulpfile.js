/**
 * Created by lxzd1 on 2016/11/13.
 */
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css'),//css压缩
    uglify=require('gulp-uglify'),//js压缩
    concat=require("gulp-concat"), //合并文件
     htmlmin = require('gulp-htmlmin'),//html压缩
    // jshint=require("gulp-jshint"), //代码规范检查
    imagemin=require("gulp-imagemin"), //图片压缩
    rename=require("gulp-rename"),//重命名
    clean=require("gulp-clean");//清空文件夹
var pump = require('pump');



gulp.task('html', function() {
    return  gulp.src("./*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("./dist"));
});

gulp.task('css', function() {
    return gulp.src("./css/**/*.css")
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/css/'));
});



gulp.task('js', function (cb) {
    pump([
            gulp.src('./js/*.js'),
            uglify(),
            gulp.dest('./dist/js')
        ],
        cb
    );
});

gulp.task('img', () =>
gulp.src('./img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
);

gulp.task('default', ['html','css','js','img']);