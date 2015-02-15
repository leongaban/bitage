/* =========================================
   gulpfile for Bitage app
   ========================================= */

var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    gulpif      = require('gulp-if'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    sass        = require('gulp-ruby-sass'),
    streamqueue = require('streamqueue'),
    sourcemaps  = require('gulp-sourcemaps'),
    livereload  = require('gulp-livereload'),
    es          = require('event-stream');

var minify = true;

function compile_js(minify, folder) {
    var jsLibs = gulp.src(folder+'/_sources/js/libs/*.js');
    var jsPlugins = gulp.src(folder+'/_sources/js/plugins/*.js');
    var jsCustom = gulp.src(folder+'/_sources/js/custom/*.js');
    var jsComponents = gulp.src(folder+'/_components/*.js');

    // Order the streams and compile
    return streamqueue({ objectMode: true },
        jsLibs,
        jsPlugins,
        jsCustom,
        jsComponents
    )
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
    // minify = false;
    return compile_js(minify, 'public');
});

// Development task
gulp.task('devapp', function () {
    // minify = false;
    return compile_js(minify, 'dashboard');
});

// Production task (minify)
gulp.task('production', function () {
    // minify = true;
    return public_js(minify);
});

// Watch for file updates
gulp.task('watch', function () {
    livereload.listen();

    // Watch Pubic (Site) Pages | Styles | Scripts
    gulp.watch('public/*.html').on('change', function(file) {
        livereload.changed(file.path);
        gutil.log(gutil.colors.yellow('Site HTML changed' + ' (' + file.path + ')'));
    });

    gulp.watch('public/_sources/sass/**/*.scss', ['sass_site']).on('change', function(file) {
        livereload.changed(file.path);
        gutil.log(gutil.colors.yellow('Public CSS changed' + ' (' + file.path + ')'));
    });

    gulp.watch('public/_sources/js/libs/*.js', ['devsite']);
    gulp.watch('public/_sources/js/plugins/*.js', ['devsite']);
    gulp.watch('public/_components/*.js', ['devsite']);
    

    // Watch Dashboard (App) Pages | Styles | Scripts
    gulp.watch('dashboard/*.html').on('change', function(file) {
        livereload.changed(file.path);
        gutil.log(gutil.colors.yellow('App HTML changed' + ' (' + file.path + ')'));
    });

    gulp.watch('dashboard/_sources/sass/**/*.scss', ['sass_site']).on('change', function(file) {
        livereload.changed(file.path);
        gutil.log(gutil.colors.yellow('Dashboard CSS changed' + ' (' + file.path + ')'));
    });

    gulp.watch('dashboard/_sources/js/libs/*.js', ['devsite']);
    gulp.watch('dashboard/_sources/js/plugins/*.js', ['devsite']);
    gulp.watch('dashboard/_components/*.js', ['devsite']);

    // gulp.watch('public/_sources/sass/**/*.scss', ['sass_site']);
    // gulp.watch('dashboard/_sources/sass/**/*.scss', ['sass_app']);
});
