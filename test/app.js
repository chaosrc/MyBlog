const app = require('../');
const request = require('supertest');

describe('GET /',function(done){
  it('get home page',function(done){
    request(app)
      .get('/')
      .expect(200)
      .end((e,r)=>{
        done();
        if(e) console.log(e);
      })
  })
})

describe('GET /not-exist-page',()=>{
  it('should return 404 code',done=>{
    request(app)
      .get('/not-exist-page')
      .expect(404)
      .end((e,r)=>{
        if(e) console.log(e);
        done();
      })
  })
})

describe('URL parmas' ,()=>{
  it('should have parmas', done=>{
  
    request(app)
      .get('/home/1')
      .expect(200)
      .expect(res=>{
        console.log(res.body);
      })
      .end((e,r)=>{
        if(e) console.log(e);
        done();
      })
  })
});