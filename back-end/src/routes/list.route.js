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

router.get('/list/:listUUID/:userUUID', handleError(async (req, res) => {
    console.log('GET /lists/list/:listUUID/:userUUID');
    let list = await listController.get(req.params.listUUID, req.params.userUUID);
    res.send(list);
}));

router.put('/list/:listUUID', handleError(async (req, res) => {
    console.log('PUT /lists/list/:listUUID');
    console.log(req.params.listUUID);
    console.log(req.body);
    let list = await listController.update(req.params.listUUID, req.body);
    res.send(list);
}));

router.delete('/list/:listUUID', handleError(async (req, res) => {
    console.log('DELETE /lists/list/:listUUID');
    let list = await listController.delete(req.params.listUUID);
    res.send(list);
}));

router.post('/list/:listUUID', uploadCloud.single('list'), async (req, res) => {
    console.log('POST /lists/list/:listUUID');
    let list = await listController.addImage(req.params.listUUID, req.file);
    res.send(list);
});

router.post('/list/:listUUID/:movieUUID',handleError(async (req, res) => {
    console.log('POST /lists/list/:listUUID/:movieUUID');
    let list = await listController.addMovie(req.params.listUUID, req.params.movieUUID);
    res.send(list);
}));

router.delete('/list/:listUUID/:movieUUID',handleError(async (req, res) => {
    console.log('DELETE /lists/list/:listUUID/:movieUUID');
    let list = await listController.deleteMovie(req.params.listUUID, req.params.movieUUID);
    res.send(list);
}));

module.exports = router;