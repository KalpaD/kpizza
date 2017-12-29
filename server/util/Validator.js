const Joi = require('joi');
const _ = require('lodash');
const winston = require('winston');

const customerSchema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    email: Joi.string().email().required(),
    mobilenum: Joi.string().min(9).required(),
    paymentMethod: Joi.string().required()
});

const isEmptyScheme = Joi.string().min(1).max(30).required();

const authenticateScheme = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(),
});

let self = module.exports = Validator = {

    /**
     * Validate the create customr request body parameters for the pre-set
     * body schema.
     * 
     * @param {Object} body - The create customer request body.
     */
    validateCreateCustomerReq: (body) => {
        let errorList = [];
        let validateResult = Joi.validate(body, customerSchema);
        if (validateResult.error !== null) {
            _.forEach(validateResult.error.details, function(detail) {
                winston.info(`detail.message ${detail.message}`);
                errorList.push(detail.message);
            });
            winston.info(`errorList ${errorList}`);
            return errorList;
        } else {
            return errorList;
        }
    },

    validateExistance: (value) => {
        let validateResult = Joi.validate(value, isEmptyScheme);
        return self.collectError(validateResult);
    },

    validateAuthReq: (body) => {
        let validateResult = Joi.validate(body, authenticateScheme);
        return self.collectError(validateResult);
    },

    collectError: (validateResult) => {
        let errorList = [];
        if (validateResult.error !== null) {
            _.forEach(validateResult.error.details, function(detail) {
                winston.info(`detail.message ${detail.message}`);
                errorList.push(detail.message);
            });
            winston.info(`errorList ${errorList}`);
            return errorList;
        } else {
            return errorList;
        }
    }
}

