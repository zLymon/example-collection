// 数组浅拷贝
var arr = ['old', 1, true, null, undefined]

var arr1 = arr.concat()

var arr2 = arr.slice()

// 数组深拷贝
// JSON方法（不能拷贝函数）
var arr3 = JSON.parse(JSON.stringify(arr))

// 浅拷贝实现
var shallowCopy = function (obj) {
  if (typeof obj !== 'object') return

  var newObj = obj instanceof Array ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

// 深拷贝实现
var deepCopy = function (obj) {
  if (typeof obj !== 'object') return
  var newObj = obj instanceof Array ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object'
        ? deepCopy(obj[key])
        : obj[key]
    }
  }
  return newObj
}