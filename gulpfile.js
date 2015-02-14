/* =========================================
   gulpfile for Bitage app
   ========================================= */

var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat')
    es     = require('event-stream');

var shouldMinify = true;

function public_js(shouldMinify) {

    var jsLibs = gulp.src('public/_assets/js/libs/*.js');
    var jsPlugins = gulp.src('public/_assets/js/plugins/*.js');
    var jsComponents = gulp.src('public/_components/*.js');

    return es.merge(jsLibs, jsPlugins, jsComponents)
        .pipe(concat('bitage_public_all.js'))
        .pipe(gulpif(shouldMinify, uglify()))
        .pipe(gulp.dest('public/_assets/js'));
};

// Development task
gulp.task('develop', function () {
    shouldMinify = false;
    return public_js(shouldMinify);
});

// Production task (minify)
gulp.task('build', function () {
    shouldMinify = true;
    return public_js(shouldMinify);
});

// Watch for file updates
gulp.task('watch', function () {
    gulp.watch('public/_assets/js/libs/*.js', ['develop']);
    gulp.watch('public/_assets/js/plugins/*.js', ['develop']);
    gulp.watch('public/_components/*.js', ['develop']);
});
