const express = require('express');
const router = express.Router();
const {handleError} = require('../utils/hof');

const userController = require('../controllers/user.controller');

router.get('/', handleError(async (req, res) => {
    console.log('GET /users');
    userController.getAllUsers(res);
}));

router.post('/', handleError(async (req, res) => {
    console.log('POST /users');
    userController.create(req.body, res);
}));

router.get('/:query', handleError(async (req, res) => {
    console.log('GET /users/:query');
    if (req.params.query.includes('@')) {
        userController.getByEmail(req.params.query, res);
    } else {
        userController.get(req.params.query, res);
    }
}));

router.put('/:uuid', handleError(async (req, res) => {
    console.log('PUT /users/:uuid');
    userController.update(req.params.uuid, req.body, res);
}));

router.delete('/:uuid', handleError(async (req, res) => {
    console.log('DELETE /users/:uuid');
    userController.delete(req.params.uuid, res);
}));

router.get('/:uuid/lists', handleError(async (req, res) => {
    console.log('GET /users/:uuid/lists');
    userController.getLists(req.params.uuid, res);
}));

router.get('/:uuid/subscription', handleError(async (req, res) => {
    console.log('GET /users/:uuid/subscription');
    userController.getSubscription(req.params.uuid, res);
}));

module.exports = router;