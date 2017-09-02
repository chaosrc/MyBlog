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
