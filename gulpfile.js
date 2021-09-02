var gulp = require("gulp");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
var concat = require("gulp-concat");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");
var minify = require("gulp-minify");

gulp.task("pug", function () {
  return gulp
    .src("./src/**/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("./dist/"));
});
gulp.task("sass", function () {
  return gulp
    .src("./src/css/**/*.scss")
    .pipe(sass())
    .pipe(concat("style.css"))
    .pipe(minify())
    .pipe(gulp.dest("./dist/css/"));
});
gulp.task("js", function () {
  return gulp
    .src("./src/js/**/**/*.js")
    .pipe(babel())
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js/"));
});
gulp.task("watch", function () {
  gulp.watch("./src/**/*.pug", gulp.series(["pug"]));
  gulp.watch("./src/css/**/*.scss", gulp.series(["sass"]));
  gulp.watch("./src/js/*.js", gulp.series(["js"]));
});

gulp.task("default", gulp.series(["pug", "sass", "js", "watch"]));
