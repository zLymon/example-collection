var class2type = {}

// 生成class2type的映射
'Boolean Number String Function Array Date RegExp Object Error Null Undefined'.split(' ').map((item, index) => {
  class2type[`[object ${item}]`] = item.toLowerCase()
})

function type(obj) {
  // ie6中 null和undefined会被Object.prototype.toString识别成[object Object]
  if (obj == null) {
    return obj + ''
  }
  return typeof obj === 'object' || typeof obj === 'function'
    ? class2type[Object.prototype.toString.call(obj)] || 'object'
    : typeof obj
}