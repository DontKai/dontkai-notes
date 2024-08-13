# 运算符

## \*\* (指数运算符)

这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。

```javascript
2 ** 2 // 4
2 ** 3 // 8

let a = 1.5
a **= 2
// 等同于 a = a * a;

let b = 4
b **= 3
// 等同于 b = b * b * b;
```

## ?. (可选链运算符)

-   调用函数也是一样的，如果函数不存在，自动返回 undefined，而不是报错。 // undefined
-   如果存在一个属性名但不是函数，使用可选链依然会报错。 // TypeError: xxxx is not a function
-   可选链不能用于赋值

```javascript
let animal = {
    cat: {
        name: 'Tom',
        sex: '男',
        age: 1
    }
}
// 开发过程中，想要读取一个对象中可能不存在的值，往往需要判断一下。没有可选链操作符之前是这样写。
let dog = (animal && animal.dog && animal.dog.name) || 'default'
// 可选链
let dog = animal.dog?.name || 'default'
```

## ?? (空值合并运算符)

读取对象属性的时候，如果某个属性的值是 null 或 undefined，有时候需要为它们指定默认值。常见做法是通过||运算符指定默认值。但是属性的值如果为空字符串或 false 或 0，默认值也会生效。

ES2020 引入了一个新的 Null 判断运算符??。

```javascript
console.log(null ?? 1) // 1
console.log((null || true) ?? 1) // true
```

## ||= &&= ??= (逻辑赋值运算符)

ES2021 引入了三个新的逻辑赋值运算符（logical assignment operators），将逻辑运算符与赋值运算符进行结合。

这三个运算符 ||= 、&&= 、??=，相当于先进行左侧逻辑运算，然后根据运算结果再进行赋值运算。
用途：为属性设置默认值。

### 基本用法

```javascript
let name = ''
// 或赋值运算符
name ||= '||Tom'
// 等同于
name || (name = '||Tom')

// 与赋值运算符
name &&= '&Tom'
// 等同于
name && (name = '&Tom')

// 逻辑空赋值运算符
name ??= '??Tom'
// 等同于
name ?? (name = '??Tom')
```
