var express = require('express');
var router = express.Router();
var listModel = require('../models/model')
const DBController = require('../controllers/list.js');

router.get('/list', async function (req, res) {
    res.render('list', { listModel });
});

module.exports = router;