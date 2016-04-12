var gulp = require('gulp');
var deploy = require('gulp-gh-pages');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

var css_files = [
        'app/bower_components/bootstrap/dist/css/bootstrap.min.css',
        'app/css/*.css'
    ],
    js_files = [
        'app/bower_components/jquery/dist/jquery.min.js',
        'app/bower_components/angular/angular.min.js',
        'app/bower_components/angular-resource/angular-resource.min.js',
        'app/js/*.js'
    ];

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'public'
        }
    });
    gulp.watch('app/index.html', ['html']).on('change', browserSync.reload);
    gulp.watch(css_files, ['styles']).on('change', browserSync.reload);
});

gulp.task('styles', function() {
    gulp.src(css_files)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('scripts', function() {
    gulp.src(js_files)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('public/assets/js'));
});

gulp.task('images', function () {
    gulp.src('app/img/**/*')
      .pipe(gulp.dest('public/assets/img'));
});

gulp.task('html', function() {
    gulp.src('app/index.html')
        .pipe(gulp.dest('public'));
});

gulp.task('default', ['html', 'images', 'styles', 'scripts']);
gulp.task('serve', ['default', 'server']);

gulp.task('deploy', function() {
    return gulp.src("./public/**/*")
        .pipe(deploy());
});
