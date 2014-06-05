var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'BRENM','fullBrand':'Bootsrap Rails Express NodeJS Mongodb' });
});

module.exports = router;
