var express = require('express');
var router = express.Router();
var db = require('./middleware.js');

var blogList = db.blogList;
var blogPage = db.blogPage;


router.use('/home/:pageNumber',blogList);
router.use('/',blogList);

/* GET home page. */
router.get('/', db.logBlog, function(req, res, next) {

  res.render('index',
      {
        title: 'Express',
        isLogin:true ,
        articles:req.blogs,
        pathPageUp: 'page/10001'
      }
    );
});

router.get('/home/:pageNumber',function(req,res){
  res.render('index',
      {
        title: 'Express',
        isLogin:true ,
        articles:req.blogs,
        pathPageUp: 'page/10001'
      }
    );
});



module.exports = router;
