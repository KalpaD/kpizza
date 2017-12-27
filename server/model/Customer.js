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

          newCustomer.save((err) => {
            if(err) throw err;
        });
    }
}

module.exports = Customer;