# CSS3 通用 2

## 六、说说你对 BFC 的理解，如何创建 BFC？

BFC（块级格式化上下文，Block Formatting Context）是 CSS 中一种非常重要的布局概念，是一个独立的渲染区域，使其内部的布局不受外部元素影响。了解 BFC 有助于解决浮动、清除浮动、边距重叠等常见布局问题。

创建 BFC 非常简单，常见的方法有：

1. 设置元素的 float 属性为 left 或 right。
2. 设置元素的 position 属性为 absolute 或 fixed。
3. 设置元素的 display 属性为 inline-block 或 table-cell 等。
4. 设置元素的 overflow 属性为 hidden、auto 或 scroll。

## 七、line-height: 100% 和 line-height: 1 的区别？

```css
/* 行间距设置为字体大小的 100%，计算后的具体像素值会被继承 */
line-height: 100%;
/* 行间距设置为字体大小的 100%（1 倍），这个乘数因子会被继承，子元素会用自己的 font-size 去计算 */
line-height: 1;
```
