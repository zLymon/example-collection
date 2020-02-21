/**
 * new操作符经历以下4个步骤
 * 1. 创建一个新对象
 * 2. 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
 * 3. 执行构造函数中的代码（为这个新对象添加属性）
 * 4. 返回新对象
 */
function myNew (_Constructor, ...args) {
  var obj = {}
  Object.setPrototypeOf(obj, _Constructor.prototype)
  var ret = _Constructor.apply(obj, args)

  return ret instanceof Object ? ret : this
}