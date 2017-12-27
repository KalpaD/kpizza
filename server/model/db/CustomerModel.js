const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var customerSchema = new Schema({
    name: String,
    email: String,
    mobilenum: String,
    paymentMethod: String,
    password:String
});

var CustomerModel = mongoose.model('Customer', customerSchema);

module.exports = CustomerModel;
