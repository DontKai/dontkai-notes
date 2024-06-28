# 事件流

DOM 事件流（event flow ）存在三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段

-   事件源（Event Source)：事件的来源，即导致事件发生的对象或组件。

-   事件对象（Event）：在处理事件时自动创建的对象，它包含了与事件相关的信息和方法（事件对象是在事件发生时由浏览器创建的对象，包含有关事件的详细信息，如事件类型、目标元素、鼠标位置等）。

-   事件目标元素（Event Target）：是一个接口，表示能够接收事件的目标对象（在 DOM 中，几乎所有的节点类型都实现了  EventTarget  接口，包括元素节点、文档节点和文档片段等）（事件最初发生的元素(最小节点)）。

-   事件处理程序（Event Handler）：确定控件如何响应事件的事件过程（当对象（如按钮、文本框等）发生某个事件（如点击、输入等）时，会执行与此事件相应的事件处理程序）。

## addEventListener

addEventListener 方法中，一般只会用到两个参数，一个是需要绑定的事件，另一个是触发事件后要执行的函数，然而 addEventListener 还可以传入第三个参数：默认值是 false，表示在事件冒泡;如果参数为 true，则表示在事件捕获

```javascript
element.addEventListener(event, function, useCapture);
```

## 1. 事件捕获

事件捕获（event capturing）： 当鼠标点击或者触发 dom 事件时（被触发 dom 事件的这个元素被叫作事件源），浏览器会从根节点 =>事件源（由外到内）进行事件传播。

事件捕获与事件冒泡是比较类似的，最大的不同在于事件传播的方向。

```javascript
const big = document.querySelector('.big')
const center = document.querySelector('.center')
const small = document.querySelector('.small')

big.addEventListener(
    'click',
    () => {
        console.log('big: ', big)
    },
    true
)
small.addEventListener(
    'click',
    () => {
        console.log('small: ', small)
    },
    true
)
center.addEventListener(
    'click',
    () => {
        console.log('center: ', center)
    },
    true
)
// 'big: ', big
// 'center: ', center
// 'small: ', small
```

## 2. 事件冒泡

事件冒泡（dubbed bubbling）：当一个元素接收到事件的时候，会把他接收到的事件传给自己的父级，一直到 window （注意这里传递的仅仅是事件，例如 click、focus 等等这些事件，  并不传递所绑定的事件函数。）

事件源 =>根节点（由内到外）进行事件传播。

```javascript
const big = document.querySelector('.big')
const center = document.querySelector('.center')
const small = document.querySelector('.small')

big.addEventListener('click', () => {
    console.log('big: ', big)
})
small.addEventListener('click', () => {
    console.log('small: ', small)
})
center.addEventListener('click', () => {
    console.log('center: ', center)
})
// 'small: ', small
// 'center: ', center
// 'big: ', big
```

## 3. 事件委托

事件委托也称为事件代理。就是利用事件冒泡，把子元素的事件都绑定到父元素上。如果子元素阻止了事件冒泡，那么委托就无法实现。

事件监听器设置在其父节点上，然后利用冒泡原理影响设置每个子节点。
