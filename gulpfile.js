
'use strict';

// 此处代码都是由NODE执行
// 载入Gulp模块
var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');

// 1. LESS编译 压缩 --合并没有必要，一般预处理CSS都可以导包
gulp.task('less', function() {
  // 这里是在执行style任务时自动执行的
  gulp.src(['src/less/*.less', '!src/less/_*.less'])
    .pipe(less())
    // .pipe(cssnano())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// 2. JS合并 压缩混淆
gulp.task('js', function() {
  gulp.src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// 3. 图片复制
gulp.task('images', function() {
  gulp.src('src/images/*.*')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// 4. HTML
gulp.task('html', function() {
  gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// 5. OTHER
gulp.task('other', function() {
    // ico 复制
    gulp.src('src/favicon.ico')
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
    // lib 库复制
    gulp.src('src/lib/*.js')
        .pipe(gulp.dest('dist/lib/'))
        .pipe(browserSync.reload({
            stream: true
        }));
    // font 库复制
    gulp.src('src/fonts/')
        .pipe(gulp.dest('dist/fonts/'))
        .pipe(browserSync.reload({
            stream: true
        }));

});

// browserSync
gulp.task('serve', function() {
  browserSync({
    server: {
        baseDir: ['dist'],
        routes: {
            '/bower_components': 'bower_components'
        }
    },
  }, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
  });

  gulp.watch('src/less/*.less',['less']);
  gulp.watch('src/js/*.js',['js']);
  gulp.watch('src/images/*.*',['images']);
  gulp.watch('src/*.html',['html']);
  gulp.watch('src/**',['other']);
});