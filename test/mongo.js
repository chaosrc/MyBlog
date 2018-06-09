let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');

let url = 'mongodb://localhost:27017/myBlogTest';
let mdb;



describe('mongodb connect test',()=>{
  beforeEach(()=>{
    
      return new Promise((resolve,reject)=>{
        MongoClient.connect(url,(err,db)=>{
          if(err) reject();
    
          mdb=db;
          resolve();
        })
      });
    })

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

  before(()=>{
    blog = new Blog();
    return blog.connect()
  });
  
  after(()=>{
    blog.close();
  })


  it('connect test',()=>{
      assert.notEqual(null,blog)
      assert.notEqual(null,blog.db)

  });

  it('insert blog',()=>{
    
    return blog.insertBlog({title:'express',content:'lorem50'}).then(result=>{
      assert.notEqual(null,result.insertedId)
      console.log('inserted ID',result.insertedId);
      // blog.close();
    });
  });

  it('find items',()=>{
    return blog.findBlogs({page:1})
               .then(result=>{
                  let docs = result.docs;
                  assert.notEqual(null,docs);
                  console.log('has next',result.hasNext);
                  console.log('page 1 length',docs.length);
                  
               });
  })

  it('find one item', ()=>{
    let id;
    return blog.findBlogs()
      .then(result=>{
        let docs = result.docs;
        id = docs[1]._id;
        console.log('id', id);
        return blog.findOne(docs[1])
      })
      .then(item=>{
        assert.notEqual(null,item);
        assert.ok(id.toString()===item._id.toString());
      })
  })

  it('find one blog', ()=>{
    let _id = '59ad1ee20664404761ba3832';
    return blog.findOne({_id}).then(item => {
      assert.notEqual(false, !!item);
    })
  })
  it('update item',()=>{

    return blog.findBlogs({page:1})
      .then((findResult)=>{
        let docs = findResult.docs;
        let item = docs[5];
        if(!item) return;
        // let id = item._id;
        item.content='update to lorem100';

        return blog.updateBlog(item)
          .then(result=>{
            // assert.equal(id,result.upsertedId._id)
            assert.equal(1,result.result.ok);
          });
      });
  });


  it('delete item',()=>{

    return blog.findBlogs({page:1})
      .then(find=>{
        let docs = find.docs;
        return blog.deleteBlog(docs[0])
          .then((result)=>{
            assert.equal(1,result.result.ok);
            return blog.deleteBlog(docs[1]);
          })
          .then(result=>{
            assert.equal(1,result.result.ok);
          })
    })
  })

})
