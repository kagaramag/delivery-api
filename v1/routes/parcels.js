// require express
import express from 'express';

// register router
const router = express.Router();

// import parcels controller
import ParcelsController from './../../controllers/parcels';

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