// eslint-disable-next-line func-names
(function() {
  this.asyncSum = async (a, b) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(a + b)
      }, 10)
    })
  }
  this.sum = (a, b) => a + b
}).call(this)
