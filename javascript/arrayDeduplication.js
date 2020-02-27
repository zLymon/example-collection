// 1. 双层循环
var arr1 = [1, 1, '1', '1']

function unique1(array) {
  var res = []

  for (var i = 0, len = array.length; i < len; i++) {
    for (var j = 0, resLen = res.length; j < resLen; j++) {
      if (array[i] === res[j]) break
    }

    if (j === resLen) {
      res.push(array[i])
    }
  }
  return res
}

// 2. indexOf简化内层循环
var arr2 = [1, 1, '1']

function unique2(array) {
  var res = []
  for (var i = 0, len = array.length; i < len; i++) {
    var current = array[i]
    if (res.indexOf(current) === -1) res.push(current)
  }
  return res
}

// 3. filter
var arr3 = [1, 2, 1, 1, '1']

function unique3(array) {
  return array.filter((item, index, array) => array.indexOf(item) === index)
}

// 4. Object键值对
var arr4 = [{value: 1}, {value: 2}, {value: 3}]

function unique4(array) {
  var obj = {}
  return array.filter((item, index, array) => {
    return obj.hasOwnProperty(typeof item + JSON.stringify(item)) 
      ? false
      : (obj[typeof item + JSON.stringify(item)] = true)
  })
}

// 5. Set方法
var arr5 = [1, 2, 1, 1, '1']
var unique5 = a => [...new Set(a)]