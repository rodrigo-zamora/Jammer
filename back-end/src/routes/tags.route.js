const express = require('express');
const router = express.Router();
const {handleError} = require('../utils/hof');

const tagController = require('../controllers/tag.controller');

router.get('/', handleError(async (req, res) => {
    console.log('GET /tags');
    let tags = await tagController.getAllTags();
    res.send(tags);
}));

router.post('/', handleError(async (req, res) => {
    console.log('POST /tags');
    let tag = await tagController.create(req.body);
    res.send(tag);
}));

router.get('/:tagUUID', handleError(async (req, res) => {
    console.log('GET /tags/:tagUUID');
    let tag = await tagController.get(req.params.tagUUID);
    res.send(tag);
}));

router.put('/:tagUUID', handleError(async (req, res) => {
    console.log('PUT /tags/:tagUUID');
    let tag = await tagController.update(req.params.tagUUID, req.body);
    res.send(tag);
}));

router.delete('/:tagUUID', handleError(async (req, res) => {
    console.log('DELETE /tags/:tagUUID');
    let tag = await tagController.delete(req.params.tagUUID);
    res.send(tag);
}));

module.exports = router;