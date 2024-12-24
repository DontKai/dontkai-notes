# HTML5 新特性

## 1、语义化标签

```
<hrader></header>       定义了文档的头部区域
<footer></footer>	    定义了文档的尾部区域
<nav></nav>	            定义文档的导航
<section></section>	    定义文档中的节（section、区段）
<article></article>	    定义页面独立的内容区域
<aside></aside>	        定义页面的侧边栏内容
<detailes></detailes>   用于描述文档或文档某个部分的细节
<summary></summary>	    标签包含 details 元素的标题
<dialog></dialog>	    定义对话框，比如提示框
```

## 2、增强型表单

### 新增 5 个表单元素

```
<progress></progress>   进度条，展示连接/下载进度
<meter></meter>         刻度值，用于某些计量，例如温度、重量等
<keygen></keygen>       提供一种验证用户的可靠方法生成一个公钥和私钥
<output></output>       用于不同类型的输出比如计算或脚本输出
<datalist></datalist>   用户会在他们输入数据时看到定义域选项的下拉列表
```

### 新增多个表单输入类型

```
color               主要用于选取颜色
date                从一个日期选择器选择一个日期
datetime            选择一个日期（UTC 时间）
datetime-local      选择一个日期和时间 (无时区)
email               包含 e-mail 地址的输入域
month               选择一个月份
number              数值的输入域
range               一定范围内数字值的输入域
search              用于搜索域
tel                 定义输入电话号码字段
time                选择一个时间
url                 URL 地址的输入域
week                选择周和年
```

### 新增表单属性

```
placehoder      输入框默认提示文字
required        要求输入的内容是否可为空
pattern         描述一个正则表达式验证输入的值
min/max         设置元素最小/最大值 step 为输入域规定合法的数字间隔
height/wdith    用于image类型<input />标签图像高度/宽度
autofocus       规定在页面加载时，域自动获得焦点
multiple        规定<input />元素中可选择多个值
```

## 3、视频和音频

```html
<!-- 音频 -->
<audio controls>
    <source src="audio.mp3" type="audio/mp3" />
    您的浏览器不支持音频标签。
</audio>

<!-- 视频 -->
<video width="320" height="240" controls>
    <source src="movie.mp4" type="video/mp4" />
    您的浏览器不支持视频标签。
</video>
```

## 4、Canvas 绘图

```html
<canvas id="myCanvas" width="500" height="500"></canvas>
<script>
    var canvas = document.getElementById('myCanvas')
    var ctx = canvas.getContext('2d')
    ctx.fillStyle = '#FF0000'
    ctx.fillRect(50, 50, 200, 200) // 绘制一个红色矩形
</script>
```

## 5、SVG 绘图

## 6、地理位置

```javascript
navigator.geolocation.getCurrentPosition(
    function (pos) {
        console.log('用户定位数据获取成功')
        console.log('定位时间：', pos.timestamp)
        console.log('经度：', pos.coords.longitude)
        console.log('纬度：', pos.coords.latitude)
        console.log('海拔：', pos.coords.altitude)
        console.log('速度：', pos.coords.speed)
    }, //定位成功的回调
    function (err) {
        console.log('用户定位数据获取失败')
    } //定位失败的回调
)
```

## 7、拖放 Api

## 8、Web Worker

当在 HTML 页面中执行脚本时，页面的状态是不可响应的，直到脚本已完成。web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。

优点
为 js 创建多线程环境。js 在主线程执行，new 一个子线程在后台执行。worker 完成计算的任务返回给主线程，UI 交互流畅，不会被阻塞。主线程中的代码执行会导致浏览器响应阻塞，而子线程代码执行不会。主线程和子线程两者互补干扰，独立执行。

```js
// 创建 Web Worker
var worker = new Worker('worker.js')
worker.postMessage('开始工作')

// worker.js
onmessage = function (e) {
    console.log('接收到消息：' + e.data)
    postMessage('工作完成')
}
```

## 9、Web Storage

localStorage 与 sessionStorage

## 10、WebSocket

```js
// 创建 WebSocket 连接
var socket = new WebSocket('ws://example.com/socket')

// 监听消息
socket.onmessage = function (event) {
    console.log('接收到消息：', event.data)
}

// 发送消息
socket.send('Hello, Server!')
```
