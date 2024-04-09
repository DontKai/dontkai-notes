# 执行上下文

## 1、执行顺序 变量提升-函数提升

```javascript
// 变量提升
var foo = function () {
    console.log('foo1')
}
foo() // foo1
var foo = function () {
    console.log('foo2')
}
foo() // foo2
```

```javascript
// 函数提升
function foo() {
    console.log('foo1')
}
foo() // foo2
function foo() {
    console.log('foo2')
}
foo() // foo2
```

## 2、可执行代码

可执行代码(executable code)的类型： 全局代码、函数代码、eval 代码。
当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”，让我们用个更专业一点的说法，就叫做"执行上下文(execution context)"。

执行上下文分为全局执行上下文和函数执行上下文。

1. 全局执行上下文：这是默认或者说基础的上下文，任何不在函数内部的代码都在全局上下文中。它会执行两件事：创建一个全局的 window 对象（浏览器的情况下），并且设置 this 的值等于这个全局对象。一个程序中只会有一个全局执行上下文。
2. 函数执行上下文：每当一个函数被调用时, 都会为该函数创建一个新的上下文。每个函数都有它自己的执行上下文，不过是在函数被调用时创建的。函数上下文可以有任意多个。每当一个新的执行上下文被创建，它会按定义的顺序执行一系列步骤。
3. Eval 函数执行上下文 — 执行在 eval 函数内部的代码也会有它属于自己的执行上下文(不经常使用)

## 3、执行上下文栈

JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文

执行上下文栈：全局执行上下文和函数执行上下文会保存在栈中，栈是后进先出的数据结构。

```javascript
let a = 'Hello World!'
function first() {
    console.log('Inside first function')
    second()
    console.log('Again inside first function')
}
function second() {
    console.log('Inside second function')
}
first()
console.log('Inside Global Execution Context')
```

<div align=center>
    <img src=./assets/001_execution.png width=100% />
</div>
模拟执行上下文栈的行为：

```javascript
/* 上下文栈是一个数组 */
ECStack = []
/* 初始化的时候首先就会向执行上下文栈压入一个全局执行上下文*/
ECStack = [globalContext]
/* 当执行下面这段代码时 */
function fun3() {
    console.log('fun3')
}
function fun2() {
    fun3()
}
function fun1() {
    fun2()
}
fun1()
// 模拟执行上下文
/*
    ECStack.push(<fun1> functionContext);
    ECStack.push(<fun2> functionContext);
    ECStack.push(<fun3> functionContext);
    ECStack.pop();
    ECStack.pop();
    ECStack.pop();
    ECStack = [globalContext]// ECStack底层永远有个globalContext
*/
```

## 4、示例 1

```javascript
var scope = 'global scope'
function checkscope() {
    var scope = 'local scope'
    function f() {
        return scope
    }
    return f()
}
checkscope()
/*
    ECStack.push(<checkscope> functionContext);
    ECStack.push(<f> functionContext);
    ECStack.pop();
    ECStack.pop();
*/
```

## 5、示例 2

```javascript
var scope = 'global scope'
function checkscope() {
    var scope = 'local scope'
    function f() {
        return scope
    }
    return f
}
checkscope()()
/*
    ECStack.push(<checkscope> functionContext);
    ECStack.pop();
    ECStack.push(<f> functionContext);
    ECStack.pop();
*/
```
