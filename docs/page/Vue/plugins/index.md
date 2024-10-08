# 插件

插件 (Plugins) 是一种能为 Vue 添加全局功能的工具代码。下面是如何安装一个插件的示例：

```ts
import { createApp } from 'vue'

const app = createApp({})

app.use(myPlugin, {
    /* 可选的选项 */
})
```

一个插件可以是一个拥有 `install()` 方法的对象，也可以直接是一个安装函数本身。安装函数会接收到安装它的应用实例和传递给 `app.use()` 的额外选项作为参数：

```ts
const myPlugin = {
    install(app, options) {
        // 配置此应用
    }
}
```

插件没有严格定义的使用范围，但是插件发挥作用的常见场景主要包括以下几种：

1. 通过 `app.component()` 和 `app.directive()` 注册一到多个全局组件或自定义指令。

2. 通过 `app.provide()` 使一个资源可被注入进整个应用。

3. 向 `app.config.globalProperties` 中添加一些全局实例属性或方法

4. 一个可能上述三种都包含了的功能库 (例如 `vue-router`)。
