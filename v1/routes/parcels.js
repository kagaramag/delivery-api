const express = require('express');
const router = express.Router();

const ParcelsController = require('../../controllers/parcels');

// #LET'S CONTROLLERS DO THE WORK

// get all parcels orders
router.get('/', ParcelsController.parcels_get_all);
// get order details
router.get('/:id', ParcelsController.parcels_get_one_order);
// cancel order
router.put('/:id/cancel', ParcelsController.parcels_cancel_order);
// create new parcel order
router.post('/', ParcelsController.parcels_create_new_order)

// export router
module.exports = router;