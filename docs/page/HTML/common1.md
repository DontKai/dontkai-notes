# HTML5 其他

## 一、HTML 的 src 和 href 属性有什么区别？

### src 加载机制

-   触发立即加载： 浏览器在解析到带有 src 属性的元素时，会立即向指定 URL 发送请求。
-   阻塞行为： 对于 `<script>`，如果没有加 async 或 defer 属性，浏览器会暂停 HTML 的解析，等待脚本加载并执行完成。
-   非阻塞行为： 对于 `<img>` 和 `<iframe>`，资源加载是异步的，不会阻塞页面解析。

### src 的性能优化

-   异步加载脚本：
    -   使用 async 属性让脚本与 HTML 解析并行加载，加载完成后立即执行。
    -   使用 defer 属性让脚本与 HTML 解析并行加载，但执行顺序与页面解析顺序一致，且在解析完成后才执行。
-   图片懒加载：
    -   添加 loading="lazy" 属性，延迟加载不在视口范围内的图片。
-   CDN 优化：
    -   将常用的脚本（如 jQuery、FontAwesome）存储在 CDN 上，提高加载速度。
-   资源压缩：
    -   对图像资源使用更高效的格式（如 WebP）。
    -   对脚本资源进行压缩和丑化（Minification）。

### href 加载机制

-   资源引用： 浏览器解析到 href 时，标记该资源为外部引用，不会立即加载到页面中。
-   延迟加载： 对于 `<a>` 标签，用户点击链接后，才会触发页面跳转。
-   预加载情况： 对于 `<link rel="stylesheet">`，浏览器会解析 CSS 并应用到页面中，可能会延迟页面的渲染（Render Blocking）。

### href 的性能优化

-   预加载关键资源：
    -   使用 `<link rel="preload" href="style.css" as="style">` 指定关键资源，提高页面加载速度。
-   防止阻塞渲染：
    -   将非关键 CSS 文件标记为延迟加载，例如：`<link rel="stylesheet" href="style.css" media="print" onload="this.media='all';">`。
-   动态加载：
    -   使用 JavaScript 动态创建 `<link>` 标签以加载非必要资源。

## 二、iframe 有哪些优点和缺点？

`<iframe>` 是一个非常强大的 HTML 元素，允许我们在当前网页中嵌入另一个独立的网页。在集成第三方内容如视频、地图等方面非常有用。但是用了太多的 `<iframe>` 会影响页面加载速度，并对 SEO 和网页的可访问性带来挑战。

### 优点

1. 内容隔离：将第三方内容（如视频、地图）嵌入页面，不影响主页面的样式和脚本。
2. 防止嵌入内容的恶意脚本：可以阻止嵌入内容与主页面直接交互，减少 XSS 风险。
3. 应用集成：方便集成支付网关、社交媒体等外部服务，无需重构页面。
4. 简化管理：适用于频繁更新的内容（如新闻、天气），集中管理更简单。

### 缺点

1. 性能问题：每个 `<iframe>` 都需要独立的 HTTP 请求，会增加页面加载时间，会阻塞主页面的 onload 事件，特别是多个 `<iframe>` 时。
2. SEO 影响：搜索引擎会忽略 `<iframe>` 中的内容，影响搜索排名。
3. 可访问性：对屏幕阅读器不友好，需要适当的标题和描述。
4. 布局和响应式设计：固定大小的 `<iframe>` 难以适应不同屏幕，需要额外的 CSS 调整。
5. 跨域问题：同源政策限制了与不同域的 `<iframe>` 内容交互，但绕过这些限制可能带来安全风险。
6. `<iframe>` 可能嵌入来自不受信任源的内容。如果该内容包含恶意脚本，可能导致跨站脚本攻击（XSS）。攻击者可以在嵌入的页面内执行 JavaScript，窃取用户的敏感信息（如 cookies）或篡改页面内容。(`<object>`：可以替代 `<iframe>` 嵌入其他 HTML 或多媒体文件。 AJAX/Fetch：适用于动态加载内容，并直接将其插入到页面中，避免了 `<iframe>` 的性能问题。)

## 三、HTML 中，img 标签 srcset 属性的作用是什么？

允许我们为 `<img>` 标签指定多个源图像，并根据设备的屏幕大小和分辨率来选择最合适的图像。这样做的好处是可以避免在小屏设备上加载过大的图像，节省带宽并提升页面的加载速度。

### 主要作用

srcset 属性可为同一图像提供多个文件源和各自的分辨率描述符。浏览器会根据当前设备的屏幕尺寸（如宽度）和像素密度（如 DPI ）来选择最合适的图像源进行加载。这样，就能 获得与其设备相匹配的最佳图像体验，而不必加载比所需更大或更高分辨率的图像，从而节省带宽并加快页面加载速度。用法如下：

```html
<img src="small.jpg" srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 1500w" alt="示例图片" />
<!-- 一般情况下，srcset 和 sizes 属性一起使用，sizes 可以帮助浏览器更准确地知道在不同视图下应该显示多大的图像 -->
<img
    src="small.jpg"
    srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 1500w"
    sizes="(max-width: 600px) 500px, (max-width: 900px) 1000px, 1500px"
    alt="示例图像"
/>
<!--
srcset：
    列出了三个图像源和它们各自的宽度描述符。500w、1000w和1500w告诉浏览器每个图像的自然宽度。
sizes：
    当视口宽度最大为 600px 时，图像的显示大小应为 500px 宽。
    当视口宽度最大为 900px 时，图像的显示大小应为 1000px 宽。
    如果视口宽度超过 900px 时，图像的显示大小应为 1500px 宽。
 -->
```

### 扩展知识

srcset 还可以与 `<picture>` 元素结合使用。`<picture>` 元素提供了更复杂的图像源选项，可以根据不同的媒体条件（如屏幕宽度和分辨率）指定不同的图像源。

```html
<picture>
    <source
        media="(min-width: 800px)"
        srcset="large-1.jpg 1x, large-2.jpg 2x"
        sizes="(min-width: 1200px) 600px, (min-width: 1000px) 50vw, 100vw"
    />
    <source media="(min-width: 400px)" srcset="medium-1.jpg 1x, medium-2.jpg 2x" />
    <img src="default.jpg" srcset="small-1.jpg 1x, small-2.jpg 2x" alt="Responsive image" />
</picture>
<!--
<source> 元素：
    第一个 <source> 元素针对视口宽度至少为 800px 的设备。使用 srcset 提供了两种分辨率（1x 和 2x）的大图像，适用于高分辨率显示设备。
    sizes 属性进一步定义了不同视口宽度下图像的显示宽度，提供更精细的控制。
    第二个 <source> 元素针对视口宽度至少为 400px 的设备。同样使用 srcset 提供普通和高分辨率的中等尺寸图像。
<img> 元素：
    作为所有 <source> 元素的后备选项。如果没有任何 <source> 元素的条件被满足，或者浏览器不支持 <picture> 元素，将加载 <img> 中定义的图像。
    这里还使用了 srcset 来为小图提供不同分辨率的版本。
 -->
```
