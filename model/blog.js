let MongoClient = require('mongodb').MongoClient;

function Blog(dbName, port){
  let name = dbName | 'blog';
  let pt = port | 27017;

  let url = `mongodb://localhost:${pt}/${name}`;
  let self = this;

  return new Promise((resolve,reject)=>{
    MongoClient.connect(url,(err,db)=>{
      if (err) reject();
      
      self.blogDB = db;
      self.db=db.collection('blog');
      resolve(self);
    });
    
  });
}

Blog.prototype.findBlogs=function(options){
  let self = this;
  let db = this.db;
  options = options || {};
  let page = options.page || 0;
  let limit = options.limit || 10;
  let skip = page*limit;

  return new Promise((resolve,reject)=>{
    
    db.find({}).skip(skip).limit(limit).toArray((err,doc)=>{
      if(err) reject();
      resolve(doc,self);
    })
    
  });
}

Blog.prototype.updateBlog=function(options){
  let db = this.db;
  let self = this;
  let id = options._id;
  //if not delete will have
  //MongoError: Cannot update 'lastModified' and 'lastModified' at the same time
  delete options.lastModified;
  return new Promise((resolve,reject)=>{
    db.updateOne(
      {_id:id},
      {
        $set: options,
        $currentDate:{lastModified:true}
      },
      (err,result)=>{
        if(err) reject(err);
        resolve(result,self);
      }
    )
  })
}

Blog.prototype.insertBlog=function(blog){
  let db = this.db;
  let self = this;
  return new Promise((resolve,reject)=>{
    db.insertOne(blog).then((result)=>{
      resolve(result,self);
    }).catch(err=>reject(err));
  })
}

Blog.prototype.deleteBlog=function(options){
  let db = this.db;
  let self = this;
  if(!options) return;
  if(Object.keys(options).length===0){
    return db.deleteMany({});
  }
  return db.deleteOne({_id:options._id});
}

Blog.prototype.close=function(){
  this.blogDB.close();
}


module.exports=Blog;