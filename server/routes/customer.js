const express = require('express');
const winston = require('winston');
const _ = require('lodash');
const router = express.Router();

const Customer = require('../model/Customer');
const Validator = require('../util/Validator');

/**
 * Fetch customer by customer id and return a order.
 */
router.get('/:id', (req, res) => {
    winston.info('GET /api/customer/:id');
    res.send('OK');
});

/**
 * Create a customer 
 */
router.post('/', (req, res) => {
    winston.info('POST /api/customer/');
    let name = req.body.name;
    let email = req.body.email;
    let mobnum = req.body.mobilenum;
    let paym = req.body.paymentMethod;
    let password = req.body.password;

    // validate the intput params.
    let errorList = Validator.validateCreateCustomerReq(req.body);
    if (!_.isEmpty(errorList)) {
        res.status(400).send(errorList);
    } else {
        try {
            // create the new user in db.
            Customer.create(name, email, mobnum, paym, password);
            res.status(200).send({message: 'User Successfully Created'});
        } catch (err) {
            winston.error(`Error occured while creating the user ${err.stack}`);
            res.status(500).send({error: err.message});
        }
    }
});

/**
 * Update customer details. 
 */
router.put('/:id', (req, res) => {
    winston.info('POST /api/customer/:id');
    
    res.send('OK');
});

module.exports = router;
