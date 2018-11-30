// require express
import express from 'express';

// register router
const router = express.Router();
import Auth from '../../db/jwt';
// import users controller
import UsersController from './../../controllers/users';

// get all parcels orders by user id
router.get('/:id/parcels', Auth, UsersController.findParcelsByUserId);

export default  router;