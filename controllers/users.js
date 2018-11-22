// Joi, validation helper
import Joi from 'joi';

// import json data
const knex = require('./../db/knex');

// /GET parcels by user id
 exports.findParcelsByUserId= (req, res) => {
    const id = parseInt(req.params.id);  
    knex
    .raw(`select * from parcels where id_client = ${id}`)
    .then((user) => {
        res.status(200).send(user.rows);
    })
    req.setTimeout(500);
};
// find all users
exports.findAllUsers = (req, res, next) => {
    knex
    .raw('select * from users')
    .then((users) => {
        res.status(200).send(users.rows);
    })
}
// find users details
exports.findUserDetails = (req, res, next) => {
    const id = parseInt(req.params.id);  
    knex
    .raw(`select * from users where id = ${id}`)
    .then((user) => {
        res.status(200).send(user.rows);
    })
    req.setTimeout(500);
}

// create new user
exports.createNewUser = (req, res) => {
    knex('users')
    .insert({
        id:19,
        name: "yes",
        email: 'k@gma.com',
        password: 4521,
        state:'active'
    })
    .then(() => {
        res.status(200).send({
            message:'user registered successfully'
        });
    })


    // defining schema
    // const {error} = validateUser(req.body);

    // if(error){
    //     res.status(400).send(error.details[0].message);
    //     return;
    // }
    // const user = {
    //     id: users.length + 1,
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     state: 'active',
    //     role: 'client',
    //     created_time: req.body.created_time
    // };
    // users.push(user);
    // res.send(user);
    
    // res.send({
    //     message:user
    // });
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

exports.UserUpdate = (req,res,next) => {
    // look up user
    const user = users.find(p => p.id  === parseInt(req.params.id));
    // if not exist, retur 404
    if(!user) res.status(404).send("Parcel order with given id was not found");
    // validate, if invalid, return 400 -bad request
    const { error } = validateUser(req.body);
    
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    // update user
    user.name = req.body.name;
    // return the updated user
    res.send(user);
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