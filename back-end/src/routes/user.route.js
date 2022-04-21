const express = require('express');
const router = express.Router();
const {handleError} = require('../utils/hof');

const userController = require('../controllers/user.controller');

router.get('/', handleError(async (req, res) => {
    console.log('GET /users');
    let promise = await userController.getAllUsers();
    if (promise) {
        res.status(200).send(promise);
    } else {
        res.status(404).send('Users not found');
    }
}));

router.post('/', handleError(async (req, res) => {
    console.log('POST /users');
    let promise = await userController.create(req.body);
    if (promise) {
        console.log(`User with email ${req.body.email} created`);
        res.status(201).send(promise);
    } else {
        console.log(`User with email ${req.body.email} already exists`);
        res.status(409).send('User already exists');
    }
}));

router.get('/:query', handleError(async (req, res) => {
    console.log('GET /users/:query');
    if (req.params.query.includes('@')) {
        let promise = await userController.getByEmail(req.params.query);
        if (promise) {
            res.status(200).send(promise);
        } else {
            res.status(404).send('User not found');
        }
    } else {
        let promise = await userController.get(req.params.query);
        if (promise) {
            res.status(200).send(promise);
        } else {
            res.status(404).send('User not found');
        }
    }
}));

router.put('/:uuid', handleError(async (req, res) => {
    console.log('PUT /users/:uuid');
    let promise = await userController.update(req.params.uuid, req.body);
    if (promise) {
        res.status(200).send(promise);
    } else {
        res.status(404).send('User not found');
    }
}));

router.delete('/:uuid', handleError(async (req, res) => {
    console.log('DELETE /users/:uuid');
    let promise = await userController.delete(req.params.uuid);
    if (promise) {
        res.status(200).send(promise);
    } else {
        res.status(404).send('User not found');
    }
}));

router.get('/:uuid/lists', handleError(async (req, res) => {
    console.log('GET /users/:uuid/lists');
    let promise = await userController.getLists(req.params.uuid);
    if (promise) {
        res.status(200).send(promise);
    } else {
        res.status(404).send('User not found');
    }
}));

router.get('/:uuid/subscription', handleError(async (req, res) => {
    console.log('GET /users/:uuid/subscription');
    let promise = await userController.getSubscription(req.params.uuid);
    if (promise) {
        res.status(200).send(promise);
    } else {
        res.status(404).send('User not found');
    }
}));

module.exports = router;