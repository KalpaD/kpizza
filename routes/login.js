const express = require('express');
const winston = require('winston');
const router = express.Router();

/**
 * Login customer. 
 */
router.post('/', (req, res) => {
    winston.info('POST /api/login/');
    // fetch order from db and return
    res.send('OK');
});


module.exports = router;