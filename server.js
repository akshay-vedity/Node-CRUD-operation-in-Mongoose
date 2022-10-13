let express = require('express');
let bodyParser = require('body-parser');
let util = require('util');
let path = require('path');
let app = module.exports = express();
global.appRoot = path.resolve(__dirname);

app.use(bodyParser.urlencoded({ extended: true }));
// increasing the limit : else giving error Request entity too large.
app.use(bodyParser.json({
    limit: '100mb'
}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');

    //intercepts OPTIONS method createServer
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.sendStatus(200);
    } else {
        //move on
        next();
    }
});

/* Import database connection file */
require('./MongooseConnection');

/* Import route file */
app.use('/api', require('./routes'));

// If no route is matched by now, it must be a 404
app.use(function (req, res, next) {
    console.log(req.body);
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

let server = app.listen(3000, function () {
    util.log('Express server listening on port ' + server.address().port);
});
