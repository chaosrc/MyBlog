var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
      { 
        title: 'Express',
        isLogin:true ,
        articles:['a','b','c','d','e'],
        pathPageUp: 'page/10001'
      }
    );
});

module.exports = router;
