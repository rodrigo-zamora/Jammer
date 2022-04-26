const express = require('express');
const router = express.Router();
const {handleError} = require('../utils/hof');

const userController = require('../controllers/user.controller');

router.get('/', handleError(async (req, res) => {
    console.log('GET /users');
    let users = await userController.getAllUsers();
    res.send(users);
}));

router.post('/', handleError(async (req, res) => {
    console.log('POST /users');
    let user = await userController.create(req.body);
    res.send(user);
}));

router.get('/:query', handleError(async (req, res) => {
    console.log('GET /users/:query');
    let user = [];
    if (req.params.query.includes('@')) {
        user = await userController.getByEmail(req.params.query);
    } else {
        user = await userController.get(req.params.query);
    }
    res.send(user);
}));

router.put('/:uuid', handleError(async (req, res) => {
    console.log('PUT /users/:uuid');
    let user = await userController.update(req.params.uuid, req.body);
    res.send(user);
}));

router.delete('/:uuid', handleError(async (req, res) => {
    console.log('DELETE /users/:uuid');
    let user = await userController.delete(req.params.uuid);
    res.send(user);
}));

router.get('/:uuid/lists', handleError(async (req, res) => {
    console.log('GET /users/:uuid/lists');
    let lists = await userController.getLists(req.params.uuid);
    res.send(lists);
}));

router.get('/:uuid/subscription', handleError(async (req, res) => {
    console.log('GET /users/:uuid/subscription');
    let subscription = await userController.getSubscription(req.params.uuid);
    res.send(subscription);
}));

module.exports = router;