import Joi from 'joi';

// import users from './../data/users';

import pool from './../db/config';

// manage auth
import jwt from 'jsonwebtoken';
import Auth from './../db/jwt';
// IMPORT SECRET DATA
require('dotenv').config();
const bcrypt = require('bcrypt');

// create new user
const createNewUser = (req, response, next) => {
    
    const saltRounds = 10;
    const password = req.body.password;
    const hash = bcrypt.hashSync(password, saltRounds);
    try{      
         
        const user = {
            name: req.body.name,
            email: req.body.email,
            password:hash,
            state:'active'
        };
        const text = 'INSERT INTO users( name, email, password, state) VALUES($1, $2, $3, $4) RETURNING *'
        const values = [user.name, user.email, user.password, user.state];
        // callback
        pool.query(text, values, (err, res) => {
            if (err) {
                response.send({
                    message: err.stack
                });
            } else {
                response.send({
                    message: `Account with ${user.email} has been registered successfully!`
                });
            }
        });
    }catch(err){
        response.send({
            message: `Whoochs, Error occured. Try again later`
        });
    }
   
    req.setTimeout(10000);
}

// login user
const loginUser = (req, res, next) => {
    console.log('route is valid')
    // insert code here to actually authenticate, or fake it
    const user = { 
        email: req.body.email,
        password: req.body.password
     }
     console.log(user);
    // pool.query(`SELECT * from users where email = ${user.email} and password = ${user.password}`).then(response =>{
    //     res.status(200).json({
    //         user: response.rows
    //     });
    // }).catch(err =>{
    //     console.log(err)
    // });
    
    // const user = { id: 3 };
    // // then return a token, secret key should be an env variable
    // const token = jwt.sign({ user: user.id }, process.env.SECRET);
    // res.json({
    //   message: 'Authenticated! Use this token in the "Authorization" header',
    //   token: token
    // });
    // res.send({
    //     message:"Failure to authicate you!"
    // });
}

// validating user
// function validateUser(user){
//     // defining schema
//     const schema = {
//         name: Joi.string().max(30).min(3).required(),
//         email: Joi.string().email().min(6).max(60).required(),
//         password: Joi.string().min(4).max(23).required(),
//         state: Joi.string().required(),
//         role: Joi.string().required(),
//         created_time: Joi.date(),
//     };
//     return Joi.validate(user, schema);
// }

export default { createNewUser, loginUser }