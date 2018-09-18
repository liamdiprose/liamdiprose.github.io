var gulp = require("gulp");
var sass = require("gulp-sass")
var mustache = require("gulp-mustache")
var yaml = require("js-yaml")
var fs = require("fs")
var rename = require("gulp-rename")
var browserSync = require('browser-sync').create();

function html () {
    return gulp.src('src/*.template.html')
        .pipe(mustache(yaml.safeLoad(fs.readFileSync('src/content.yml', 'utf8'))))
        .pipe(rename("index.html"))
        // .pipe(gulp.dest('dist/'))
        .pipe(gulp.dest('.')) // Place index in root directoy for .github.io hosting
}

function mainStyles () {
    return gulp.src('src/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/'))
}

function printStyles () {
    return gulp.src('src/print.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/'))
}

const compile = gulp.parallel([html, mainStyles, printStyles]);

function watch() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(['src/print.scss', 'src/style.scss'], gulp.parallel([mainStyles, printStyles]))
        .on('change', () => browserSync.reload());
    gulp.watch(['src/content.yml', 'src/cv.template.html'], html)
        .on('change', () => browserSync.reload());
}



module.exports.default = compile
module.exports.watch = watch