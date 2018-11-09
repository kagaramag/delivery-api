const express = require('express');
const Joi = require("joi");
const router = express.Router();

const parcels = require('./../../data/parcels');

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

module.exports = router;