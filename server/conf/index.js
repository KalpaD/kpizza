var configValues = require('./config');

module.exports = {
    getDBConString: function() {
        return 'mongodb://' + configValues.username + ':' + configValues.password +'@localhost:27017/kpizza_db';
    },

    getJWTSecret: function() {
        return configValues.secret;
    }
}