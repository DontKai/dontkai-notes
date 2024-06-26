# 重绘 和 重排（回流）

> 重绘不一定导致重排，但重排一定会导致重绘<br/>
> 重排（Reflow） && 重绘（Redraw）会付出高昂的性能代价

## 重绘

**重绘 （Redraw）**：某些元素的外观被改变所触发的浏览器行为（重新计算节点在屏幕中的绝对位置并渲染的过程）； 例如：修改元素的填充颜色，会触发重绘；

### 哪些操作会导致重绘

-   color
-   border-style
-   border-radius
-   text-decoration
-   box-shadow
-   outline
-   background
-   ...

## 重排（回流）

**重排 （Reflow）** ：重新生成布局，重新排列元素（重新计算各节点和 css 具体的大小和位置：渲染树需要重新计算所有受影响的节点）；例如：改元素的宽高，会触发重排；
通过两者概念区别明显得知，重排要比重绘的成本大得多，我们应该尽量减少重排操作，减少页面性能消耗

### 哪些操作会导致重排

-   页面初始渲染，这是开销最大的一次重排;
-   添加/删除可见的 DOM 元素;
-   改变元素位置;
-   改变元素尺寸，比如边距、填充、边框、宽度和高度等;
-   改变元素内容，比如文字数量，图片大小等;
-   改变元素字体大小;
-   改变浏览器窗口尺寸，比如 resize 事件发生时;
-   激活 CSS 伪类（例如：:hover）;
-   设置 style 属性的值，因为通过设置 style 属性改变结点样式的话，每一次设置都会触发一次 reflow;
-   查询某些属性或调用某些计算方法：offsetWidth、offsetHeight 等，除此之外，当我们调用 getComputedStyl 方法，或者 IE 里的 currentStyle 时，也会触发重排，原理是一样的，都为求一个“即时性”和“准确性”;
-   ...

### 重排影响的范围

-   全局范围（全局布局）：从根节点 html 开始对整个渲染树进行重新布局；
-   局部范围（局部布局）：对渲染树的某部分或某一个渲染对象进行重新布局；

## 优化建议

> 核心观念： 减少重排次数和减小重排范围

### 样式集中改变（减少重排次数）

示例：操作会导致 3 次重绘 1 次重排; 可以动态添加 class，只会导致 1 次重排（重排会引起重绘），从而减少重绘次数;

:::code-group

```html
<span id="demo"> 我是demo </span>
```

```javascript [修改前]
// renderEle.style 逐个添加/修改属性值
const renderEle = d、ocument.getElementById('demo');
renderEle.style.color = 'red'; // 导致重绘
renderEle.style.background= '#ccc'; // 导致重绘
renderEle.style.padding = '15px 20px'; // 导致重排（重排会引起重绘）

```

```javascript [修改后]
document.getElementById('demo').className = 'demo' // 添加class 统一添加/修改样式
```

```css
.demo {
    color: red;
    background: #ccc;
    padding: 15px 20px;
}
```

:::

### 将 DOM 离线（减少重排次数）

-   对 DOM 节点有较大改动的时候，我们先将元素脱离文档流，然后对元素进行操作，最后再把操作后的元素放回文档流。

-   修改 DOM 节点的 display 属性，临时将此节点从文档流中脱离，然后再恢复；

示例：需要频繁操作 DOM 修改 style， 操作触发多次重排、重绘
:::code-group

```html
<span id="demo"> 我是demo </span>
```

```javascript [修改前]
// 第一次操作修改 color、background、padding
const renderEle = document.getElementById('demo')
renderEle.style.color = 'red' // 导致重绘
renderEle.style.background = '#ccc' // 导致重绘
renderEle.style.padding = '15px 20px' // 导致重排（重排会引起重绘）
// ...
// 第二次操作修改 marginLeft、marginTop
const renderEle = document.getElementById('demo')
renderEle.style.marginLeft = '15px' // 导致重排（重排会引起重绘）
renderEle.style.marginTop = '15px' // 导致重排（重排会引起重绘）
// ...
// 第三次操作修改 border
const renderEle = document.getElementById('demo')
renderEle.style.border = '2px solid #ccc' // 导致重排（重排会引起重绘）
```

