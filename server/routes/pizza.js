const express = require('express');
const winston = require('winston');
const _ = require('lodash');
const router = express.Router();

const Pizza = require('../model/Pizza');

/**
 * Fetch all pizza.
 */
router.get('/', async (req, res) => {
    winston.info('GET /api/pizza');
    try {
        let pizzaArray = await Pizza.get();
        if (pizzaArray) {
            res.status(200).json(pizzaArray);
        } else {
            res.status(404).send({error: `Pizzas not found`});
        }
    } catch (err) {
        winston.error(`Error occured while fetching the pizza list`);
        res.status(500).send({error: err.message});
    }
});

/**
 * Create a customer record.
 */
router.post('/', async (req, res) => {
    winston.info('POST /api/pizza/');
    let type = req.body.type;
    let description = req.body.description;
    let baseType = req.body.baseType;
    let topings = req.body.topings;

    // validate the intput params.
    let errorList = Validator.validatePizzaReq(req.body);
    if (!_.isEmpty(errorList)) {
        res.status(400).send(errorList);
    } else {
        try {
            // create the new user in db.
            let id = await Pizza.create(type, description, baseType, topings);
            winston.info(`id : ${id}`);
            res.status(200).send({_id: id});
        } catch (err) {
            winston.error(`Error occured while creating the user ${err.stack}`);
            res.status(500).send({error: err.message});
        }
    }
});

module.exports = router;

