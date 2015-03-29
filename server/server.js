var path = require('path');
var express = require('express');
var app = express();

function cacheBusting(req, res, next) {
    res.header('Cache-Control', 'must-revalidate,no-cache,no-store');
    next();
}

app.use(cacheBusting);

app.get('/', function (req, res) {
    res.send({'email': req.headers['x-forwarded-email'], 'user': req.headers['x-forwarded-user']});
});

app.use('/docs', express.static(path.join(__dirname, 'docs/')));

var server = app.listen(9000, function () {
    console.log('Server started: http://localhost:%s/', server.address().port);
});
