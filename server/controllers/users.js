import Joi from 'joi';

import parcels from './../data/parcels';

import pool from './../db/config';

import jwt from 'jsonwebtoken';
require('dotenv').config();

// /GET parcels by user id
 const findParcelsByUserId= (req, res) => {    
    // get id
    const id = parseInt(req.params.id);     
    // verify if auth
    jwt.verify(req.token, process.env.SECRET, function(err, data) {
        if (err) {
            res.send({
                message: "Login first to perform this action."
            });
        } else { 
            // if auth
            pool.query(`SELECT * from parcels where id_client = ${id}`).then(response =>{
                console.log(response.rows[0]);
                res.status(200).json({
                    parcels: response.rows[0]
                });
            }).catch(err =>{
                res.status(400).json({
                    message:err
                });
            });  
        }
    });
    req.setTimeout(20000);
};


export default {findParcelsByUserId}
