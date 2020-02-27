/**
 * 惰性函数
 * 调用一个函数，返回**首次**调用时的结果，后面不再重复调用
 */
// 得到结果后，重写函数，直接返回该结果
var foo = function () {
  var t = new Date()
  foo = function () {
    return t
  }
  return foo()
}

// 应用
// 判断浏览器环境，只需要判断一次即可
function addEvent(type, el, fn) {
  if (window.addEventListener) {
    addEvent = function (type, el, fn) {
      el.addEventListener(type, fn, false)
    }
  } else if (window.attachEvent) {
    addEvent = function (type, el, fn) {
      el.attachEvent('on' + type, fn)
    }
  }
  addEvent(type, el, fn)
}