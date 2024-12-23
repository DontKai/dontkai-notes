# 浏览器工具

## 工具内容

::: details 点我查看代码
<<< @/utils/browserUtils.ts
:::

## 处理微信浏览器关闭

```html
<html lang="en">
    <body>
        ...
        <script>
            // 处理微信浏览器关闭
            window.customCloseWindow = function () {
                setTimeout(function () {
                    // 安卓
                    document.addEventListener(
                        'WeixinJSBridgeReady',
                        function () {
                            WeixinJSBridge.call('closeWindow')
                        },
                        false
                    )
                    // IOS
                    WeixinJSBridge.call('closeWindow')
                }, 1000)
            }
        </script>
    </body>
</html>
```

使用

```ts
// utils-is中: 判断是否为微信浏览器
const isWXBrowser = (): boolean => {
    return /micromessenger/i.test(window.navigator.userAgent)
}
// 关闭微信浏览器
const closeWXWindow = () => {
    if (isWXBrowser()) {
        window.customCloseWindow()
    }
}
```
