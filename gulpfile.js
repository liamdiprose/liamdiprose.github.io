var gulp = require("gulp");

var sass = require("gulp-sass")
var mustache = require("gulp-mustache")


gulp.task('html', function() {
    return gulp.src('src/*.template.html')
        .pipe(mustache())
        .pipe(gulp.dest('index.html'))
});

gulp.task('main-styles', function() {
    return gulp.src('src/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/style.css'))
});

gulp.task('print-styles', function() {
    return gulp.src('src/print.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/print.css'))
});


gulp.task('default', ['html', 'main-styles', 'print-styles']);