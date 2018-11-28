// require express
import express from 'express';

// register router
const router = express.Router();

// import parcels controller
import ParcelsController from './../../controllers/parcels';

import jwt from 'jsonwebtoken';
import Auth from './../../db/jwt';

router.get('/', Auth, ParcelsController.findAll);
// cancel order
router.put('/:id/cancel', Auth, ParcelsController.cancelOne);
// get order details
router.get('/:id', ParcelsController.findOne);
// create new parcel order
router.post('/', Auth, ParcelsController.create);
// Set package destination
// router.put('/:id/destination', ParcelsController.destination);
// // Change package status
router.put('/:id/status', ParcelsController.changeStatus);

// get all location by specific parcel

router.get('/:id/locations', Auth, ParcelsController.findLocationByParcels);

// export router
export default  router;