// Joi, validation helper
import Joi from 'joi';

// import json data
import parcels from './../data/parcels';
import locations from './../data/locations';

import pool from './../db/config';

// get all parcels orders
exports.findAll = (req, res, next) =>{ 
    pool.query('SELECT * from parcels').then(response =>{
        res.status(200).json({
            parcels: response.rows
        });
    }).catch(err =>{
        console.log(err)
    });
};
// get one order
exports.findOne = (req, res, next) =>{ 
    
    const id = parseInt(req.params.id); 

    pool.query(`SELECT * from parcels  where id = ${id}`).then(response =>{
        res.status(200).json({
            parcel: response.rows
        });
    }).catch(err =>{
        console.log(err)
    });    
};

//cancel one order
exports.cancelOne = (req, res, next) => {

    const id = parseInt(req.params.id); 
    pool.query(`UPDATE parcels SET state = 'cancel'  where id = ${id}`).then(response =>{
        res.status(200).json({
            message:"Parcel order cancelled successully"
        });
    }).catch(err =>{
        console.log(err)
    });  
}
// cancel parcel order
exports.create = (req, res, next) =>{
    const parcel = {
        id: req.body.id,
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
    // aid of pool to insert data into db
    pool.query('INSERT INTO parcels(id, id_postman,  title, description, weight, state, pickup, dropoff, distance, created_time, updated_time) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
    [
        parcel.id, 
        parcel.id_client,
        parcel.id_postman,
        parcel.title,
        parcel.description,
        parcel.weight,
        parcel.state,
        parcel.pickup,
        parcel.dropoff,
        parcel.distance,
        parcel.created_time
    ])
    .then(res =>{
        res.status(200).send({
            message: "Record successfully inserted"
        });
    }).catch(err =>{
        console.log("unable");
    }); 
    req.setTimeout(2000);
    // parcels.push(parcel);
    // res.send(parcel);
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