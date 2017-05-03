var express = require('express');
const rendertime = require('../middlewares/render.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { data: 'Express' });
});

module.exports = router;