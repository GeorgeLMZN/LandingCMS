const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const sass = require('gulp-sass');

const dist = 'D:/openserver/OpenServer/domains/LandingPageCMS/admin';

gulp.task('copy-html', () => {
        return gulp.src("./app/index.html")
            .pipe(gulp.dest(dist));
});

gulp.task('copy-api', () => {
        return gulp.src("./app/api/**/*.*")
            .pipe(gulp.dest(dist + '/api'));
});

gulp.task('copy-assets', () => {
        return gulp.src("./app/assets/**/*.*")
            .pipe(gulp.dest(dist + '/assets'));
});

gulp.task('build-js', () => {
        return browserify('./app/src/main.js', {debug: true})
                .transform('babelify', {presets: ['@babel/preset-env'], sourceMaps: true})
                .bundle()
                .pipe(source('bundle.js'))
                .pipe(gulp.dest(dist));
});

gulp.task('build-scss', () => {
        return gulp.src('./app/scss/style.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(dist));
});

gulp.task('watch', () => {
        gulp.watch('./app/index.html', gulp.parallel('copy-html'));
        gulp.watch('./app/api/**/*.*', gulp.parallel('copy-api'));
        gulp.watch('./app/assets/**/*.*', gulp.parallel('copy-assets'));
        gulp.watch('./app/src/**/*.js', gulp.parallel('build-js'));
        gulp.watch('../app/scss/style.scss', gulp.parallel('build-scss'));
});

gulp.task('build', gulp.parallel('copy-html', 'copy-api', 'copy-assets', 'build-js', 'build-scss'));

gulp.task('default', gulp.parallel('watch', 'build'));
