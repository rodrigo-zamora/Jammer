const express = require('express');
const router = express.Router();

const {handleError} = require('../utils/hof');
const listController = require('../controllers/list.controller');

router.get('/:userUUID', handleError(async (req, res) => {
    console.log('GET /lists/:userUUID');
    listController.getAll(req.params.userUUID, res);
}));

router.post('/:userUUID', handleError(async (req, res) => {
    console.log('POST /lists/:userUUID');
    listController.create(req.params.userUUID, req.body, res);
}));

router.get('/list/:listUUID', handleError(async (req, res) => {
    console.log('GET /lists/list/:listUUID');
    listController.get(req.params.listUUID, res);
}));

router.put('/list/:listUUID', handleError(async (req, res) => {
    console.log('PUT /lists/list/:listUUID');
    listController.update(req.params.listUUID, req.body, res);
}));

router.delete('/list/:listUUID', handleError(async (req, res) => {
    console.log('DELETE /lists/list/:listUUID');
    listController.delete(req.params.listUUID, res);
}));

module.exports = router;