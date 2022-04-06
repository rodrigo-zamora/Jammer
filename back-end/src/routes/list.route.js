const express = require('express');
const router = express.Router();

const {handleError} = require('../utils/hof');
const listController = require('../controllers/list.controller');

router.get('/', handleError(async (req, res) => {
    console.log('GET /lists');
    const lists = await listController.getAll(req.user.uuid, res);
    res.send(lists);
}));

router.post('/', handleError(async (req, res) => {
    console.log('POST /lists');
    listController.create(req.user.uuid, req.body.listName, res);
}));

router.get('/:uuid', handleError(async (req, res) => {
    console.log('GET /lists/:uuid');
    const list = listController.get(req.params.uuid, res);
    res.send(list);
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