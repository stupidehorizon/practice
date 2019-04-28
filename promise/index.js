const PENDING = Symbol('pending');
const RESOLVE = Symbol('resolve');
const REJECT = Symbol('reject');

class P {
  constructor(func) {
    this.state = PENDING;
    this.result = null;
    this.promiseChain = [];
    this.errorHandle = () => {};

    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.then = this.then.bind(this);

    // 放到异步队列里面确保 .then 函数已经注册
    setTimeout(() => {
      func(this.resolve, this.reject);
    }, 0);
  }

  resolve(result) {
    let storedValue = result;
    this.state = RESOLVE;
    this.result = result;
    try {
      this.promiseChain.forEach(([successHandle, failHandle]) => {
        storedValue = successHandle(storedValue);
      });
    } catch (error) {
      this.errorHandle(error);
    };
  }

  reject(error) {
    this.state = REJECT;
    this.result = error;
    this.errorHandle(error)
  }

  then(successHandle, failHandle) {
    this.promiseChain.push([successHandle, failHandle]);
    return this;
  }

  finally(finallyResolve) {

  }

  catch(errorHandle) {
    this.errorHandle = errorHandle;
  }
}

p = new P(function (resolve, reject) {
  setTimeout(() => {
    resolve(1);
  }, 2000);
})

p.then((res) => {
  console.log('then1 result:', res);
  return res + 1;
}).then(res => {
  console.log('then2 result:', res);
  return res + 1;
})