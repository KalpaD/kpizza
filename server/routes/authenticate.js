const express = require('express');
const winston = require('winston');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const router = express.Router();

var config = require('../conf');
const Customer = require('../model/Customer');

/**
 * Login customer. 
 */
router.post('/', async (req, res) => {
    winston.info('POST /api/authenticate/');
    // validate the intput params.
    let errorList = Validator.validateAuthReq(req.body);
    if (!_.isEmpty(errorList)) {
        res.status(400).send(errorList);
    } else {
        try {
            // fetch the customer from db and return.
           let customer  = await Customer.getByEmail(req.body.email);
           if (customer) {
               // found the customer , check the passowrd.
               // TODO improve this to have hashed password.
               if (customer.password == req.body.password) {
                    // found the customer, let's create the JWT
                    const payload = {
                        _id: customer._id,
                        email: customer.email,
                        name: customer.name,
                        mobnum: customer.mobilenum,
                        paym: customer.paymentMethod,
                        iss:'kpizza'
                    };
                    var token = jwt.sign(payload, config.getJWTSecret(), {
                        expiresIn: 60 * 5 // 5 min exp time
                    });

                    res.status(200).json({
                        token: token
                    });
                } else {
                    res.status(401).json({error: 'Authentication failed. Invalid credentials.'}); 
                }
           } else {
                res.status(401).json({error: 'Authentication failed. User not found.'});
           }
        } catch (err) {
           winston.error(`Error occured while authenticating the user ${err.stack}`);
           res.status(500).send({error: err.message});
        }
    }
});


module.exports = router;