/**
 * Created by zhaoxincheng on 2017/6/5.
 */
//gulp的主文件,必须叫这个名字

'use strict'

//1.less编译,压缩,合并  (编译插件:gulp-less 压缩插件:gulp-cssnano  合并插件:gulp-concat)
//2.JS合并 压缩  混淆  (混淆插件:gulp-uglify)
//3.img复制
//4.html压缩 (html压缩插件:gulp-htmlmin)
//5.监听文件变化  (插件browser-sync)


//载入gulp包
var gulp = require('gulp');
//导入编译less插件gulp-less
var less = require('gulp-less');
//导入压缩css插件
var cssnano = require('gulp-cssnano');
//导入合并插件
var concat = require('gulp-concat');

//导入js压缩混淆插件
var uglify = require('gulp-uglify');

//导入html压缩插件
var htmlmin = require('gulp-htmlmin');

//监听文件变化插件
var browserSync = require('browser-sync');


//1.less编译,压缩,   合并(--合并没有必要,一般预处理css都可以导包)
gulp.task('style',function () {
   //这里是在执行style任务时自动执行的
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({
            stream: true
        }));   //当执行到这里时刷新一下浏览器
});


//2.JS合并  压缩混淆  (混淆插件:gulp-uglify)
gulp.task('script',function () {
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({
            stream: true
        }));   //当执行到这里时刷新一下浏览器
});

//3.图片复制
gulp.task('image',function () {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream: true
        }));   //当执行到这里时刷新一下浏览器
});



//4.html处理
gulp.task('html',function () {
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,  //去空白
            removeComments: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));   //当执行到这里时刷新一下浏览器
});

//5.监听文件变化  (插件browser-sync)
gulp.task('serve',function () {
    browserSync({
        server: {
            baseDir: 'dist'
        },
    },function (err, bs) {
        console.log(bs.options.getIn(['urls','local']));
    });


    //监听文件,自动执行任务
    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);
});