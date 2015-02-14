/* =========================================
   gulpfile for Bitage app
   ========================================= */

var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    gulpif     = require('gulp-if'),
    uglify     = require('gulp-uglify'),
    concat     = require('gulp-concat'),
    sass       = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    es         = require('event-stream');

// https://www.npmjs.com/package/gulp-ruby-sass
var shouldMinify = true;

function public_js(shouldMinify) {

    var jsLibs = gulp.src('public/_sources/js/libs/*.js');
    var jsPlugins = gulp.src('public/_sources/js/plugins/*.js');
    var jsComponents = gulp.src('public/_components/*.js');

    return es.merge(jsLibs, jsPlugins, jsComponents)
        .pipe(concat('bitage_public_all.js'))
        .pipe(gulpif(shouldMinify, uglify()))
        .pipe(gulp.dest('public/_assets/js'));
};

// Compile public SASS
gulp.task('sass_public', function () {
    return sass('public/_sources/sass/bitage_web.scss', { style: 'compressed' })
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('public/_assets/css'))
        .pipe(livereload());
});

// Development task
gulp.task('develop_public', function () {
    shouldMinify = false;
    return public_js(shouldMinify);
});

// Production task (minify)
gulp.task('build_public', function () {
    shouldMinify = true;
    return public_js(shouldMinify);
});

// Watch for file updates
gulp.task('watch', function () {
    gulp.watch('public/_sources/js/libs/*.js', ['develop_public']);
    gulp.watch('public/_sources/js/plugins/*.js', ['develop_public']);
    gulp.watch('public/_components/*.js', ['develop_public']);

    gulp.watch('public/_sources/sass/bitage_web.scss', ['sass_public']);
});
