var express = require('express');
var router = express.Router();
var BlogDB = require('./model/blog.js');

let blogdb = new BlogDB();
/* GET home page. */
router.get('/', function(req, res, next) {
  blogdb.connect().then(()=>{
    return blogdb.findBlogs({page:0})
  });
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
