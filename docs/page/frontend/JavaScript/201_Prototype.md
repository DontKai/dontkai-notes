# 从原型到原型链

## 1、构造函数创建对象

使用构造函数创建一个对象

```javascript
// Person是一个构造函数
function Person() {}
const person = new Person()
person.name = 'DontKai'
console.log(person.name) // DontKai
```

## 2、prototype

每个函数都有一个 prototype 属性，这个属性是一个指针，指向一个对象，这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。

```javascript
// 例如：当构造函数中不存在name属性时，通过原型链访问name属性
function Person() {}
// 给Person.prototype添加name属性
Person.prototype.name = 'DontKai'
const person1 = new Person()
const person2 = new Person()
console.log(person1.name) // DontKai
console.log(person2.name) // DontKai
```

你可以这样理解：每一个 JavaScript 对象(null 除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。

<div align=center>
    <img src=/prototype/001_proto.png width=100% />
</div>
