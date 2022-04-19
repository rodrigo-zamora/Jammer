const express = require('express');
const router = express.Router();

const {handleError} = require('../utils/hof');
const listController = require('../controllers/list.controller');

router.get('/:uuid', handleError(async (req, res) => {
    console.log('GET /lists/:uuid');
    listController.getAll(req.params.uuid, res);
}));

router.post('/:uuid', handleError(async (req, res) => {
    console.log('POST /lists/:uuid');
    listController.create(req.params.uuid, req.body, res);
}));

router.put('/:uuid', handleError(async (req, res) => {
    console.log('PUT /lists/:uuid');
    listController.update(req.params.uuid, req.body, res);
}));

router.delete('/:uuid', handleError(async (req, res) => {
    console.log('DELETE /lists/:uuid');
    listController.delete(req.params.uuid, res);
}));

module.exports = router;