const express = require('express');
const winston = require('winston');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const router = express.Router();

var config = require('../conf');


router.use( (req, res, next) => {

    let jwToken = req.headers['jwt_token'];

    if (jwToken) {
        // verify async
        jwt.verify(jwToken, config.getJWTSecret(), (err, decodedToken) => {
            if (err) {
                winston.info(`Authentication failed with error message : ${err}`);
                return res.status(401).json({error: 'Authentication failed.'});
            } else {
                winston.info(`Authentication was successful for ${decodedToken.email}`);
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(403)
        .json({error: 'A valid access token should be present to access the APIs.'});
    }
});

module.exports = router;