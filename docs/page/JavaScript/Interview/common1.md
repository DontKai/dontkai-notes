# 面试 1

## 一、新特性

```
1. 变量声明 let/const
2. 箭头函数：(a, b) => a + b;
3. 模板字符串：`${a}`
4. 解构赋值：let [a, b] = [1, 2];
5. 扩展运算符：...
6. 剩余参数：function(...args) {}
7. 类：class A {}
8. 模块化：import/export
9. promise
10. map/set
11. symbol
12. 迭代器和生成器：for...of、for...in、yield
13. object 的新方法：Object.is()、Object.assign()、Object.keys()、Object.values()、Object.entries()等方法。
14. 数组的新方法：Array.from()、includes()、map()、filter()、reduce()、find()、some()、every()等方法。
```

## 二、数据类型

基本数据类型：String(字符串)、 null(空值)、 undefined(未定义)、 Boolean(布尔值)、 Number(数字)、 Symbol(唯一标识)、 BigInt(大整数)
引用数据类型：Object(包含了普通对象 ，数组，函数)

### 区别：

1. 基本数据类型存储在栈内存空间中 引用数据类型存储在堆内存空间中
2. 基本数据类型赋值的是变量本身的值 引用数据类型赋值的是它的地址或者叫指针， 当引用数据类型被重新赋值时实际上是修改了它的地址，一个变量的修改会影响到其它变量。

### 类型判断

1. 使用 typeof 判断基本数据类型(typeof 判断 object 的数据返回的都是 object。想区分对象、数组、null，单纯使用 typeof 是不行的。)
2. 使用 instanceof 判断引用数据类型(注意 null 是一个特殊情况 typeof null === 'object')
3. Object.prototype.toString.call()
4. 类型判断详细见：[类型判断](../special/typeJudge/index.md)

## 三、[] != [] 返回什么？为什么？

```js
// [] == ![] 结果为true，转化过程如下：
[] == ![]
[] == !true // 将空数组这个对象类型转换成布尔值
[] == false // ! 运算符对 true 进行取反
'' == false // 对 [] 进行 ToPrimitive 操作，返回一个空对象
0 == 0      // 将等号两边都转换成数字类型

/*
ToPrimitive(obj, Number) ==> Number({})
如果 obj 是基本类型，直接返回
否则，调用 valueOf 方法，如果得到原始值，则返回
否则，调用 toString 方法，如果得到原始值，则返回
否则，报错
*/
```

## 四、如何获取安全的 undefined 值？

```js
// 使用 void 运算符对其后的表达式进行求值，然后返回 undefined。
// 因为 void 运算符总是返回 undefined，而且 0 是一个非常短的常量表达式，
// 所以 void 0 是一种简洁且安全的方式来获得 undefined，示例如下：
let safeUndefined = void 0
console.log(safeUndefined) // 输出: undefined

// 补充：为什么void 0就是安全的，为什么不直接使用 undefined？
// 因为 undefined 在较低版本的 Node/浏览器 环境中可以被重定义。
// 如果被重新定义了，全局的 undefined 就会受到污染，会导致之后的代码出现问题，例如：
let undefined = 'hello'
let test
console.log(test === undefined ? 'undefined' : 'not undefined')
// 输出：not undefined
console.log(test === void 0 ? 'undefined' : 'not undefined')
// 输出：undefined
```

## 五、isNaN 和 Number.isNaN 函数有什么区别?

isNaN 判断一个是否是 NaN 是会先对其进行隐式转换，再检查其是否是 NaN。
Number.isNaN 表示使用的是 number 对象上的静态方法，用以严格判断是否为 NaN,不进行类型转换。

## 六、==和===和 Object.is()的区别？

### ==

双等号进行相等判断时，如果两边的类型不一致，则会进行类型转换后再进行比较，规则如下：

1. 如果类型不同，会进行类型转换。
2. 将 null 和 undefined 视为相等。
3. 将布尔值转换为数字再进行比较。
4. 将字符串和数字进行比较时，会将字符串转换为数字。
5. 对象与原始类型进行比较时，会将对象转换为原始类型。

### ===

三等号进行相等判断时，不会进行类型转换。如果两边的类型不一致，则直接返回 false，规则如下：

1. 如果类型不同，返回 false。
2. 如果类型相同，再进行值的比较。

### Object.is()

Object.is() 在大多数情况下与三等号的行为相同，但它处理了一些特殊情况，如 -0 和 +0，以及 NaN，规则如下：

1. 如果类型不同，返回 false。
2. 如果类型相同，再进行值的比较。
3. 特殊情况：-0 和 +0 不相等，两个 NaN 是相等的。

```js
console.log(Object.is(NaN, NaN)) // true
console.log(NaN == NaN) // false
console.log(NaN === NaN) // false
console.log(Object.is(-0, +0)) // false
console.log(0 == -0) // true
console.log(0 === -0) // true
console.log(Object.is(null, undefined)) // false
console.log(null == undefined) // true
console.log(null === undefined) // false
```
