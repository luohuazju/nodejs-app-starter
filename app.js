const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const expressStatusMonitor = require('express-status-monitor');

const router = require('./router');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', router);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));
console.log('Running email scan contextio server on port ' + app.get('port') + ' .');

