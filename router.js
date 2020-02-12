/*jslint node: true */
'use strict';

var express = require('express');

var config = require('./lib/config');
var log4js = require('log4js');
var HashMap = require('hashmap').HashMap;
var emailscan = require('./lib/emailscan');

var account_controller = require('./controller/account.controller.js');
var job_controller = require('./controller/job.controller.js');
var resume_controller = require('./controller/resume.controller.js');
var attachment_controller = require('./controller/attachment.controller.js');
var webhook_controller = require('./controller/webhook.controller.js');
var ping_controller = require('./controller/ping.controller.js');

//hold all the services
var services = new HashMap();

//set up config
var env = process.env.BUILD_ENV || 'test';

config.load(__dirname + '/config', env + '-conf');
services.set('config', config);

//set up logger
log4js.configure(__dirname + '/config/log/' + config.data.logConfigFileName, config.data.log4js); 
var logger = log4js.getLogger('root');
services.set('logger', logger);

//set up emailscan
emailscan.services = services;
emailscan.init(services);
services.set('emailscan', emailscan);

//set up controllers
account_controller.init(services);
job_controller.init(services);
resume_controller.init(services);
attachment_controller.init(services);
webhook_controller.init(services);
ping_controller.init(services);

//routing configuration
var router = express.Router();
router.get('/api/v1/contextio/accounts/:email', account_controller.getAccountByEmail);
router.post('/api/v1/contextio/accounts', account_controller.createAccount);
router.post('/api/v1/contextio/tokens', account_controller.createTokenAccount);
router.post('/api/v1/contextio/tokens/single', account_controller.createSingleTokenAccount);
router.post('/api/v1/contextio/accounts/:accountCode', account_controller.addSource);
router.post('/api/v1/contextio/tokens/:accountCode', account_controller.addToken);
router.get('/api/v1/contextio/sync/:accountCode', account_controller.getSyncStatus);
router.post('/api/v1/contextio/sync/:accountCode', account_controller.syncStatus);
router.post('/api/v1/contextio/jobs/scan', job_controller.scanJobs);
router.get('/api/v1/contextio/jobs/:accountCode/:messageCode', job_controller.getJob);
router.post('/api/v1/contextio/resumes/scan', resume_controller.scanResumes);
router.get('/api/v1/contextio/resumes/:accountCode/:messageCode', resume_controller.getResumeContent);
router.get('/api/v1/contextio/attachments/:accountCode/:fileCode', attachment_controller.getResumeAttachmentLink);
router.get('/api/v1/contextio/webhooks/:accountCode', webhook_controller.getWebhook);
router.post('/api/v1/contextio/webhooks/:accountCode', webhook_controller.webhook);
router.get('/api/v1/contextio/ping', ping_controller.ping);


module.exports = router;



	