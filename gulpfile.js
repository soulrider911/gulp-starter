// ////////////////////////////////////////////
// Require gulp and plugins
// ////////////////////////////////////////////
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;



// ////////////////////////////////////////////
//  Scripts Tasks
// ////////////////////////////////////////////
gulp.task('scripts' , function(){
  return gulp.src(['app/js/**/*.js' , '!app/js/**/*.min.js'])
      .pipe(plumber())
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('app/js'))
      .pipe(reload({stream:true}));
});

// ////////////////////////////////////////////
// Sass Tasks
// ////////////////////////////////////////////
gulp.task('sass' , function(){
  gulp.src('app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer('last 3 versions'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('app/css'))
    .pipe(reload({stream:true}));
});

// ////////////////////////////////////////////
// Image Task
// ////////////////////////////////////////////
gulp.task('compress' , function(){
  gulp.src('app/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('app/img'))
});

// ////////////////////////////////////////////
// HTML Tasks
// ////////////////////////////////////////////
gulp.task('html' , function(){
  gulp.src('app/**/*.html')
  .pipe(reload({stream:true}));
});

// ////////////////////////////////////////////
// Build Tasks
// ////////////////////////////////////////////

// clean out all files and folders from build folder
gulp.task('build:cleanfolder', function (cb) {
	del([
		'build/**/*'
	], cb);
});

// task to create build directory of all files
gulp.task('build:copy' , function(){
    return gulp.src('app/**/*/')
    .pipe(gulp.dest('build/'));
});

// task to removed unwanted build files
// list all files and directories here that you don't want included
gulp.task('build:remove', ['build:copy'], function (cb) {
  del([
    'build/scss',
    'build/js/!(*.min.js)'
  ], cb);
});

gulp.task('build', ['build:cleanfolder' , 'build:copy', 'build:remove']);

// ////////////////////////////////////////////
// Browser Sync Task
// ////////////////////////////////////////////
gulp.task('browser-sync' , function(){
  browserSync({
    server:{
        baseDir: "./app/"
    }
  });
});

// ////////////////////////////////////////////
// Watch
// ////////////////////////////////////////////
gulp.task('watch' , function(){
  gulp.watch('app/js/**/*.js', ['scripts']);
  gulp.watch('app/scss/**/*.scss' , ['sass']);
  gulp.watch('app/**/*.html' , ['html']);
});

// ////////////////////////////////////////////
// Gulp default
// ////////////////////////////////////////////
gulp.task('default' , ['sass' , 'scripts' , 'html' ,'browser-sync' , 'compress' , 'watch']);
