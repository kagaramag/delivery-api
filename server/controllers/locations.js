// Joi, validation helper
import Joi from 'joi';

import pool from './../db/config';
import moment from 'moment';

import jwt from 'jsonwebtoken';
require('dotenv').config();

// cancel parcel order
const create = (req, response, next) =>{   
    jwt.verify(req.token, process.env.SECRET, function(err, data) {
        if (err) {
            res.send({
                message: "Login first to perform this action."
            });
        } else {
            // if logged in
            const {error} = validateLocation(req.body);
            if(error){
                response.status(400).send(error.details[0].message);
                return;
            }
            const location = {
                id_parcel: req.body.id_parcel,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                message: req.body.message,
                created_time:moment().format("YYYY-MM-DD HH:mm")
            }
            const text = 'INSERT INTO locations( id_parcel, latitude, longitude, message,created_time) VALUES($1, $2, $3, $4, $5) RETURNING *'
            const values = [location.id_parcel, location.latitude, location.longitude, location.message, location.created_time];

            // // callback
            pool.query(text, values, (err, res) => {
                if (err) {
                    response.send({
                        message: err.stack
                    });
                } else {
                    response.send({
                        message: `Locations: "${location.title}" has been registered successfully!`
                    });
                }
            });
        }
    });
   
    req.setTimeout(10000);
};

// // create destination of a parcel
// const destination = (req, res, next) =>{
//     const id = req.params.id;
//     const {error} = validateLocation(req.body);    
//     if(error){
//         res.status(400).send(error.details[0].message);
//         return;
//     }   
//     const location = {
//         id: locations.length + 1,
//         latitude: req.body.latitude,
//         longitude: req.body.longitude,
//         id_parcel: id,
//         message: req.body.message,
//         created_time: req.body.created_time
//     };     
    
//     locations.push(location);
//     res.send(location);

// };


// // verify location
function validateLocation(location){
    const schema = {
        latitude: Joi.string(),
        longitude: Joi.string(),
        id_parcel: Joi.number(),
        message: Joi.string().min(2).max(300)
    };
    return Joi.validate(location, schema);
}

export default {create}