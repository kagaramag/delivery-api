const express = require('express');
const Joi = require("joi");
const router = express.Router();

import LocationsController from './../../controllers/locations';

// Authaticate
import Auth from './../../db/jwt';

// Record location
router.post('/', Auth, LocationsController.create);

export default router;