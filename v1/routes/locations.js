const express = require('express');
const Joi = require("joi");
const router = express.Router();

const locations = require('./../../data/locations');

// GET list of all locations
router.get('/', (req, res, next) =>{ 
    res.status(200).send({
        locations: locations
    });
    req.setTimeout(500);
});

// // validating location
// function validateLocation(location){
//     // defining schema
//     const schema = {
//         id: Joi.number().required(),
//         latitude: Joi.string().required(),
//         longitude: Joi.string().required(),
//         id_parcel: Joi.number().required(),
//         message: Joi.string().min(3).max(60).required(),
//         created_time: Joi.date(),
//     };
//     return Joi.validate(location, schema);
// }

module.exports = router;