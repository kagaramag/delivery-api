// Joi, validation helper
import Joi from 'joi';

// import json data
import parcels from './../data/parcels';
import locations from './../data/locations';

import pool from './../db/config';

import jwt from 'jsonwebtoken';
require('dotenv').config();


// get all parcels orders
const findAll = (req, res, next) =>{ 
    jwt.verify(req.token, process.env.SECRET, function(err, data) {
      if (err) {
        res.sendStatus(403);
      } else {          
        pool.query('SELECT * from parcels').then(response =>{
            res.status(200).json({
                parcels:"rest"
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
    // check auth
    jwt.verify(req.token, process.env.SECRET, function(err, data) {
        if (err) {
            res.send({
                message: "Login first to perform this action."
            });
        } else {
            const id = parseInt(req.params.id); 
                console.log(id);
                pool.query(`SELECT * from locations  where id_parcel = $1`, [id]).then(response =>{
                if(response.rows[0]){
                    res.status(200).json({
                        parcel: response.rows[0]
                    });
                }else{
                    res.json({
                        message: `Whoochs, No location found on parcel order you specified`
                    });
                }
            }).catch(err =>{
                console.log(err)
            }); 
        }   
    });    
};

//cancel one order
const cancelOne = (req, res, next) => {
    // check auth
    jwt.verify(req.token, process.env.SECRET, function(err, data) {
        if (err) {
            res.send({
                message: "Login first to perform this action."
            });
        } else {   
            // if you are auth 
            const id = parseInt(req.params.id); 
            // check the status
            pool.query(`SELECT state from parcels  where id = $1`, [id]).then(response =>{
                const state = response.rows[0].state.trim();
                // if parcel exist and has 'created' as state 
                if(state.length == 7){ 
                    // proceed to updating parcel order to canceled       
                    pool.query(`UPDATE parcels SET state = 'canceled'  where id = ${id}`).then(response =>{
                        res.status(200).json({
                            message:"Parcel order cancelled successully"
                        });
                    }).catch(err =>{
                        res.json({
                            error: err.stack
                        });
                    }); 
                }else if(state.length == 8){
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
    });
}
// cancel parcel order
const create = (req, response, next) =>{  
    
    const {error} = validateParcel(req.body);

    if(error){
        response.status(400).send(error.details[0].message);
        return;
    }
    jwt.verify(req.token, process.env.SECRET, function(err, data) {
        if (err) {
            res.send({
                message: "Login first to perform this action."
            });
        } else {          
            const parcel = {
                title: req.body.title,
                description: req.body.description,
                weight: req.body.weight,
                state: req.body.state,
                id_client: req.body.id_client,
                pickup: req.body.pickup,
                dropoff: req.body.dropoff,
                distance: req.body.distance
            }
        
            const text = 'INSERT INTO parcels(title, description, weight, state, pickup, dropoff, distance) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
            const values = [parcel.title, parcel.description, parcel.weight, parcel.state, parcel.pickup,  parcel.dropoff,  parcel.distance];
        
            // promise
            pool.query(text, values)
            .then(res => {
                response.send(res.rows[0])
            })
            .catch(e => console.error(e.stack)); 
        }
      });    
      req.setTimeout(30000);
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
        title: Joi.string().min(3).max(120).required(),
        description: Joi.string().min(10).max(300),
        weight: Joi.number(),
        id_client: Joi.number(),
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