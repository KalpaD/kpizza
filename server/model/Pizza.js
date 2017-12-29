const winston = require('winston');
const PizzaModel = require('../model/db/PizzaModel');


const Pizza = {
    
   /** 
    * Create a pizza record on db with the given parameters.
    *
    * @param {String} type - The type of the pizza.
    * @param {String} description - The description of the pizza.
    * @param {String} baseType - The baseType of the pizza.
    * @param {String} topings - The topings of the pizza.
    */
    create: (type, description, baseType, topings) => {
        let newPizza = PizzaModel({
            type: type,
            description: description,
            baseType: baseType,
            topings: topings
          });

        return newPizza.save()
                .then( (pizza) => {
                    // return the newly created pizza id, if everything is ok.
                    return pizza._id;
                })
                .catch( (err) => {
                    throw err;
                });
    },

    /**
     * Get all pizzas from the db.
     */
    get: () => {
        return PizzaModel.find({})
                .exec()
                .then( (pizzaList) => {
                    return pizzaList;
                })
                .catch( (err) => {
                    throw err;
                });
    }
}

module.exports = Pizza;