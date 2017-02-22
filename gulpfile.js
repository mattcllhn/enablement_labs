var gulp = require('gulp');
// var livereload = require('gulp-livereload')
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
// var imagemin = require('gulp-imagemin');
// var pngquant = require('imagemin-pngquant');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var stylish = require('jshint-stylish');
var del = require('del');

var config = {
    PROJECT_ROOT: ".",
    SCRIPTS_DIR: {
        src: './scripts/src/',
        dest:'./scripts/dest/'
    },
};

gulp.task('js',['clean:js','copy:js','uglify-js'], function(){
    console.log('Completed JavaScript task');
});

gulp.task('imagemin', function () {
    return gulp.src('./images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./images'));
});

gulp.task('clean:js', function(){
    del(config.SCRIPTS_DIR.dest);
});
gulp.task('jshint',function(){
    return gulp.src(config.SCRIPTS_DIR.src + '*.js')
        .jshint()
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('copy:js',function(){
    return gulp.src(config.SCRIPTS_DIR.src + '*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(gulp.dest(config.SCRIPTS_DIR.dest));
});

gulp.task('sass', function () {
    var src = './scss/**/';
    return gulp.src([src + '*.scss',
            src + '*.sass'])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css/'));
});


gulp.task('uglify-js', function() {
    gulp.src(config.SCRIPTS_DIR.dest + '*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('bunle.js'))
        .pipe(gulp.dest(config.SCRIPTS_DIR.dest))
        .pipe(uglify())
        .pipe(sourcemaps.write(config.SCRIPTS_DIR.dest))
        .pipe(gulp.dest(config.SCRIPTS_DIR.dest ));
});

gulp.task('watch', function(){
    // livereload.listen();

    gulp.watch('./scss/**/*.scss', ['sass']);
    // gulp.watch('./sites/all/themes/oneconcord/lib/*.js', ['uglify']);
    // gulp.watch(['./sites/all/themes/oneconcord/css/style.css', './sites/all/themes/oneconcord/**/*.twig', './sites/all/themes/oneconcord/js/*.js'], function (files){
    //     livereload.changed(files)
    // });
});
