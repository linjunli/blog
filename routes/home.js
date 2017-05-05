var express = require('express');
const rendertime = require('../middlewares/render.js');
var router = express.Router();
var limit = require('../common/cache');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', { data: 'Express' });
});
router.get('/index', function(req, res, next) {
    res.render('home', { data: 'Express' });
});
router.get('/home', function(req, res, next) {
    res.render('home', { data: 'Express' });
});

module.exports = router;