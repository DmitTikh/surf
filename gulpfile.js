import gulp from 'gulp';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import {deleteAsync as del} from 'del';
import autoprefixer from 'gulp-autoprefixer';


export const clean = async () => {
  return del('./dist/');
};


export const scss = () => {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 8 versions']
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
};

export const css = () => {
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({stream: true}))
};

export const html = () => {
  return gulp.src('app/*.html')
  .pipe(browserSync.reload({stream: true}))
};

export const script = () => {
  return gulp.src('app/js/*.js')
  .pipe(browserSync.reload({stream: true}))
};

export const js = () => {
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}))
};

export const browserSsync = ()=> {
  browserSync.init({
    server: {
        baseDir: "app/"
    }
});
};

export const exportion = ()=> {
    let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));

    let BuildCss = gulp.src('app/css/**/*.css')
      .pipe(gulp.dest('dist/css'));

    let BuildJs = gulp.src('app/js/**/*.js')
      .pipe(gulp.dest('dist/js'));
      
    let BuildFonts = gulp.src('app/fonts/**/*.*')
      .pipe(gulp.dest('dist/fonts'));

    let BuildImg = gulp.src('app/img/**/*.*')
      .pipe(gulp.dest('dist/img'));   
};

export const watch = ()=> {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('script'))
};



export let build = gulp.series(clean, exportion, gulp.parallel(css ,scss, js));
let watches = gulp.parallel(build, browserSsync, watch); 
export default watches;