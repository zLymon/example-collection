var count = 1
var container = document.getElementById('container')

function getUserAction() {
  container.innerHTML = count++
}

container.onmousemove = getUserAction

// 第一版防抖
function debounce (func, wait) {
  var timeout
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(func, wait)
  }
}

// 改进第二版
// 处理this指向
function debounce2 (func, wait) {
  var timeout
  return function () {
    var context = this

    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context)
    }, wait);
  }
}

// 改进第三版
// 处理event对象丢失的问题
function debounce3 (func, wait) {
  var timeout
  return function () {
    var context = this
    var args = arguments

    clearTimeout(timeout)
    timeout = setTimeout(function () {
      func.apply(context, args)
    }, wait)
  }
}

// 改进第四版
// 能够立即执行函数
function debounce4 (func, wait, immediate) {
  var timeout

  return function () {
    var context = this
    var args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait);
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait);
    }
  }
}

// 改进第五版
// 处理函数有返回值的情况
function debounce5 (func, wait, immediate) {
  var timeout, result

  return function () {
    var context = this
    var args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait);
      if (callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait);
    }
    return result
  }
}

// 最终版
// 添加取消防抖的功能
function debounce6 (func, wait, immediate) {
  var timeout, result

  var debounced = function () {
    var context = this
    var args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait);
      if (callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait);
    }
    return result
  }

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

container.onmousemove = debounce6(getUserAction, 1000, true)