// 数组扁平化
// 1. 递归
var arr1 = [1, [2, [3, 4]]]

function flatten(arr) {
  var res = []
  for (var i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten(arr[i]))
    } else {
      res.push(arr[i])
    }
  }
  return res
}

// 2. toString
function flatten2(arr) {
  return arr.toString().split(',').map(item => +item)
}

// 3. reduce
function flatten3(arr) {
  return arr.reduce((prev, next) => {
    prev.concat(Array.isArray(next) ? flatten3(next) : next)
  }, [])
}

// 4. 扩展运算符
function flatten4(arr) {
  // 扩展运算符只能扁平化一层，所以使用while循环
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}