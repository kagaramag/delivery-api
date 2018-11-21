// Joi, validation helper
import Joi from 'joi';

// import json data
import parcels from './../data/parcels';
import users from './../data/users';


//postgre
const pg = require('pg');
const config = {
    user: 'postgres',
    database: 'sendit',
    password: '123123',
    port: 5432
}
const pool = new pg.Pool(config);

exports.findAllUsersInPostgre = (req, res,) => {
    pool.connect(function(err,client,done) {
       if(err){
           console.log("not able to get connection "+ err);
           res.status(400).send(err);
       } 
       client.query('SELECT * FROM users',function(err,result) {
           done(); // closing the connection;
           if(err){
               console.log(err);
               res.status(400).send(err);
           }
           res.status(200).send(result.rows);
       });
    });
    res.setTimeout(200);
};

// /GET parcels by user id
 exports.findParcelsByUserId= (req, res) => {
    const id = req.params.id;
    const result = parcels.filter(c => c.id_client == id);
    if(result.id_client === id){
        return result
    }
    res.status(200).send({
        parcels:result
    });
};
// find all users
exports.findAllUsers = (req, res, next) => {
    res.status(200).send({
        users: users
    });
}
// find users details
exports.findUserDetails = (req, res, next) => {
    const id = parseInt(req.params.id);    
    users.map((user) => {
        if(user.id === id){
            return res.status(200).send({
                user:user
            });
        }
    });
    req.setTimeout(500);
}

// create new user
exports.createNewUser = (req, res, next) => {
    // defining schema
    const {error} = validateUser(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        state: 'active',
        role: 'client',
        created_time: req.body.created_time
    };
    users.push(user);
    res.send(user);
    
    res.send({
        message:user
    });
    req.setTimeout(200);
}

// make a user inactive
exports.makeUserInactive = (req, res, next) => {
        // look up user
        const user = users.find(p => p.id  === parseInt(req.params.id));
        if(user.state === 'active'){
            // if not exist, retur 404
            if(!user) res.status(404).send("Parcel order with given id was not found");
            // validate, if invalid, return 400 -bad request
            const { error } = validateUser(req.body);
            
            if(error){
                res.status(400).send(error.details[0].message);
                return;
            }
            // update user
            user.state = 'inactive';
            // return the updated user
            res.send(user);
        }else{
            res.send({
                message: "'" +user.name + "' is already inactive"
            });
        }
}

// make user active

exports.makeUserActive = (req,res,next) => {
    // look up user
    const user = users.find(p => p.id  === parseInt(req.params.id));
    if(user.state === 'inactive'){
        // if not exist, retur 404
        if(!user) res.status(404).send("Parcel order with given id was not found");
        // validate, if invalid, return 400 -bad request
        const { error } = validateUser(req.body);
        
        if(error){
            res.status(400).send(error.details[0].message);
            return;
        }
        // update user
        user.state = 'active';
        // return the updated user
        res.send(user);
    }else{
        res.send({
            message: "'" +user.name + "' is already inactive"
        });
    }
}

// validating user
function validateUser(user){
    // defining schema
    const schema = {
        id: Joi.number().required(),
        name: Joi.string().max(30).min(3).required(),
        email: Joi.string().email().min(6).max(60).required(),
        password: Joi.string().min(4).max(23).required(),
        state: Joi.string().required(),
        role: Joi.string().required(),
        created_time: Joi.date(),
    };
    return Joi.validate(user, schema);
}