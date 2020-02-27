var count = 1
var container = document.getElementById('container')

function getUserAction() {
  container.innerHTML = count++
}

// 第一版
// 使用时间戳的方式
function throttle (func, wait) {
  var context, args
  var previous = 0

  return function () {
    var now = +new Date()
    context = this
    args = arguments
    
    if (now - previous > wait) {
      func.apply(context, args)
      previous = now
    }
  }
}

// 第二版
// 使用定时器的方式
function throttle2 (func, wait) {
  var timeout, previous = 0

  return function () {
    context = this
    args = arguments

    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func.apply(context, args)
      }, wait);
    }
  }
}

// 第三版
/**
 * 时间戳的方式，会让事件立刻执行，停止触发后不会再执行事件
 * 定时器的方式不会让事件立刻执行，停止触发后依旧会再执行一次事件
 * 第三版为能够立刻执行，停止触发后还能再执行一次的效果
 */
function throttle3 (func, wait) {
  var timeout, context, args, result
  var previous = 0

  var later = function () {
    previous = +new Date()
    timeout = null
    func.apply(context, args)
  }

  var throttled = function () {
    var now = +new Date()
    // 下次触发func剩余的时间
    var remaining = wait - (now - previous)
    context = this
    args = arguments

    // 如果没有剩余的时间或改了系统的时间
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
  }
  return throttled
}

// 第四版
/**
 * 能够通过配置决定是否立即触发以及结束后是否还需要触发事件
 * 添加取消节流功能
 */
function throttle4 (func, wait, options) {
  var timeout, context, args, result
  var previous = 0
  if (!options) options = {}

  var later = function () {
    previous = options.leading === false ? 0 : +new Date().getTime()
    timeout = null
    func.apply(context, args)
    if (!timeout) context = args = null
  }

  var throttled = function () {
    var now = new Date().getTime()
    if (!previous && options.leading === false) previous = now

    // 下次触发func剩余的时间
    var remaining = wait - (now - previous)
    context = this
    args = arguments

    // 如果没有剩余的时间或改了系统的时间
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  }

  throttled.cancel = function () {
    clearTimeout(timeout)
    previous = 0
    timeout = null
  }

  return throttled
}

container.onmousemove = throttle4(getUserAction, 1000)