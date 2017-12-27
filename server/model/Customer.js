const winston = require('winston');
const CustomerModel = require('../model/db/CustomerModel');


const Customer = {

    /** 
    * Create a customr record on db with the given parameters.
    *
    * @param {String} name - The name of the customer.
    * @param {String} email - The email of the customer.
    * @param {String} mobilenum - The mobile number of the customer.
    * @param {String} mobilenum - The payment method of the customer.
    */
    create: (name, email, mobilenum, paymentMethod, password) => {
        let newCustomer = CustomerModel({
            name: name,
            email: email,
            mobilenum: mobilenum,
            paymentMethod: paymentMethod,
            password:password
          });
        
          newCustomer.save((err, customer) => {
            if (err) throw err;
        });

        return newCustomer.save()
                .then( (customer) => {
                    // return the newly created customer id, if everything is ok.
                    return customer._id;
                })
                .catch( (err) => {
                    throw err;
                });
    },

    /**
     * Get customer from the db by given id.
     * 
     * @param {String} id - The id of the customer record.
     */
    get: function (id) {
        return CustomerModel.find({_id: id})
                .exec()
                .then( (customer) => {
                    return customer;
                })
                .catch( (err) => {
                    throw err;
                });
        // TODO explain this in a the blog
        /*CustomerModel.findById({_id: id}, (err, customer) => {
            if (err) throw err;
            winston.info(`Fetched customer : ${customer}`);
            return customer;
        });*/
    }
}

module.exports = Customer;