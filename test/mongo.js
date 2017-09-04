let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');

let url = 'mongodb://localhost:27017/myBlogTest';
let mdb;

beforeEach(()=>{

  return new Promise((resolve,reject)=>{
    MongoClient.connect(url,(err,db)=>{
      if(err) reject();

      mdb=db;
      resolve();
    })
  });
})

describe('mongodb connect test',()=>{
  it('connect to myBlogTest',(done)=>{
    assert.notEqual(null,mdb);
    done();
  });

  it('find document',(done)=>{
    let doc = mdb.collection('blog');
    doc.find({}).toArray((err,docs)=>{
      assert.equal(null,err);
      console.log(docs);
      mdb.close();
      done();
    })
  })
  
});

let Blog = require('../model/blog.js');

describe('test blog db',()=>{
  let blog;
  beforeEach(()=>{
    return new Blog().then(b=>blog=b);
  })

  it('connect success',()=>{
    assert.notEqual(null,blog)
    assert.notEqual(null,blog.db)
  });

  it('insert blog',()=>{
    
    return blog.insertBlog({title:'express',content:'lorem50'}).then(result=>{
      assert.notEqual(null,result.insertedId)
      console.log(result.insertedId);
      // blog.close();
    });
  });

  it('find items',()=>{
    return blog.findBlogs({page:1})
               .then(docs=>{
                  assert.notEqual(null,docs);
                  console.log(docs.length);
                  
               });
  })

  it('update item',()=>{

    return blog.findBlogs({page:1})
      .then((docs,db)=>{

        let item = docs[5];
        let id = item._id;
        item.content='update to lorem100';

        return blog.updateBlog(item)
          .then(result=>{
            // assert.equal(id,result.upsertedId._id)
            assert.equal(1,result.result.ok);
          });
      });
  })

})
