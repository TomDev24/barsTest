var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');

gulp.task('sass-compile', function(){
    return gulp.src('./sass/style.sass')
        //.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public'));
})

gulp.task('sass:watch', function(){
    gulp.watch('./sass/*.sass', gulp.series('sass-compile'));
}) 
