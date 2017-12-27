const express = require('express');
const winston = require('winston');
const _ = require('lodash');
const router = express.Router();

const Customer = require('../model/Customer');
const Validator = require('../util/Validator');

/**
 * Fetch customer by customer id.
 * 
 * This function demonestrate how to use the async behaviour of the 
 * db operation in express router.
 * Note the async key word for the middelware callback function.
 * And use of await in for the Customer.get() function which return a Promise.
 */
router.get('/:_id', async (req, res) => {
    winston.info('GET /api/customer/:_id');
    let errorList = Validator.validateExistance(req.params._id);
    if (!_.isEmpty(errorList)) {
        res.status(400).send(errorList);
    } else {
        try {
            let customer  = await Customer.get(req.params._id);
            if (customer) {
                res.status(200).json(customer);
            } else {
                res.status(404).send({error: `Customer not found for given id : ${req.params._id}`});
            }
        } catch (err) {
            winston.error(`Error occured while fetching the user ${err.stack}`);
            res.status(500).send({error: err.message});
        }
    }
});

/**
 * Create a customer record.
 */
router.post('/', async (req, res) => {
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
            let id = await Customer.create(name, email, mobnum, paym, password);
            winston.info(`id : ${id}`);
            res.status(200).send({_id: id});
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
