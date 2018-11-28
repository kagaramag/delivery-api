// Joi, validation helper
import Joi from 'joi';

// import json data
import parcels from './../data/parcels';
import locations from './../data/locations';

import pool from './../db/config';

import jwt from 'jsonwebtoken';

// get all parcels orders
const findAll = (req, res, next) =>{ 
    jwt.verify(req.token, process.env.SECRET, function(err, data) {
      if (err) {
        res.sendStatus(403);
      } else {          
        pool.query('SELECT * from parcels').then(response =>{
            res.status(200).json({
                parcels: response.rows
            });
        }).catch(err =>{
            console.log(err)
        });
      }
    });
};
// get one order
const findOne = (req, res, next) =>{
    const id = parseInt(req.params.id); 

    pool.query(`SELECT * from parcels  where id = ${id}`).then(response =>{
        if(response.rows[0]){
            res.status(200).json({
                parcel: response.rows[0]
            });
        }else{
            res.json({
                message: `Whoochs, Parcel with ${id} doesn't exist`
            });
        }
    }).catch(err =>{
        console.log(err)
    });    
};
// get location by parcels
const findLocationByParcels = (req, res, next) =>{
    const id = parseInt(req.params.id); 

        pool.query(`SELECT * from locations  where id_parcel = ${id}`).then(response =>{
        if(response.rows[0]){
            res.status(200).json({
                parcel: response.rows[0]
            });
        }else{
            res.json({
                message: `Whoochs, Parcel with ${id} doesn't exist`
            });
        }
    }).catch(err =>{
        console.log(err)
    });    
};

//cancel one order
const cancelOne = (req, res, next) => {
    const id = parseInt(req.params.id); 
    // check the status
    pool.query(`SELECT state from parcels  where id = ${id}`).then(response =>{
        // if parcel exist and has 'created' as state
        console.log(response.rows[0]['state']);
        if(response.rows[0] && response.rows[0]['state'] === 'created'){ 
            // proceed to updating parcel order to canceled       
               pool.query(`UPDATE parcels SET state = 'canceled'  where id = ${id}`).then(response =>{
                res.status(200).json({
                    message:"Parcel order cancelled successully"
                });
            }).catch(err =>{
                res.json({
                    error: err
                });
            }); 
        }else if(response.rows[0]['state'] === 'canceled'){
            res.json({
                message: `Whoochs, Parcel with ${id} has been already canceled`
            });
        }else{
            res.json({
                message: `Whoochs, Parcel with ${id} doesn't exist`
            });
        }
    }).catch(err =>{
        res.json({
            error: err
        });
    });    

 
}
// cancel parcel order
const create = (req, response, next) =>{   
    // console.log("hjanp");
    const {error} = validateParcel(req.body);

    if(error){
        response.status(400).send(error.details[0].message);
        return;
    }
    const parcel = {
        id_client: req.body.id_client,
        title: req.body.title,
        description: req.body.description,
        weight: req.body.weight,
        state: req.body.state,
        pickup: req.body.pickup,
        dropoff: req.body.dropoff,
        distance: req.body.distance
    }

    const text = 'INSERT INTO parcels( id_client, title, description, weight, state, pickup, dropoff, distance) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *'
    const values = [parcel.id_client, parcel.title, parcel.description, parcel.weight, parcel.state, parcel.pickup,  parcel.dropoff,  parcel.distance];

    
    // // callback
    pool.query(text, values, (err, res) => {
        if (err) {
            response.send({
                message: err.stack
            });
        } else {
            response.send({
                message: `Parcel: "${parcel.title}" has been registered successfully!`
            });
        }
    });
   
    req.setTimeout(10000);
};

// create destination of a parcel
const destination = (req, res, next) =>{
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
const changeStatus = (req, res, next) => {
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
        id_client: Joi.number(),
        title: Joi.string().min(3).max(120).required(),
        description: Joi.string().min(10).max(300),
        weight: Joi.number(),
        state: Joi.string().required(),
        pickup: Joi.string().required(),
        dropoff: Joi.string().required(),
        distance: Joi.number()
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

export default {findAll, findOne, create, cancelOne, destination, changeStatus, findLocationByParcels}