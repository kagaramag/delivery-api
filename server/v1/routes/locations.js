const express = require('express');
const Joi = require("joi");
const router = express.Router();

import LocationsController from './../../controllers/locations';

// GET list of all locations
router.post('/', LocationsController.create);

export default router;