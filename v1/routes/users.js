import express from 'express';

const router = express.Router();

import UsersController from '../../controllers/users';

// db connection
router.get('/all', UsersController.findAllUsersInPostgre);

// get all parcels orders by user id
router.get('/:id/parcels', UsersController.findParcelsByUserId);
// GET list of all users
router.get('/', UsersController.findAllUsers);

//GET user details
router.get('/:id', UsersController.findUserDetails);


//POST new parcel
router.post('/', UsersController.createNewUser);

// make a user inactive
router.put('/:id/inactive', UsersController.makeUserInactive);

// make a user active
router.put('/:id/active', UsersController.makeUserActive);

// update user profile info
// for now, i only update the name of the user
router.put('/:id/update', (req,res) => {
    // look up user
    const user = users.find(p => p.id  === parseInt(req.params.id));
    // if not exist, retur 404
    if(!user) res.status(404).send("Parcel order with given id was not found");
    // validate, if invalid, return 400 -bad request
    const { error } = validateUser(req.body);
    
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    // update user
    user.name = req.body.name;
    // return the updated user
    res.send(user);
});
// update user password
router.put('/:id/reset-password', (req,res) => {
    // look up user
    const user = users.find(p => p.id  === parseInt(req.params.id));
    // if not exist, retur 404
    if(!user) res.status(404).send("Parcel order with given id was not found");
    // validate, if invalid, return 400 -bad request
    const { error } = validateUser(req.body);
    
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    // update password
    user.password = req.body.password;
    // return the updated user
    res.send(user);
});


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