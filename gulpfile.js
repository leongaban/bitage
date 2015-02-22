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
    del         = require('del'),
    es          = require('event-stream');

var minify = true;

function compile_js(minify, folder) {
    var jsLibs = gulp.src('client/'+folder+'/_sources/js/libs/*.js');
    var jsPlugins = gulp.src('client/'+folder+'/_sources/js/plugins/*.js');
    var jsCustom = gulp.src('client/'+folder+'/_sources/js/custom/*.js');
    var jsComponents = gulp.src('client/'+folder+'/components/*.js');

    // Order the streams and compile
    return streamqueue({ objectMode: true },
        jsLibs,
        jsPlugins,
        jsCustom,
        jsComponents
    )
    .pipe(concat('client/'+folder+'.module.js'))
    .pipe(gulpif(minify, uglify()))
    .pipe(gulp.dest('client/'+folder+'/assets/js'));
};

gulp.task('delete', function() {
    del(['client/website/js/*'], function(err) {
        console.log('web js deleted');
    });

    del(['client/dashboard/js/*'], function(err) {
        console.log('dashboard js deleted');
    });
});

// Compile public SASS
gulp.task('web_css', function() {
    return sass('client/website/_sources/sass/bitage_web.scss', { style: 'compressed' })
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('client/website/assets/css'));
        // .pipe(livereload());
});

// Compile dashboard SASS
gulp.task('dash_css', function() {
    return sass('client/dashboard/_sources/sass/bitage_app.scss', { style: 'compressed' })
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('client/dashboard/assets/css'));
        // .pipe(livereload());
});

// Development task
gulp.task('web_js', function() {
    minify = false;
    return compile_js(minify, 'website');
});

// Development task
gulp.task('dash_js', function() {
    minify = false;
    return compile_js(minify, 'dashboard');
});

// Production task (minify)
gulp.task('production', function() {
    minify = true;
    return compile_js(minify);
});

gulp.task('default', ['web_css', 'web_js', 'dash_css', 'dash_js']);

// Watch for file updates
gulp.task('watch', function() {
    livereload.listen();

    // Watch Pubic (Site) Pages | Styles | Scripts
    gulp.watch('client/website/*.html').on('change', function(file) {
        // livereload.changed(file.path);
        gutil.log(gutil.colors.yellow('Site HTML changed' + ' (' + file.path + ')'));
    });

    gulp.watch('client/website/_sources/sass/**/*.scss', ['web_css']).on('change', function(file) {
        // livereload.changed(file.path);
        gutil.log(gutil.colors.yellow('Website CSS changed' + ' (' + file.path + ')'));
    });

    gulp.watch('client/website/_sources/js/libs/*.js', ['web_js']);
    gulp.watch('client/website/_sources/js/plugins/*.js', ['web_js']);
    gulp.watch('client/website/components/*.js', ['web_js']);


    // Watch Dashboard (App) Pages | Styles | Scripts
    gulp.watch('client/dashboard/*.html').on('change', function(file) {
        // livereload.changed(file.path);
        gutil.log(gutil.colors.yellow('App HTML changed' + ' (' + file.path + ')'));
    });

    gulp.watch('client/dashboard/_sources/sass/**/*.scss', ['dash_css']).on('change', function(file) {
        // livereload.changed(file.path);
        gutil.log(gutil.colors.yellow('Dashboard CSS changed' + ' (' + file.path + ')'));
    });

    gulp.watch('client/dashboard/_sources/js/libs/*.js', ['dash_js']);
    gulp.watch('client/dashboard/_sources/js/plugins/*.js', ['dash_js']);
    gulp.watch('client/dashboard/components/*.js', ['dash_js']);

    // gulp.watch('client/website/_sources/sass/**/*.scss', ['web_css']);
    // gulp.watch('client/dashboard/_sources/sass/**/*.scss', ['dash_css']);
});
