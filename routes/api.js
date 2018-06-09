let route = require('express').Router();
let BlogDB = require('../model/blog');

route.post('/edit', (req, res, next) => {
  console.log(req.body);
  let db = new BlogDB();
  db.connect().then( () => {
    db.insertBlog(req.body);
  })
  res.render('success');
  // next();
})

module.exports = route;