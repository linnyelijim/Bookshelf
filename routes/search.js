var express = require('express');
var router = express.Router();
var searchModel = require('../models/model')
const DBController = require('../controllers/search.js');

router.get('/search', async function (req, res) {
    res.render('search', { searchModel });
});

module.exports = router;