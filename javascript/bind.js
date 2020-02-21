Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new Error('you must pass a function as arguments')
  }
  var self = this
  var args = Array.prototype.slice.call(arguments, 1)
  
  var fnop = function () {}

  var fBind = function () {
    var bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(this instanceof fBind ? this : context, args.concat(bindArgs))
  }

  fnop.prototype = this.prototype
  fBind.prototype = new fnop()
  return fBind
}