var BlogDB = require('../model/blog.js');
var ObjectId = require('mongodb').ObjectId;
/**
 *
 * According to the `req.params.pageNumber` or 0
 * to query page list and add it to `req.blogs`
 * if has next page `req.hasNext` set to true
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function blogList(req,res,next){
  let pageNumber = req.params.pageNumber || 0;
  let blog = new BlogDB();

  blog.connect().then(()=>{
      return blog.findBlogs({page:pageNumber})
    })
    .then(result=>{
      req.blogs = result.docs;
      req.hasNext = result.hasNext;
      blog.close();
      next();
    })
    .catch(err=>console.log(err));
}

/**
 * Get a single blog page depend on the `req.params.pageId`
 * and  add it to `req.blogPage`
 * if `req.params.pageId` not exist,nothing will do
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function blogPage(req,res,next){
  let id = req.params.pageID;

  if(!id){
    next();
    return;
  }

  let db = new BlogDB();

  db.connect()
  .then(()=>{
    return db.findOne({_id: ObjectId(id)})
  })
  .then(page=>{
    req.blogPage = page;
    db.close();
    next();
  });
  //TODO: error handle
}

function logBlog(req, res, next){
  if(req.blogs){
    console.log('first blog', req.blogs[0]);
  }
  if(req.blogPage){
    console.log('blog page' ,req.blogPage);
  }
  next();
}

exports.blogList = blogList;
exports.blogPage = blogPage;
exports.logBlog = logBlog;
