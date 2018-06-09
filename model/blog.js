let MongoClient = require('mongodb').MongoClient;

function Blog(dbName, port){
  this.dbname = dbName | 'blog';
  this.port = port | 27017;

  this.dburl = `mongodb://localhost:${this.port}/${this.dbname}`;

 
}

Blog.prototype.connect=function(){
  let self = this;
  return new Promise((resolve,reject)=>{
    MongoClient.connect(self.dburl,(err,db)=>{
      if (err) reject(err);
      
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
    let cursor =  db.find({}).skip(skip).limit(limit+1);
    let result = {};
    cursor.toArray((err,doc)=>{
      if(err) reject(err);
      if(doc.length<=limit){
        result.docs = doc;
        result.hasNext=false;
      }else{
        result.docs = doc.slice(0,limit);
        result.hasNext = true;
        result.total = doc.length;
      }
     
      resolve(result);
    })
    
  });
}

Blog.prototype.findOne=function(options){
  if(!options || !options._id) return;

  return this.db
          .find({_id: options._id})
          .toArray()
          .then((docs)=> {
            console.log(docs);
            docs;
            return docs[0];
          });
}

Blog.prototype.updateBlog=function(options){
  if(!options||!options._id) return;
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
  return db.deleteOne({_id: options._id});
}

Blog.prototype.close=function(){
  this.blogDB.close();
}


module.exports=Blog;