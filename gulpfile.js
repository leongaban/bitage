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
var minify = true;

function public_js(minify) {
    var jsLibs = gulp.src('public/_sources/js/libs/*.js');
    var jsPlugins = gulp.src('public/_sources/js/plugins/*.js');
    var jsComponents = gulp.src('public/_components/*.js');

    return es.merge(jsLibs, jsPlugins, jsComponents)
        .pipe(concat('bitage_site.js'))
        .pipe(gulpif(minify, uglify()))
        .pipe(gulp.dest('public/_assets/js'));
};

function dashboard_js(minify) {
    var jsLibs = gulp.src('dashboard/_sources/js/libs/*.js');
    var jsPlugins = gulp.src('dashboard/_sources/js/plugins/*.js');
    var jsComponents = gulp.src('dashboard/_components/*.js');

    return es.merge(jsLibs, jsPlugins, jsComponents)
        .pipe(concat('bitage_app.js'))
        .pipe(gulpif(minify, uglify()))
        .pipe(gulp.dest('dashboard/_assets/js'));
};

function compile_js(minify, folder) {
    var jsLibs = gulp.src(folder+'/_sources/js/libs/*.js');
    var jsPlugins = gulp.src(folder+'/_sources/js/plugins/*.js');
    var jsComponents = gulp.src(folder+'/_components/*.js');

    return es.merge(jsLibs, jsPlugins, jsComponents)
        .pipe(concat('bitage_scripts.js'))
        .pipe(gulpif(minify, uglify()))
        .pipe(gulp.dest(folder+'/_assets/js'));
};

// Compile public SASS
gulp.task('sass_site', function () {
    return sass('public/_sources/sass/bitage_web.scss', { style: 'compressed' })
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('public/_assets/css'))
        .pipe(livereload());
});

// Compile dashboard SASS
gulp.task('sass_app', function () {
    return sass('dashboard/_sources/sass/bitage.scss', { style: 'compressed' })
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dashboard/_assets/css'))
        .pipe(livereload());
});

// Development task
gulp.task('devsite', function () {
    minify = false;
    // return public_js(minify);
    return compile_js(minify, 'public');
});

// Development task
gulp.task('devapp', function () {
    minify = false;
    // return dashboard_js(minify);
    return compile_js(minify, 'dashboard');
});

// Production task (minify)
gulp.task('production', function () {
    minify = true;
    return public_js(minify);
});

// Watch for file updates
gulp.task('watch', function () {
    livereload.listen();

    gulp.watch('public/_sources/js/libs/*.js', ['devsite']);
    gulp.watch('public/_sources/js/plugins/*.js', ['devsite']);
    gulp.watch('public/_components/*.js', ['devsite']);

    gulp.watch('dashboard/_sources/js/libs/*.js', ['devsite']);
    gulp.watch('dashboard/_sources/js/plugins/*.js', ['devsite']);
    gulp.watch('dashboard/_components/*.js', ['devsite']);

    gulp.watch('public/_sources/sass/**/*.scss', ['sass_site']);
    gulp.watch('dashboard/_sources/sass/**/*.scss', ['sass_app']);
});
