import Joi from 'joi';

import users from './../data/users';

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
    req.setTimeout(200);
}

// login user
exports.LoginUser = (req, res, next) => {
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
    req.setTimeout(200);
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