// 创建对象的多种方法
// 工厂模式
// 缺点：无法解决对象识别问题，即不知道一个对象的类型
function createPerson (name, age, job) {
  var o = new Object()
  o.name = name
  o.age = age
  o.job = job
  o.sayName = function () {
    console.log(this.name)
  }
  return o
}

var person1 = createPerson('Nicholas', 29, 'software engineer')

// 构造函数模式
// 缺点：构造函数模式创建对象，每个方法需要在每个实例上重新创建一次
function Person (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function () {
    console.log(this.name)
  }
}
var person2 = new Person('Nicholas', 29, 'software engineer')

// 原型模式
// 缺点：所有的属性都将被共享，引用类型值如果修改了，所有对象都会被修改
function Person1 () {}

Person.prototype.name = 'Nicholas'
Person.prototype.age = 29
Person.prototype.job = 'Software Engineer'
Person.prototype.sayName = function () {
  console.log(this.name)
}

var person2 = new Person1()

// 组合使用构造函数模式和原型模式
// 使用最广泛、认同度最高的创建对象的方法
function Person2 (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.friends = ['shelby', 'court']
}

Person2.prototype = {
  constructor: Person2,
  sayName: function () {
    console.log(this.name)
  }
}

var person3 = new Person2('nicholas', 19, 'software engineer')

// 动态原型模式
function Person3 (name, age, job) {
  this.name = name
  this.age = age
  this.job = job

  if (typeof this.sayName !== 'function') {
    Person3.prototype.sayName = function () {
      console.log(this.name)
    }
  }
}
var person4 = new Person3('lymon', 20, 'software engineer')

// 寄生构造函数模式
function Person4 (name, age, job) {
  var o = new Object()
  o.name = name
  o.age = age
  o.job = job
  o.sayName = function () {
    console.log(this.name)
  }
  return o
}

// 稳妥构造函数模式
function Person5 (name, age) {
  var o = new Object()

  // 定义私有变量等。。

  // 添加方法
  o.sayName = function () {
    console.log(name)
  }

  return o
}
