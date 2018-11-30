import Joi from 'joi';

import parcels from './../data/parcels';

import pool from './../db/config';
import authVerify from './../../helpers/verifyAuth'
require('dotenv').config();

// /GET parcels by user id
 const findParcelsByUserId= (req, res) => {    
    // get id
    const id = parseInt(req.params.id);     
    // verify if auth
    if(!authVerify.isTokenExist(req.token)) return res.send({message: "Sorry, Error occured while processing your token"})
    // if auth
    pool.query(`SELECT * from parcels where id_client = ${id}`).then(response =>{
        res.status(200).json({
            parcels: response.rows[0]
        });
    }).catch(err =>{
        res.status(400).json({
            message:"Sorry, we can't find parcels created by a given users."
        });
    });  
    req.setTimeout(20000);
};


export default {findParcelsByUserId}
