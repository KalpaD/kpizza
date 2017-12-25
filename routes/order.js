const express = require('express');
const winston = require('winston');
const router = express.Router();

/**
 * Fetch order by order id and return a order.
 */
router.get('/:id', (req, res) => {
    winston.info('GET /api/order/:id');
    // fetch order from db and return
    res.send('OK');
});

/**
 * Create an order in the db.
 */
router.post('/', (req, res) => {
    winston.info('POST /api/order');
    // create order and return the order id.
    res.send('OK');
});

/** 
 * Update an existing order with more options.
*/
router.put('/:id', (req, res) => {
    winston.info('PUT /api/order/:id');
    res.send('OK');
});

/**
 * Delete an exisitng order by given id.
 */
router.delete('/:id', (req, res) => {
    winston.info('DELETE /api/order/:id');
    res.send('OK');
});

module.exports = router;

