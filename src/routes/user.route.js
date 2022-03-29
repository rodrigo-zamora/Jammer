const express = require('express');
const router = express.Router();

const {handleError} = require('../utils/hof');
const userController = require('../controllers/user.controller');

router.get('/', handleError(async (req, res) => {
    console.log('GET /users');
    const users = userController.getAllUsers();
    res.send(users);
}));

router.post('/', handleError(async (req, res) => {
    console.log('POST /users');
    userController.create(req.body, res);
}));

router.get('/:uuid', handleError(async (req, res) => {
    console.log('GET /users/:uuid');
    userController.get(req.params.uuid, res);
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
    userController.getsubscription(req.params.uuid, res);
}));

module.exports = router;