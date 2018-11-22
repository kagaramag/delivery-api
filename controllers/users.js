import Joi from 'joi';

import parcels from './../data/parcels';


// /GET parcels by user id
 exports.findParcelsByUserId= (req, res) => {
    const id = req.params.id;
    const result = parcels.filter(c => c.id_client == id);
    if(result.id_client === id){
        return result
    }
    res.status(200).send({
        parcels:result
    });
};
