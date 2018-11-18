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

//GET location details
router.get('/:id', (req, res, next) =>{
    const id = parseInt(req.params.id);    
    locations.map((location) => {
        if(location.id === id){
            return res.status(200).send({
                location:location
            });
        }
    });
    req.setTimeout(500);
});


//POST new location in parcel delivery order
router.post('/:id/parcel', (req, res, next) =>{
    // defining schema
    const {error} = validateLocation(req.body);
    
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const location = {
        id: locations.length + 1,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        id_parcel: req.body.id_parcel,
        message: req.body.message,
        created_time: req.body.created_time
    };
    locations.push(location);
    res.send(location);
    
    res.send({
        message:location
    });
});

// /GET location by parcel id
router.get('/:id/parcel', (req, res) => {

    // validating
    const {error} = validateLocation(req.body);
    // check if validated
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }   
    const id = req.params.id;

    const location = locations.filter(c => c.id_parcel == id);

    if(locations.id_client === id){
        return location
    }
    res.status(200).send({
        locations:location
    });    
});


// validating location
function validateLocation(location){
    // defining schema
    const schema = {
        id: Joi.number().required(),
        latitude: Joi.string().required(),
        longitude: Joi.string().required(),
        id_parcel: Joi.number().required(),
        message: Joi.string().min(3).max(60).required(),
        created_time: Joi.date(),
    };
    return Joi.validate(location, schema);
}

module.exports = router;