var gulp = require('gulp');
var os = require("os");
var networkInterfaces = os.networkInterfaces();
var fs = require('fs');
var replace = require('gulp-replace');
var shell = require('gulp-shell');
gulp.task('setIp', function () {
    var end = 46;
    (function fn() {
        var readStream = fs.createReadStream('./config/hostconfig.js', {start: 30, end: end--});
        readStream.on('data', function (data) {
            if (data.toString().indexOf("'") < 0) {
                if (data.toString() !== networkInterfaces.en0[1].address) {
                    gulp.src(['./config/hostconfig.js'])
                        .pipe(replace(data.toString(), networkInterfaces.en0[1].address))
                        .pipe(gulp.dest('config/'));
                }
                console.log('启动本地IP为:', networkInterfaces.en0[1].address);
            } else {
                fn()
            }
        })
    })()
})
gulp.task('default', ['setIp'], function () {
    console.log('执行')
});
/*gulp.task('shell', function () {
    shell('webpack-dev-server --mode development --config ./public/webpack/webpackV4.0react/webpack.config.js --history-api-fallback')
    shell('npm start')
});*/
