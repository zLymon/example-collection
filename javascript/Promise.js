function MyPromise (fn) {
  var self = this
  self.status = 'pending'
  self.data = undefined
  self.onFulfilledCallback = []
  self.onRejectedCallback = []

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'resolved'
      self.data = value
      setTimeout(() => {
        for (var i = 0; i < self.onFulfilledCallback.length; i++) {
          self.onFulfilledCallback[i](value)
        }
      })
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected'
      self.data = reason
      setTimeout(() => {
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason)
        }  
      })
    }
  }

  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  var self = this

  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (v) { return v }
  onRejected = typeof onRejected === 'function' ? onRejected : function (r) { return r }

  if (self.status === 'resolved') {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        try {
          var ret = onFulfilled(self.data)
          if (ret instanceof MyPromise) {
            ret.then(resolve, reject)
          } else {
            resolve(ret)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  if (self.status === 'rejected') {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        try {
          var ret = onRejected(self.data)
          if (ret instanceof MyPromise) {
            ret.then(resolve, reject)
          } else {
            resolve(ret)
          }
        } catch (e) {
          reject(e)
        }  
      })
    })
  }

  if (self.status === 'pending') {
    return new Promise(function(resolve, reject) {
      self.onFulfilledCallback.push(function (value) {
        setTimeout(() => {
          try {
            var ret = onFulfilled(self.data)
            if (ret instanceof MyPromise) {
              ret.then(resolve, reject)
            } else {
              resolve(ret)
            }
          } catch (e) {
            reject(e)
          }  
        })
      })

      self.onRejectedCallback.push(function(value) {
        setTimeout(() => {
          try {
            var ret = onRejected(self.data);
            if (ret instanceof Promise) {
              ret.then(resolve, reject);
            } else {
              resolve(ret);
            }
          } catch (e) {
            reject(e);
          }  
        })
      })
    })
  }
}

MyPromise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

MyPromise.prototype.resolve = function (value) {
  if (value instanceof MyPromise) return value
  return new MyPromise(resolve => resolve(value))
}

MyPromise.prototype.reject = function (value) {
  return new MyPromise((resolve, reject) => reject(value))
}

MyPromise.prototype.all = function (list) {
  return new MyPromise((resolve, reject) => {
    let values = []
    let count = 0
    for (let [i, p] of list.entries()) {
      this.resolve(p).then(res => {
        values[i] = res
        count++
        if (count === list.length) resolve(values)
      }, err => {
        reject(err)
      })
    }
  })
}

MyPromise.prototype.race = function (list) {
  return new MyPromise((resolve, reject) => {
    for (let p of list) {
      this.resolve(p).then(res => {
        resolve(res)
      }, err => {
        reject(err)
      })
    }
  })
}

MyPromise.prototype.finally = function (cb) {
  return this.then(
    value => MyPromise.resolve(cb()).then(() => value),
    reason => MyPromise.resolve(cb()).then(() => { throw reason })
  )
}

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 2000);
})

p.then(v => {
  console.log(v)
  return 2
}).then(v => {
  console.log(v)
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(3)
    }, 3000);
  })
}).then(v => {
  console.log(v)
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      reject('error!')
    }, 1000);
  })
}).catch(err => {
  console.log(err)
})