/**
 * Created by fly on 2016/6/17 0017.
 */

var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    notify= require('gulp-notify'),
    del = require('del'),
    livereload = require('gulp-livereload');


gulp.task('images', function () {
    return gulp.src('./static/images/**/*')
        .pipe(
            cache(
                imagemin({
                    optimizationLevel: 3, progressive: true, interlaced: true
                })
            )
        )
    .pipe(gulp.dest('./static/imgs'))
    .pipe(notify({message:'imagemin task complete'}));


});

gulp.task('clean',function(cb){
    del(['./static/assets/img'],cb)
});

gulp.task('default',['clean'],function(){
   gulp.start('images');
});

gulp.task('watch',function(){

    gulp.watch('./static/images/**/*',['images']);
    livereload.listen();
    gulp.watch(['./static/images/**']).on('change', livereload.changed);
});



