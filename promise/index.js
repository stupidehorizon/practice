const PENDING = Symbol('pending');
const RESOLVE = Symbol('resolve');
const REJECT = Symbol('reject');

class P {
  constructor(func) {
    this.state = PENDING;
    this.result = null;

    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.then = this.then.bind(this);
    func(this.resolve, this.reject);
  }

  resolve(result) {
     this.state = RESOLVE;
     this.result = result;
  }

  reject(result) {
     this.state = REJECT;
     this.result = result;
  }

  then(successHandle, failHandle) {
    switch(this.state) {
      case RESOLVE: successHandle && successHandle(this.result); break;
      case REJECT: failHandle && failHandle(this.result); break;
    }
  }

  finally(finallyResolve) {

  }

  catch(failResolve) {

  }
}

p = new P(function (resolve, reject){
  resolve('promise resolve');
})

p.then(console.log);