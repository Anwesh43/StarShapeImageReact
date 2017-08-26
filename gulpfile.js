const gulp = require('gulp')
const fs = require('fs')
const browserify = require('browserify')
gulp.task('compileES6',()=>{
    browserify('index.js').transform('babelify',{presets:['es2015','react']}).bundle().pipe(require('fs').createWriteStream('public/bundle.js'))
})
