const express = require('express');
const router = express.Router();

const {uploadCloud} = require('../utils/multer');

const {handleError} = require('../utils/hof');
const listController = require('../controllers/list.controller');

router.get('/:userUUID', handleError(async (req, res) => {
    console.log('GET /lists/:userUUID');
    let lists = await listController.getAll(req.params.userUUID);
    res.send(lists);
}));

router.post('/:userUUID', handleError(async (req, res) => {
    console.log('POST /lists/:userUUID');
    let list = await listController.create(req.params.userUUID, req.body);
    res.send(list);
}));

router.get('/list/:listUUID', handleError(async (req, res) => {
    console.log('GET /lists/list/:listUUID');
    let list = await listController.get(req.params.listUUID);
    res.send(list);
}));

router.put('/list/:listUUID', handleError(async (req, res) => {
    console.log('PUT /lists/list/:listUUID');
    let list = await listController.update(req.params.listUUID, req.body);
    res.send(list);
}));

router.delete('/list/:listUUID', handleError(async (req, res) => {
    console.log('DELETE /lists/list/:listUUID');
    let list = await listController.delete(req.params.listUUID);
    res.send(list);
}));

router.post('/list/:listUUID/share', handleError(async (req, res) => {
    console.log('POST /lists/list/:listUUID/share');
    let list = await listController.addUserToList(req.params.listUUID, req.body);
    res.send(list);
}));

router.post('/list/:listUUID/upload', uploadCloud.single('image'), handleError(async (req, res) => {
    console.log('POST /lists/list/:listUUID/upload');
    let list = await listController.uploadImage(req.params.listUUID, req.file.path);
    res.send(list);
}));

router.get('/list/:listUUID/image', handleError(async (req, res) => {
    console.log('GET /lists/list/:listUUID/image');
    let list = await listController.getImage(req.params.listUUID);
    res.send(list);
}));

module.exports = router;