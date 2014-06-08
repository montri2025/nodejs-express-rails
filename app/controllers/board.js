var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
  res.render('board',{'menuBoard':'active'});
});

module.exports = router;
