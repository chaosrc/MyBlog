let route = require('express').Router();

route.post('/edit', (req, res, next) => {
  console.log(req.body);
  res.render('success');
  // next();
})

module.exports = route;