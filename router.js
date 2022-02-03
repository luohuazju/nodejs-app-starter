const express = require('express');

/**
 * controllers (route handlers). 
 */
const accountController = require('./controller/account-controller');
const PingController = require('./controller/ping-controller');

const pingController = new PingController();
//routing configuration
var router = express.Router();
router.get('/api/v1/ping', pingController.ping);
router.post('/api/v1/accounts', accountController.add);
router.put('/api/v1/accounts/:id', accountController.update);
router.delete('/api/v1/accounts/:id', accountController.delete);
router.get('/api/v1/accounts', accountController.query);
router.get('/api/v1/accounts/:id', accountController.get);

module.exports = router;



	