// 原型链继承
function Parent () {
  this.name = 'kevin'
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child () {

}

Child.prototype = new Parent()

var child = new Child()

console.log(child.getName()) // kevin

// 借用构造函数
function Parent1 () {
  this.names = ['kevins', 'daisy']
}

function Child1 () {
  Parent.call(this)
}

var child1 = new Child()

child1.names.push('yayu')

console.log(child1.names) // ['kevins', 'daisy', 'yayu']

var child11 = new Child()

console.log(child11.names) // ['kevins', 'daisy']

// 组合继承
function Parent2 (name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}

Parent2.prototype.getName = function () {
  console.log(this.name)
}

function Child2 (name, age) {
  Parent.call(this, name)
  this.age = age
}

Child2.prototype = new Parent()
Child2.prototype.constructor = Child3

var child2 = new Child('kevin', '18');

child2.colors.push('black');

console.log(child2.name); // kevin
console.log(child2.age); // 18
console.log(child2.colors); // ["red", "blue", "green", "black"]

var child22 = new Child('daisy', '20');

console.log(child22.name); // daisy
console.log(child22.age); // 20
console.log(child22.colors); // ["red", "blue", "green"]

// 原型式继承
function createObj (o) {
  function F () {}
  F.prototype = o
  return new F()
}

var person = {
  name: 'kevin',
  friends: ['daisy', 'kelly']
}

var person1 = createObj(person);
var person2 = createObj(person);

person1.name = 'person1';
console.log(person2.name); // kevin

person1.firends.push('taylor');
console.log(person2.friends); // ["daisy", "kelly", "taylor"]

// 寄生式继承
function createObj1 (o) {
  var clone = Object.create(o)
  clone.sayName = function () {
    console.log('hi')
  }
  return clone
}

// 寄生组合式继承
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}

function prototype(child, parent) {
  var prototype = object(parent.prototype)
  prototype.constructor = child
  child.prototype = prototype
}

prototype(Child, Parent)