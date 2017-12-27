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

Validator = {

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
    }

}

module.exports = Validator;