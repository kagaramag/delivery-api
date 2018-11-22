// require express
import express from 'express';

// register router
const router = express.Router();

// import users controller
import UsersController from './../../controllers/users';


// get all parcels orders by user id
router.get('/:id/parcels', UsersController.findParcelsByUserId);
// GET list of all users
router.get('/', UsersController.findAllUsers);

//GET user details
router.get('/:id', UsersController.findUserDetails);

//POST sign up
router.post('/', UsersController.createNewUser);

// make a user inactive
// router.put('/:id/inactive', UsersController.makeUserInactive);

// make a user active
// router.put('/:id/active', UsersController.makeUserActive);

// update user profile info
// for now, i only update the name of the user
router.put('/:id/update', UsersController.UserUpdate);

// validating user
function validateUser(user){
    // defining schema
    const schema = {
        id: Joi.number().required(),
        name: Joi.string().max(30).min(3).required(),
        email: Joi.string().email().min(6).max(60).required(),
        password: Joi.string().min(4).max(23).required(),
        state: Joi.string().required(),
        role: Joi.string().required(),
        created_time: Joi.date(),
    };
    return Joi.validate(user, schema);
}

module.exports = router;