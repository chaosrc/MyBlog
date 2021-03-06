let assert = require('assert');

describe('promise test',()=>{
  it('resolves',()=>{
    return Promise.resolve().then(x=>console.log('resolved'))
  })

  it('promise.then return',()=>{

    let promise =  new Promise((rs,rj)=>{
      setTimeout(rs,1000)
    });

   let result = promise
      .then(x=>{
        console.log('promise finish');
        // done();
        return 'return string from .then';
      });
    result.then(x=>console.log('after promise',x))

    assert.ok(result instanceof Promise);
  return result;
  })
})