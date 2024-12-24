# head 标签

`<head>` 标签用于包含文档的元数据，这些元数据不会在页面上直接显示，但对页面的设置、SEO、样式、脚本和其他行为有重要影响。

主要作用

1. 定义文档标题：使用 `<title>` 标签定义页面在浏览器标签中的标题。
2. 引入样式和脚本：使用 `<link>` 标签引入外部 CSS 文件，使用 `<style>` 标签定义内联 CSS，使用 `<script>` 标签引入和定义 JavaScript 脚本。
3. 提供文档元数据：使用 `<meta>` 标签提供关于文档的描述、作者、关键词、字符集等信息。
4. 链接图标：使用 `<link>` 标签定义网站图标（favicon）。

其中 `<title>` 标签和 `<meta>` 标签是必不可少的。

## 一、title 标签

`<title>` 标签定义的是整个网页的标题。它是 HTML 文档头部 (`<head>`) 中的一个必要元素，主要用于指定网页的标题。

## 二、script 标签中 defer 和 async 有什么区别？

defer 和 async 属性用于控制脚本的加载和执行 ，都是异步加载外部的 JS 脚本文件，两者都不会阻塞 HTML 的解析。

### 主要区别

1. **执行顺序**：defer 保证脚本按照在 HTML 中出现的顺序执行，一般是在 HTML 解析完成后才执行。
   而 async 则是谁先下载完成谁先执行， async 可能会阻断解析以执行脚本。
2. **适用场景**：async 适合**不依赖于其他脚本且不被其他脚本依赖**的独立模块，例如：计数器或广告加载。

而 defer 适用于需要在 HTML 完全解析后才能运行的 JS 脚本，尤其是依赖于 DOM 的 JS 脚本。它保证了脚本执行的顺序性和依赖关系，适合用于包含多个脚本的页面。

### 扩展知识点

1. 页面性能影响
    - 性能优化：使用 defer 和 async 可以显著改善页面的加载时间。特别是在加载大型脚本或依赖多个脚本的页面时，合理使用这两个属性能减少页面渲染的阻塞时间，提升用户体验。
    - 减少首屏加载时间：由于 async 和 defer 脚本不阻塞 HTML 解析，可以帮助减少首次内容绘制（FCP）和首次有意义绘制（FMP）的时间，在做 SEO 的时候可以运用上这两个属性。
2. 脚本管理技巧：可以通过现代的模块打包工具如 Webpack 、Vite 管理脚本依赖，并自动为不同的脚本分配最合适的加载策略（例如动态导入）。

3. 历史兼容性：老旧的浏览器中可能不完全支持或表现不一致。开发时需要考虑到目标用户群体可能使用的浏览器类型。

## 三、常用的 HTML meta 标签有哪些？

> meta 是 HTML 的一个标签，用于 head 区域，主要作用是提供一些网页的属性和描述，比如网页的解析格式，网页作者信息，网页描述等等。
> 这个标签的合理使用有利于 SEO。标签属性主要有 charset(页面编码格式)，viewport(页面适配), author(作者信息)，refersh(重定向信息)等等。

`<meta>` 标签由 name 和 content 属性定义，用来描述网页文档的属性，比如网页的作者，网页描述，关键词等，除了 HTTP 标准固定了一些 name 作为大家使用的共识，还可以自定义 name。

-   name 属性在 `<meta>` 标签中用来指定元数据的名称，想描述的信息类型。
-   content 属性用来提供与 name 属性对应的实际数据或信息。值是具体的内容，可以是文本、网址或其他数据。

### 常用的 meta 标签

1. charset 声明文档使用的字符编码。一般是 UTF-8 编码，支持国际化字符集，是现代网页的标准字符集。

```html
<meta charset="UTF-8" />
```

