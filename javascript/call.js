Function.prototype.myCall = function (context) {
  context = context || window
  context.fn = this

  var args = []
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']')
  }
  var result = eval('context.fn(' + args + ')')
  delete context.fn

  return result
}

var value = 2

var obj = {
  value: 1
}

function bar (name, age) {
  console.log(this.value)
  return {
    value: this.value,
    name,
    age
  }
}

bar.myCall(null)

console.log(bar.myCall(obj, 'kevin', 18))