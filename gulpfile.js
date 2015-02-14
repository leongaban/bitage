var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var shouldMinify = true;

function public_js(shouldMinify) {
    return gulp.src('public/_components/*.js')
        .pipe(concat('bitage_public_all.js'))
        .pipe(gulpif(shouldMinify, uglify()))
        .pipe(gulp.dest('public/_assets/js'));
};

gulp.task('develop', function () {
    shouldMinify = false;
    return public_js(shouldMinify);
});

gulp.task('build', function () {
    shouldMinify = true;
    return public_js(shouldMinify);
});

// gulp.task('public_js', function () {
//     gulp.src('public/_components/*.js')
//         .pipe(uglify())
//         .pipe(concat('public/bitage_public_all.js'))
//         .pipe(gulp.dest('public/_assets/js/'));
// });

// gulp.task('default', function(){
//     gulp.run('public_js');
// });
