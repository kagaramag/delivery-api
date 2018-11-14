const express = require('express');
const Joi = require("joi");
const router = express.Router();

const parcels = require('./../../data/parcels');
const users = require('./../../data/users');

// /GET parcels by user id
router.get('/:id/parcels', (req, res) => {
    const id = req.params.id;
    const result = parcels.filter(c => c.id_client == id);
    if(result.id_client === id){
        return result
    }
    res.status(200).send({
        parcels:result
    });
});

// GET list of all users
router.get('/', (req, res, next) =>{ 
    res.status(200).send({
        users: users
    });
});

//GET user details
router.get('/:id', (req, res, next) =>{
    const id = parseInt(req.params.id);    
    users.map((user) => {
        if(user.id === id){
            return res.status(200).send({
                user:user
            });
        }
    });
    req.setTimeout(500);
});


//POST new parcel
router.post('/', (req, res, next) =>{
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
});

// make a user inactive
router.put('/:id/inactive', (req,res) => {
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
});

// make a user active
router.put('/:id/active', (req,res) => {
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
});

// update user profile info
// for now, i only update the name of the user
router.put('/:id/update', (req,res) => {
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
});
// update user password
router.put('/:id/reset-password', (req,res) => {
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
    // update password
    user.password = req.body.password;
    // return the updated user
    res.send(user);
});


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

module.exports = router;