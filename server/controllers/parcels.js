// Joi, validation helper
import Joi from 'joi';

// import json data
import parcels from './../data/parcels';
import locations from './../data/locations';

import pool from './../db/config';

import jwt from 'jsonwebtoken';
require('dotenv').config();

import authVerify from './../../helpers/verifyAuth'

// get all parcels orders
const findAll = (req, res) =>{ 
    if(!authVerify.isTokenExist(req.token)) return res.send({message: "Sorry, Error occured while processing your token"})
    pool.query('SELECT * from parcels').then(response =>{
        res.status(200).json({
            parcels:response.rows
        });
    }).catch(err =>{
        console.log(err)
    });
};
// get one order
const findOne = (req, res) =>{
    const id = parseInt(req.params.id); 
    
    if(!authVerify.isTokenExist(req.token)) return res.send({message: "Sorry, Error occured while processing your token"}) 

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
        res.json({message:err})
    });    
};
// get location by parcels
const findLocationByParcels = (req, res) =>{
    // check auth
    if(!authVerify.isTokenExist(req.token)) return res.send({message: "Sorry, Error occured while processing your token"})
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
};

//cancel one order
const cancelOne = (req, res) => {
    // check auth
    if(!authVerify.isTokenExist(req.token)) return res.send({message: "Sorry, Error occured while processing your token"})  
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
// cancel parcel order
const create = (req, response) =>{  
    const {error} = validateParcel(req.body);

    if(error){
        response.status(400).send(error.details[0].message);
        return;
    }   
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
    if(!authVerify.isTokenExist(req.token)) return res.send({message: "Sorry, Error occured while processing your token"})   
    const text = 'INSERT INTO parcels(title, description, weight, state, pickup, dropoff, distance, id_client) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *'
    const values = [parcel.title, parcel.description, parcel.weight, parcel.state, parcel.pickup,  parcel.dropoff,  parcel.distance, parcel.id_client];
    
    // promise
    pool.query(text, values)
    .then(res => {
        response.send({
            message:"Parcel created"
        })
    })
    .catch(e => console.error(e.stack)); 
          
      req.setTimeout(30000);
};

// create destination of a parcel
const destination = (req, res) =>{
    // get id
    const id = req.params.id;
    // varidate...
    const {error} = validateLocation(req.body);    
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }   
    
    if(!authVerify.isTokenExist(req.token)) return res.send({message: "Sorry, Error occured while processing your token"})

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
const changeStatus = (req, res) => {
    // check auth
    if(!authVerify.isTokenExist(req.token)) return res.send({message: "Sorry, Error occured while processing your token"})
    // if you are auth 
    const id = parseInt(req.params.id); 
    // check the status
    pool.query(`SELECT state from parcels  where id = $1`, [id]).then(response => {
        const state = response.rows[0].state.trim();
        // if parcel exist and has 'created' as state 
        if(state.length == 7){ 
            // proceed to updating parcel order to canceled       
            pool.query(`UPDATE parcels SET state = 'in_transit'  where id = ${id}`).then(response =>{
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


//change status
const changeDropOff = (req, res) => {
    if(!authVerify.isTokenExist(req.token)) return res.send({message: "Sorry, Error occured while processing your token"});
    res.send({
        message:"Change dropoff"
    })
    // // if you are auth 
    // const id = parseInt(req.params.id); 
    // if (req.headers && req.headers.authorization) {
    //     // var authorization = req.headers.authorization,
    //     //     decoded;
    //     // try {
    //     //     decoded = jwt.verify(authorization, process.env.SECRET);
    //     // } catch (e) {
    //     //     return res.status(401).send('unauthorized');
    //     // }
    //     var userId = authorization.id;
    //     console.log(userId);
    //     // Fetch the user by id 
    //     User.findOne({_id: userId}).then(function(user){
    //         // Do something with the user
    //         return res.send(200);
    //     });
    // }    
    // // check the status
    // pool.query(`SELECT state from parcels  where id = $1`, [id]).then(response => {
    //     const state = response.rows[0].state.trim();
    //     // if parcel exist and has 'created' as state 
    //     if(state.length == 7){ 
    //         // proceed to updating parcel order to canceled       
    //         pool.query(`UPDATE parcels SET state = 'in_transit'  where id = ${id}`).then(response =>{
    //             res.status(200).json({
    //                 message:"Parcel order cancelled successully"
    //             });
    //         }).catch(err =>{
    //             res.json({
    //                 error: err.stack
    //             });
    //         }); 
    //     }else if(state.length == 8){
    //         res.json({
    //             message: `Whoochs, Parcel with ${id} has been already canceled`
    //         });
    //     }else{
    //         res.json({
    //             message: `Whoochs, Parcel with ${id} doesn't exist`
    //         });
    //     }
    // }).catch(err =>{
    //     res.json({
    //         error: err
    //     });
    // }); 
}


// validating one parcel inputs
// validating parcel
function validateParcel(parcel){
    const schema = {
        title: Joi.string().required(),
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
function validateLocation(location){
    const schema = {
        id: Joi.number().required(),
        latitude: Joi.string(),
        longitude: Joi.string(),
        id_parcel: Joi.number(),
        message: Joi.string().min(2).max(300),
        created_time: Joi.date()
    };
    return Joi.validate(location, schema);
}

export default {findAll, findOne, create, cancelOne, destination, changeStatus, findLocationByParcels, changeDropOff}