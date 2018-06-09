var router = require('express').Router();
var db = require('./middleware.js');

// router.use('/page/:pageID', blogPage);

router.get('/page/:pageID', db.blogPage, db.logBlog,function(req, res){
  if(!req.blogPage){
    res.end('page not exist');
    return;
  }
  console.log(req.render, req.blogPage);
  res.render('page',{
    blog: req.blogPage
  })
});

module.exports = router;