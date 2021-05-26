const gulp = require('gulp');
const source = require('vinyl-source-stream');
const boffer = require('vinyl-buffer');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const buffer = require('vinyl-buffer');
const autoprefixer = require('gulp-autoprefixer');
const cleaner = require('gulp-clean-css');
const autoPrefixer = require('gulp-autoprefixer');

const dist = 'D:/openserver/OpenServer/domains/LandingPageCMS/admin',
        distProd = './build';

gulp.task('copy-html', () => {
        return gulp.src("./app/index.html")
            .pipe(gulp.dest(dist));
});

gulp.task('copy-api', () => {
                 gulp.src("./app/api/**/*.*")
            .pipe(gulp.dest(dist + '/api'));
                 gulp.src("./app/api/**/.*")
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

gulp.task('build-prod', () => {
        gulp.src("./app/index.html")
            .pipe(gulp.dest(distProd));
        gulp.src("./app/api/**/*.*")
           .pipe(gulp.dest(distProd + '/api'));
        gulp.src("./app/api/**/.*")
           .pipe(gulp.dest(distProd + '/api'));
        gulp.src("./app/assets/**/*.*")
           .pipe(gulp.dest(distProd + '/assets'));
        
        browserify('./app/src/main.js', {debug: false})
           .transform('babelify', {presets: ['@babel/preset-env'], sourceMaps: false})
           .bundle()
           .pipe(source('bundle.js'))
           .pipe(buffer())
           .pipe(uglify())
           .pipe(gulp.dest(distProd));
        
        gulp.src('./app/scss/style.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(autoPrefixer())
            .pipe(cleaner())
            .pipe(gulp.dest(distProd));
});

gulp.task('default', gulp.parallel('watch', 'build'));

