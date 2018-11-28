// Joi, validation helper
import Joi from 'joi';

import pool from './../db/config';

// // get all parcels orders
// const findAll = (req, res, next) =>{ 
//     pool.query('SELECT * from parcels').then(response =>{
//         res.status(200).json({
//             parcels: response.rows
//         });
//     }).catch(err =>{
//         console.log(err)
//     });
// };
// // get one order
// const findOne = (req, res, next) =>{
//     const id = parseInt(req.params.id); 

//     pool.query(`SELECT * from locations  where id_parcel = ${id}`).then(response =>{
//         if(response.rows[0]){
//             res.status(200).json({
//                 parcel: response.rows[0]
//             });
//         }else{
//             res.json({
//                 message: `Whoochs, Parcels with ${id} doesn't exist`
//             });
//         }
//     }).catch(err =>{
//         console.log(err)
//     });    
// };

// cancel parcel order
const create = (req, response, next) =>{   
    const {error} = validateLocation(req.body);

    if(error){
        response.status(400).send(error.details[0].message);
        return;
    }
    const location = {
        id_parcel: 18,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        message: req.body.message
    }

    const text = 'INSERT INTO locations( id_parcel, latitude, longitude, message) VALUES($1, $2, $3, $4) RETURNING *'
    const values = [location.id_parcel, location.latitude, location.longitude, location.message];

    console.log("hano");
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
function validateLocation(parcel){
    const schema = {
        latitude: Joi.string(),
        longitude: Joi.string(),
        id_parcel: Joi.number(),
        message: Joi.string().min(2).max(300)
    };
    return Joi.validate(parcel, schema);
}

export default {create}