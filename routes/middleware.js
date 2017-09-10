var BlogDB = require('../model/blog.js');

function blogDB(req,res,next){
  let blog = new BlogDB();
  blog.connect().then(()=>{
      return blog.findBlogs({page:req.blogPage||0})
    })
    .then(result=>{
      req.blogs = result.docs;
      req.hasNext = result.hasNext;
      blog.close();
      next();
    })
    .catch(err=>console.log(err));
}



module.exports.blogDB = blogDB;