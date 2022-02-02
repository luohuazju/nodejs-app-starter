const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const expressStatusMonitor = require('express-status-monitor');
// const NacosConfigClient = require('nacos').NacosConfigClient;
const router = require('./router');

(async() => {

    // const configClient = new NacosConfigClient({
    //     serverAddr: 'centos7-master',
    //     username: 'nacos',
    //     password: 'kaishi'
    //   });
    
    // get config once
    // const content= await configClient.getConfig('nodejs.app.starter', 'DEFAULT_GROUP');
    // console.log('getConfig = ', content);
    
    /**
     * Create Express server.
     */
    const app = express();
    
    /**
     * Express configuration.
     */
    app.set('host', process.env.HOST || '0.0.0.0');
    app.set('port', process.env.PORT || 80);
    app.use(expressStatusMonitor());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use('/', router);
    
    /**
     * Error Handler.
     */
    if (process.env.NODE_ENV === 'development') {
        // only use in development
        app.use(errorHandler());
    } else {
        app.use((err, req, res, next) => {
            console.error(err);
            res.status(500).send('Server Error');
        });
    }
    
    /**
     * Start Express server.
     */
    app.listen(app.get('port'), () => {
        console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
        console.log('  Press CTRL-C to stop\n');
    });

    module.exports = app;

})();