2. viewport 是为了响应式设计而设置的，确保页面在不同设备上正确缩放和渲染。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!--
content 参数有以下几种：
width viewport：宽度(数值/device-width)；
height viewport：高度(数值/device-height)；
initial-scale：初始缩放比例；
maximum-scale：最大缩放比例；
minimum-scale：最小缩放比例；
user-scalable：是否允许用户缩放(yes/no)
-->
```

3. description 提供了页面的简短描述，这些描述在搜索引擎结果中可能会显示为页面的摘要。用于提高页面的 SEO 效果。

```html
<meta name="description" content="这是一个页面描述。" />
```

4. keywords 可以在 SEO 中设置以尝试优化搜索结果。

```html
<meta name="keywords" content="关键词1, 关键词2" />
```

5. author 用于指明文档的作者名字。

```html
<meta name="author" content="作者名" />
```

6. refresh 用于设置页面在一定时间后刷新或重定向到另一个 URL。content="30" 表示每 30 秒刷新页面一次。

```html
<meta http-equiv="refresh" content="30" />
```

7. robots 用于告诉搜索引擎蜘蛛不要索引这个页面，或不要跟踪页面上的链接。noindex 防止页面被索引，nofollow 防止搜索引擎跟踪链接。

```html
<meta name="robots" content="noindex, nofollow" />
<!--
 content 参数有以下几种：
all：文件将被检索，且页面上的链接可以被查询；
none：文件将不被检索，且页面上的链接不可以被查询；
index：文件将被检索；
follow：页面上的链接可以被查询；
noindex：文件将不被检索；
nofollow：页面上的链接不可以被查询。
 -->
```

8. X-UA-Compatible 为了指定 Internet Explorer 浏览器使用最新的内核渲染当前页面，有助于解决某些兼容性问题。

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
```

9. Open Graph 一般用于社交媒体/平台上，定义了当网页被分享时显示的标题、描述、图片和链接等信息。这些信息有助于提高链接分享的吸引力和信息的完整性。

```html
<meta property="og:title" content="标题" />
<meta property="og:description" content="描述" />
<meta property="og:image" content="图片URL" />
<meta property="og:url" content="网页URL" />
```

10. Twitter Card 与 Open Graph 类似，Twitter Card 标签允许控制分享到 Twitter 时的呈现方式。用于增加推文的吸引力和点击率。

```html
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@用户名" />
<meta name="twitter:title" content="页面标题" />
<meta name="twitter:description" content="页面描述" />
<meta name="twitter:image" content="图片URL" />
```

11. Content-Type 用来定义 HTML 文档的内容类型和字符集，但它的使用已经比较少见，因为较新的 HTML5 规范推荐使用简单的 charset（第一个）定义。

```html
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
```

## 四、DOCTYPE 文档类型(document type)

DOCTYPE 是 HTML5 中一种标准通用标记语言的文档类型声明，它的目的是**告诉浏览器（解析器）应该以什么样（html 或 xhtml）的文档类型定义来解析文档**，<!DOCTYPE> 不是一个 HTML 标签，它是一个指令，负责告诉浏览器页面使用哪个 HTML 版本进行编写。如果这个标记不存在，浏览器则会默认使用“怪异模式”来解析 HTML 文档。

### 主要作用

1. 启用浏览器的标准模式（Standards mode）或怪异模式（Quirks mode）。
2. 用于告知浏览器应使用哪种 HTML 版本来解析文档。这一声明对于确保网页在不同浏览器中的正确显示和行为具有至关重要的作用。DOCTYPE 声明位于 HTML 文档的最顶部，是文档的第一行。

### 标准模式和怪异模式的区别

1. CSS1Compat（标准模式）：浏览器按照 W3C 的标准严格解析代码，网页的显示效果和性能表现更加符合现代 web 标准。例如：语雀官网的文档类型就是 CSS1Compat**。**
2. BackCompat（怪异模式）：假如文档缺少 DOCTYPE 或使用错误的 DOCTYPE ，浏览器就可能采用这种模式，页面可能不会按照开发者的预期渲染。

不同的渲染模式会影响浏览器对 CSS 代码甚⾄ JavaScript 脚本的解析。

### 为什么重要？

正确的 DOCTYPE 声明是现代 web 开发的基础，有助于：

-   提高页面的兼容性，确保在不同的浏览器和设备上都能如预期般正常显示。
-   减少调试和维护的时间，避免了因浏览器解析差异导致的多数常见问题。
