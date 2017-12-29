const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var orderSchema = new Schema({
    type: String,
    time: Date,
    address: String,
    customerId: String,
    baseType: String,
    topings: [String]
});

var OrderModel = mongoose.model('Pizza', orderSchema);

module.exports = OrderModel;
