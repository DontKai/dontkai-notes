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
