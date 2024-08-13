<!--
 * @file:
 * @author: DontK
 * @LastEditTime: 2024-08-13 14:09:28
-->

# 获取 hh:mm:ss 时间

```js
const timeFormat = (date) => date.toTimeString().slice(0, 8)
timeFormat(new Date())
```
