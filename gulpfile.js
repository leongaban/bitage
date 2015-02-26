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
    runSequence = require('run-sequence'),
    livereload  = require('gulp-livereload'),
    del         = require('del'),
    es          = require('event-stream');

var minify = true;

function compile_js(minify, folder) {
    var jsPlugins = gulp.src('client/'+folder+'/_sources/js/plugins/**/*.js');
    var jsCustom = gulp.src('client/'+folder+'/_sources/js/custom/**/*.js');
    var jsShared = gulp.src('client/'+folder+'/shared/**/*.js');
    var jsComponents = gulp.src('client/'+folder+'/components/**/*.js');

    // Order the streams and compile
    return streamqueue({ objectMode: true },
        jsPlugins,
        jsCustom,
        jsShared,
        jsComponents
    )
    .pipe(concat(folder+'.module.js'))
    .pipe(gulpif(minify, uglify()))
    .pipe(gulp.dest('client/'+folder+'/assets/js'));
};

// Delete all js and css
gulp.task('delete', function(cb) {
    del([
        'client/website/assets/css/maps',
        'client/website/assets/css/*.css',
        'client/dashboard/assets/css/maps',
        'client/dashboard/assets/css/*.css',
        'client/website/assets/js/*',
        'client/dashboard/assets/js/*'
    ], cb);
});

gulp.task('delete_web', function() {
    del(['client/website/assets/css/maps'], function(err) {});
    del(['client/website/assets/css/*.css'], function(err) {
        console.log('           web       css deleted');
    });
    del(['client/website/assets/js/*'], function(err) {
        console.log('           web       js  deleted');
    });
});

gulp.task('delete_dash', function() {
    del(['client/dashboard/assets/css/maps'], function(err) {});
    del(['client/dashboard/assets/css/*.css'], function(err) {
        console.log('           dashboard css deleted');
    });
    del(['client/dashboard/assets/js/*'], function(err) {
        console.log('           dashboard js  deleted');
    });
});

gulp.task('web_css', function() {
    return sass('client/website/_sources/sass/bitage_web.scss', { style: 'compressed' })
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('client/website/assets/css'))
        .pipe(livereload());
});

gulp.task('dash_css', function() {
    return sass('client/dashboard/_sources/sass/bitage_app.scss', { style: 'compressed' })
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('client/dashboard/assets/css'))
        .pipe(livereload());
});

gulp.task('web_js', function() {
    minify = false;
    return compile_js(minify, 'website');
});

gulp.task('dash_js', function() {
    minify = false;
    return compile_js(minify, 'dashboard');
});

// gulp.task('production', function() {
//     minify = true;
//     return compile_js(minify);
// });

// Website task:
gulp.task('web', function(callback) {
    runSequence('delete_web',
                'web_css',
                'web_js',
                callback);
});

// Dashboard task:
gulp.task('dash', function(callback) {
    runSequence('delete_dash',
                'dash_css',
                'dash_js',
                callback);
});

// Default task:
gulp.task('default', function(callback) {
    runSequence('delete',
               ['web_css', 'web_js'],
               ['dash_css', 'dash_js'],
                callback);
});

// Watch for file updates
gulp.task('watch', function() {
    livereload.listen();

    // Watch Pubic (Site) Pages | Styles | Scripts
    gulp.watch('client/website/*.html').on('change', function(file) {
        livereload.changed(file.path);
        gutil.log(gutil.colors.yellow('Site HTML changed' + ' (' + file.path + ')'));
    });

    gulp.watch('client/website/_sources/sass/**/*.scss', ['web_css']).on('change', function(file) {
        livereload.changed(file.path);
        gutil.log(gutil.colors.yellow('Website CSS changed' + ' (' + file.path + ')'));
    });

    gulp.watch('client/website/_sources/js/libs/*.js', ['web_js']);
    gulp.watch('client/website/_sources/js/plugins/*.js', ['web_js']);
    gulp.watch('client/website/components/**/*.js', ['web_js']);


    // Watch Dashboard (App) Pages | Styles | Scripts
    gulp.watch('client/dashboard/*.html').on('change', function(file) {
        livereload.changed(file.path);
        gutil.log(gutil.colors.yellow('Dashboard HTML changed' + ' (' + file.path + ')'));
    });

    gulp.watch('client/dashboard/_sources/sass/**/*.scss', ['dash_css']).on('change', function(file) {
        livereload.changed(file.path);
        gutil.log(gutil.colors.yellow('Dashboard CSS changed' + ' (' + file.path + ')'));
    });

    gulp.watch('client/dashboard/_sources/js/libs/*.js', ['dash_js']);
    gulp.watch('client/dashboard/_sources/js/plugins/*.js', ['dash_js']);
    gulp.watch('client/dashboard/components/**/*.js').on('change', function(file) {
        livereload.changed(file.path);
        gutil.log(gutil.colors.yellow('Dashboard JS changed' + ' (' + file.path + ')'));
    });

    // gulp.watch('client/dashboard/components/**/*.js', ['dash_js']);
    // gulp.watch('client/website/_sources/sass/**/*.scss', ['web_css']);
    // gulp.watch('client/dashboard/_sources/sass/**/*.scss', ['dash_css']);
});
