// Joi, validation helper
import Joi from 'joi';

// import json data
import parcels from './../data/parcels';
import locations from './../data/locations';

// get all parcels orders
exports.findAll = (req, res, next) =>{ 
    res.status(200).send({
        parcels: parcels
    });
    req.setTimeout(500);
};
// get one order
exports.findOne = (req, res, next) =>{ 
    const id = parseInt(req.params.id);    
    parcels.map((parcel) => {
        if(parcel.id === id){
            return res.status(200).send({
                parcel:parcel
            });
        }
    });
    req.setTimeout(500);
};

//cancel one order
exports.cancelOne = (req, res, next) => {
        // look up parcel
    // if not exist, return 404
    const parcel = parcels.find(p => p.id  === parseInt(req.params.id));
    if(!parcel) res.status(404).send("Parcel order with given id was not found");

    // validate, if invalid, return 400 -bad request
    // defining schema

    const { error } = validateParcel(req.body);
    
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    // update parcel
    parcel.state = 'cancel';
    // return the updated parcel
    res.send(parcel);
    req.setTimeout(500);
}

// cancel parcel order
exports.create = (req, res, next) =>{
    // defining schema
    const {error} = validateParcel(req.body);
    
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const parcel = {
        id: parcels.length + 1,
        id_client: req.body.id_client,
        id_postman: req.body.id_postman,
        title: req.body.title,
        description: req.body.description,
        weight: req.body.weight,
        state: 'created',
        pickup: req.body.pickup,
        dropoff: req.body.dropoff,
        distance: req.body.distance,
        created_time: req.body.created_time,
        modified_at: req.body.modified_at
    };
    parcels.push(parcel);
    res.send(parcel);
};

// create destination of a parcel
exports.destination = (req, res, next) =>{
    const id = req.params.id;
    const {error} = validateLocation(req.body);    
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }   
    const location = {
        id: locations.length + 1,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        id_parcel: id,
        message: req.body.message,
        created_time: req.body.created_time
    };     
    
    locations.push(location);
    res.send(location);

};


//change status
exports.changeStatus = (req, res, next) => {
    // look up parcel

    const parcel = parcels.find(p => p.id  === parseInt(req.params.id));
    if(!parcel) res.status(404).send("Parcel order with given id was not found");

    const { error } = validateParcel(parcel);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    // update parcel
    parcel.state = 'in_transit';
    // return the updated parcel
    res.send(parcel);
    req.setTimeout(500);
}


// validating one parcel inputs
// validating parcel
function validateParcel(parcel){
    const schema = {
        id: Joi.number().required(),
        id_client: Joi.number(),
        id_postman: Joi.number(),
        title: Joi.string().min(3).max(120).required(),
        description: Joi.string().min(10).max(300),
        weight: Joi.number(),
        state: Joi.string().required(),
        pickup: Joi.string().required(),
        dropoff: Joi.string().required(),
        distance: Joi.number(),
        created_time: Joi.date(),
        modified_at: Joi.date(),
    };
    return Joi.validate(parcel, schema);
}

// verify location
function validateLocation(parcel){
    const schema = {
        id: Joi.number().required(),
        latitude: Joi.string(),
        longitude: Joi.string(),
        id_parcel: Joi.number(),
        message: Joi.string().min(2).max(300),
        created_time: Joi.date()
    };
    return Joi.validate(parcel, schema);
}