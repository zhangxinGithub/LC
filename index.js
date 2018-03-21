var express = require('express');
var app = express();
app.get('/text', function (req, res, next) {
    var promise = new Promise(function (resolve, reject) {
        //do something
        if (success) {
            resolve(value);
        } else {
            reject(value);
        }
    });
    console.log(promise);
    next();
}, function (req, res) {

    res.send('Hello World!');
});
app.use(express.static('public'));
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})