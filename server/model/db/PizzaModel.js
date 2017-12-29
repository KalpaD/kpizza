const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var pizzaSchema = new Schema({
    type: String,
    description: String,
    baseType: String,
    topings: [String]
});

var PizzaModel = mongoose.model('Pizza', pizzaSchema);

module.exports = PizzaModel;
