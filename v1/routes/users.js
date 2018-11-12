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

// post user
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

// validating user
function validateUser(user){
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