```javascript [修改后]
const renderEle = document.getElementById('demo')
// 第一次操作修改 color、background、padding
renderEle.style.display = 'none' // 导致重排（重排会引起渲）
renderEle.style.color = 'red' // DOM不存在渲染树上不会引起重排、重绘
renderEle.style.background = '#ccc' // DOM不存在渲染树上不会引起重排、重绘
renderEle.style.padding = '15px 20px' // DOM不存在渲染树上不会引起重排、重绘
// ...
// 第二次操作修改 marginLeft、marginTop
renderEle.style.marginLeft = '15px' // DOM不存在渲染树上不会引起重排、重绘
renderEle.style.marginTop = '15px' // DOM不存在渲染树上不会引起重排、重绘
// ...
// 第三次操作修改 border
renderEle.style.border = '2px solid #ccc' // DOM不存在渲染树上不会引起重排、重绘
renderEle.style.display = 'block' // 导致重排（重排会引起渲）
```

:::

### 脱离文档流： 使用 absolute 或 fixed 脱离文档流（减小重排范围）

示例：将需要重排的元素，position 属性设为 absolute 或 fixed(某些特殊场合)，减小重排范围。

:::code-group

```html
<div id="demo">
    <span id="demo-one"> 我是demo 1号 </span>
    <span id="demo-two"> 我是demo 2号 </span>
    <span id="demo-there"> 我是demo 3号 </span>
</div>
```

```javascript [修改前]
const renderEle = document.getElementById('demo-one')
renderEle.style.padding = '15px 20px' // 导致重排（重排会引起重绘）
renderEle.style.height = '60px' // 导致重排（重排会引起重绘）
```

```javascript [修改后]
const renderEle = document.getElementById('demo-one')
renderEle.style.position = 'fixed' // 导致重排（重排会引起重绘）
renderEle.style.padding = '15px 20px' // 导致重排（只有当前元素）
renderEle.style.height = '60px' // 导致重排（只有当前元素）
```

:::

### 善用内存：在内存中多次操作 DOM，再整个添加到 DOM 树(减小重排范围)

示例：异步请求接口获取数据，动态渲染到页面

:::code-group

```html [修改前html]
<div id="demo">
    <ul id="father">
        <li>我是0号,我后面还有1号、2号、3号、4号、5号</li>
    </ul>
</div>
```

```javascript [修改前js]
const ulEle = document.getElementById("father");
let arr = [];
setTimeout( () => {
  arr = "我是0号,我后面还有1号，2号，3号，4号，5号", "我是2号", "我是3号", "我是4号", "我是5号"]; // 我是动态获取的
  arr.forEach(element => {
    const childNode = document.createElement('li');
    childNode.innerText = element;
    ulEle.appendChild(childNode);// 每一次都会引起重排（重排会引起重绘）
  })
},1000)

```

```html [修改后html]
<div id="demo"></div>
```

```javascript [修改后js]
// 可以进行以下修改(构建整个ul，而不是循环添加li)：
const ulEle = document.getElementById('demo')
const childUlNode = document.createElement('ul')
let arr = []
setTimeout(() => {
    arr = ['我是0号,我后面还有1号，2号，3号，4号，5号', '我是1号', '我是2号', '我是3号', '我是4号', '我是5号'] // 我是动态获取的
    arr.forEach((element) => {
        const childLiNode = document.createElement('li')
        childLiNode.innerText = element
        childUlNode.appendChild(childLiNode)
    })
}, 1000)
ulEle.appendChild(childUlNode) // 只会引起一次重排（重排会引起重绘）
```

:::

### 读写分离：将写入的值缓存，读取缓存的值（减少重排次数）

示例：有一些浏览器针对重排做出来优化。
比如 Opera：当你触发重排的条件到达一定量的时候， 或者等到一定时间的时候，或者等一个线程结束，再一起进行重排；但除了渲染树的直接变化，当获取一些属性时，浏览器为取得正确的值也会触发重排。这样就使得浏览器的优化失效了；

:::code-group

```javascript [修改前]
const offsetWidth = '100px'
const renderEle = document.getElementById('demo')
renderEle.style.offsetWidth = offsetWidth // 导致重绘(写入)
const tempoOffsetWidth = renderEle.style.offsetWidth // 读取可能会导致重排
```

```javascript [修改后]
const offsetWidth = '100px';
const renderEle = document.getElementById('demo');
renderEle.style.offsetWidth = offsetWidth // 导致重绘(写入)
const tempoOffsetWidth = renderEle； // 避免直接读取offsetWidth，直接存储dom
```

:::
