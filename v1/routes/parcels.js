
import express from 'express';

const router = express.Router();

import ParcelsController from '../../controllers/parcels';

// #LET'S CONTROLLERS DO THE WORK

// get all parcels orders
router.get('/', ParcelsController.findAll);
// get order details
router.get('/:id', ParcelsController.findOne);
// cancel order
router.put('/:id/cancel', ParcelsController.cancelOne);
// create new parcel order
router.post('/', ParcelsController.create)

// export router
module.exports = router;