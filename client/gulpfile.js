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
    // livereload  = require('gulp-livereload'),
    del         = require('del'),
    es          = require('event-stream');

var minify = true;

/**
 * Compiles all Javascript
 * @param  { boolean - minify true/false }
 * @param  { string  - folder path name }
 * @return { object  - streamqueue objects }
 */
function compile_js(minify, folder) {
    var jsPlugins = gulp.src(folder+'/_sources/js/plugins/**/*.js');
    var jsCustom = gulp.src(folder+'/_sources/js/custom/**/*.js');
    var jsShared = gulp.src(folder+'/app/shared/**/*.js');
    var jsComponents = gulp.src(folder+'/app/components/**/*.js');

    // Order the streams and compile
    return streamqueue({ objectMode: true },
        jsPlugins,
        jsCustom,
        jsShared,
        jsComponents
    )
    .pipe(concat(folder+'.module.js'))
    .pipe(gulpif(minify, uglify()))
    .pipe(gulp.dest(folder+'/assets/js'));
};

// Delete all js and css
gulp.task('delete', function(cb) {
    del([
        'website/assets/css/maps',
        'website/assets/css/*.css',
        'dashboard/assets/css/maps',
        'dashboard/assets/css/*.css',
        'website/assets/js/*',
        'dashboard/assets/js/*'
    ], cb);
});

gulp.task('delete_web', function() {
    del(['website/assets/css/maps'], function(err) {});
    del(['website/assets/css/*.css'], function(err) {
        console.log('           web       css deleted');
    });
    del(['website/assets/js/*'], function(err) {
        console.log('           web       js  deleted');
    });
});

gulp.task('delete_dash', function() {
    del(['dashboard/assets/css/maps'], function(err) {});
    del(['dashboard/assets/css/*.css'], function(err) {
        console.log('           dashboard css deleted');
    });
    del(['dashboard/assets/js/*'], function(err) {
        console.log('           dashboard js  deleted');
    });
});

gulp.task('web_css', function() {
    return sass('website/_sources/sass/bitage_web.scss', { style: 'compressed' })
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('website/assets/css'))
        // .pipe(livereload());
});

gulp.task('dash_css', function() {
    return sass('dashboard/_sources/sass/bitage_app.scss', { style: 'compressed' })
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dashboard/assets/css'))
        // .pipe(livereload());
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
    // livereload.listen();

    // Watch Pubic (Site) Pages | Styles | Scripts
    gulp.watch('website/*.html').on('change', function(file) {
        // livereload.changed(file.path);
        gutil.log(gutil.colors.yellow('Site HTML changed' + ' (' + file.path + ')'));
    });

    gulp.watch('website/_sources/sass/**/*.scss', ['web_css']).on('change', function(file) {
        // livereload.changed(file.path);
        gutil.log(gutil.colors.yellow('Website CSS changed' + ' (' + file.path + ')'));
    });

    gulp.watch('website/_sources/js/libs/*.js', ['web_js']);
    gulp.watch('website/_sources/js/plugins/*.js', ['web_js']);
    gulp.watch('website/app/components/**/*.js', ['web_js']).on('change', function(file) {
        gutil.log(gutil.colors.yellow('Web JS changed' + ' (' + file.path + ')'));
    });

    // Watch Dashboard (App) Pages | Styles | Scripts
    gulp.watch('dashboard/*.html').on('change', function(file) {
        // livereload.changed(file.path);
        gutil.log(gutil.colors.yellow('Dashboard HTML changed' + ' (' + file.path + ')'));
    });

    gulp.watch('dashboard/_sources/sass/**/*.scss', ['dash_css']).on('change', function(file) {
        // livereload.changed(file.path);
        gutil.log(gutil.colors.yellow('Dashboard CSS changed' + ' (' + file.path + ')'));
    });

    gulp.watch('dashboard/_sources/js/libs/*.js', ['dash_js']);
    gulp.watch('dashboard/_sources/js/plugins/*.js', ['dash_js']);
    gulp.watch('dashboard/app/**/*.js', ['dash_js']).on('change', function(file) {
        // livereload.changed(file.path);
        gutil.log(gutil.colors.yellow('Dashboard JS changed' + ' (' + file.path + ')'));
    });

    // gulp.watch('dashboard/components/**/*.js', ['dash_js']);
    // gulp.watch('website/_sources/sass/**/*.scss', ['web_css']);
    // gulp.watch('dashboard/_sources/sass/**/*.scss', ['dash_css']);
});
