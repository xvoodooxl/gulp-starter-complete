const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');


// TOP LEVEL FUNCTIONS

// gulp.task - Define tasks
// gulp.src - Point to files to use
// gulp.dest - Point to destination of files procesed
// gulp.watch - Watch folders and files for changes

// Compile sass
gulp.task('sass' , function() {
  return gulp.src(['src/sass/**/*.scss'])
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('public/css'))
  .pipe(browserSync.stream());
});

// Optimize images
gulp.task('imagemin', () =>
  gulp.src('src/images/**/**/*')
    .pipe(imagemin({
      verbose: true
    }))
    .pipe(gulp.dest('public/images'))
);

// Copy html
gulp.task('copyHTML', () =>
  gulp.src('src/*.html')
    .pipe(gulp.dest('public'))
);

// Copy Scripts
gulp.task('scripts', () =>
  gulp.src('src/scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/scripts'))
);

// Watch and Serve

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: './public'
  })

  gulp.watch(['src/sass/*.scss'], ['sass']);
  gulp.watch(['src/sass/**/*.scss'], ['sass']);
  gulp.watch(['src/*.html'], ['copyHTML']);
  gulp.watch(['public/*html']).on('change', browserSync.reload);
  gulp.watch(['public/css/*.css']).on('change', browserSync.reload);
  gulp.watch(['src/scripts/*.js'], ['scripts']);
  gulp.watch(['public/scripts/*.js']).on('change', browserSync.reload);
});


// Default
gulp.task('default' , ['serve', 'copyHTML', 'scripts', 'imagemin']);
