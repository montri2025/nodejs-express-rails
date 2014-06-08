var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
  res.render('board',{'menuRegister':'active'});
});

module.exports = router;
