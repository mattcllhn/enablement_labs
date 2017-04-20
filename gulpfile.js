var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var stylish = require('jshint-stylish');
var del = require('del');
var cleanCSS = require('gulp-clean-css');

var config = {
    PROJECT_ROOT: ".",
    SCRIPTS_DIR: {
        src: './scripts/src/',
        dest:'./scripts/dest/'
    },
};

gulp.task('js',['clean:js','uglify-js'], function(){
    return gulp.src(config.SCRIPTS_DIR.src + '/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(config.SCRIPTS_DIR.dest))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.SCRIPTS_DIR.dest ));
});

//Task to minify CSS added 4/19
gulp.task('minify-css', function() {
    return gulp.src('css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist'));
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
    del(config.SCRIPTS_DIR.dest + '**/*.js');
});

gulp.task('jshint',function(){
    return gulp.src('scripts/src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('sass', function () {
    var src = './scss/**/';
    return gulp.src([
//            src + '*.scss',
//            src + '*.sass',
            src + 'main.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass()) //new
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        // .pipe(sourcemaps.write('.'))
        .pipe(sourcemaps.write()) //new
        // .pipe(gulp.dest('./css/'));
        .pipe(gulp.dest('css'));
});


gulp.task('uglify-js', function() {
    return gulp.src(config.SCRIPTS_DIR.dest + '*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('bunle.js'))
        .pipe(gulp.dest(config.SCRIPTS_DIR.dest))
        .pipe(uglify())
        .pipe(sourcemaps.write(config.SCRIPTS_DIR.dest))
        .pipe(gulp.dest(config.SCRIPTS_DIR.dest ));
});

gulp.task('watch', function(){
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('scripts/src/**/*.js', ['jshint']);
});
