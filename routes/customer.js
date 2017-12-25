const express = require('express');
const winston = require('winston');
const router = express.Router();

/**
 * Fetch customer by customer id and return a order.
 */
router.get('/:id', (req, res) => {
    winston.info('GET /api/customer/:id');
    // fetch order from db and return
    res.send('OK');
});

/**
 * Create a customer 
 */
router.post('/', (req, res) => {
    winston.info('POST /api/customer/');
    // fetch order from db and return
    res.send('OK');
});

/**
 * Update customer details. 
 */
router.put('/:id', (req, res) => {
    winston.info('POST /api/customer/:id');
    // fetch order from db and return
    res.send('OK');
});

module.exports = router;
