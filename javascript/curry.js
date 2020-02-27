// 函数柯里化
// 第一版
var curry = function (fn) {
  var args = [].slice.call(arguments, 1)
  return function () {
    var newArgs = args.concat([].slice.call(arguments))
    return fn.apply(this, newArgs)
  }
}

// 第二版
function sub_curry(fn) {
  var args = [].slice.call(arguments, 1)
  return function () {
    return fn.apply(this, args.concat([].slice.call(arguments)))
  }
}

function curry1 (fn, length) {
  length = length || fn.length
  var slice = Array.prototype.slice

  return function () {
    // 当实参个数少于形参个数时，递归调用，直到实参个数等于形参个数，执行函数
    if (arguments.length < length) {
      var combined = [fn].concat(slice.call(arguments))
      return curry1(sub_curry.apply(this, combined), length - arguments.length)
    } else {
      return fn.apply(this, arguments)
    }
  }
}

var fn = curry1((a, b, c) => [a, b, c])
console.log(fn('a', 'b', 'c'))
console.log(fn('a', 'b')('c'))
console.log(fn('a')('b', 'c'))