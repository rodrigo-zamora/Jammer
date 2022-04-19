const express = require('express');
const router = express.Router();

const {handleError} = require('../utils/hof');
const listController = require('../controllers/list.controller');

router.get('/:userUUID', handleError(async (req, res) => {
    console.log('GET /lists/:userUUID');
    listController.getAll(req.params.uuid, res);
}));

router.post('/:userUUID', handleError(async (req, res) => {
    console.log('POST /lists/:userUUID');
    listController.create(req.params.uuid, req.body, res);
}));

router.put('/:userUUID', handleError(async (req, res) => {
    console.log('PUT /lists/:userUUID');
    listController.update(req.params.uuid, req.body, res);
}));

router.delete('/:userUUID', handleError(async (req, res) => {
    console.log('DELETE /lists/:userUUID');
    listController.delete(req.params.uuid, res);
}));

router.get('/:userUUID/:listQuery', handleError(async (req, res) => {
    console.log('GET /lists/:userUUID/:listQuery');
    if (req.params.listQuery.includes('-')) {
        listController.get(req.params.userUUID, req.params.listQuery, res);
    } else {
        listController.getByName(req.params.userUUID, req.params.listQuery, res);
    }
}));

module.exports = router;