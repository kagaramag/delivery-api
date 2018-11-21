// Joi, validation helper
import Joi from 'joi';

// import json data
import parcels from './../data/parcels';

// get all parcels orders
exports.findAll = (req, res, next) =>{ 
    res.status(200).send({
        parcels: parcels
    });
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
    // if not exist, retur 404
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
    
    res.send({
        message:parcels
    })
};

// validating one parcel inputs
// validating parcel
function validateParcel(parcel){
    const schema = {
        id: Joi.number().required(),
        id_client: Joi.number(),
        id_postman: Joi.number(),
        title: Joi.string().min(3).max(60).required(),
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
