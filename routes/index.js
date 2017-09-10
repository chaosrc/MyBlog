var express = require('express');
var router = express.Router();
var dbMiddleware = require('./middleware.js').blogDB;


router.use(dbMiddleware);

router.use('/home/:page',function(req,res,next){
  console.log('use middle',req.params.page);
  next();
})
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', 
      { 
        title: 'Express',
        isLogin:true ,
        articles:req.blogs,
        pathPageUp: 'page/10001'
      }
    );
});
router.get('/home/:page',function(req,res){
  res.end(`page ${req.params.page}`);
});

module.exports = router;
