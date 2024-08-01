# Electron

Electron 是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架。

## 文件结构

```
.                          # 项目根目录
├─ dist-electron           # 打包后的目录
│  └─ ...
├─ electron                # electron相关文件
│  ├─ loading.html         # 加载页面
│  ├─ main.js              # 主进程入口文件
│  ├─ preload.js           # 预加载脚本
│  └─ update.js            # 更新脚本
├─ .eslintignore           # eslint忽略文件
├─ .gitignore              # git忽略文件
├─ electron-builder.json   # electron打包配置
├─ package.json            # 项目依赖包
├─ vite.config.ts          # vite配置
└─ ...
```

## electron - loading.html

::: details 点我查看代码
<<< @/electron/loading.html
:::

## electron - main.js

::: details 点我查看代码
<<< @/electron/main.js
:::

## electron - preload.js

::: details 点我查看代码
<<< @/electron/preload.js
:::

## electron - update.js

::: details 点我查看代码
<<< @/electron/update.js
:::

## .eslintignore

```
public
electron/*.js
```

## .gitignore

```
dist-electron
```

## electron-builder.json

```json
{
    "productName": "isrllm-exe", // 项目名称
    "compression": "maximum",
    "asar": true,
    "directories": {
        "output": "dist-electron/" // 打包后的目录
    },
    "files": ["dist", "electron", "public"], // 打包文件
    "nsis": {
        "oneClick": false,
        "allowToChangeInstallationDirectory": true,
        "perMachine": true,
        "deleteAppDataOnUninstall": true,
        "createDesktopShortcut": true,
        "createStartMenuShortcut": true,
        "shortcutName": "isrllm-exe"
    },
    // windows打包
    "win": {
        "icon": "dist/logo.png", // 图标
        "artifactName": "${productName}-v${version}-${env.NODE_ENV}-win-setup.${ext}", // 打包后的文件名
        "target": [
            {
                "target": "nsis"
            }
        ]
    },
    // mac打包
    "mac": {
        "icon": "dist/logo.png",
        "artifactName": "${productName}-v${version}-mac-setup.${ext}"
    },
    "linux": {
        "icon": "dist/logo.png",
        "artifactName": "${productName}-v${version}-linux-setup.${ext}"
    },
    "publish": [
        {
            "provider": "generic",
            "url": "http://isrllm.test.adas.com/download" // 发布地址
        }
    ]
}
```

## package.json

```json
{
    "main": "./electron/main.js", // electron默认入口文件
    "scripts": {
        // 测试环境打包：先打包vite 打包后，再打包electron
        "build:electron": "vite build --mode development && NODE_ENV=test electron-builder --win --x64",
        // 正式环境打包：先打包vite 打包后，再打包electron
        "build:electron:pro": "vite build --mode production && NODE_ENV=prod electron-builder --win --x64"
    },
    "dependencies": {
        "electron-log": "^5.1.6", // 输出日志
        "electron-updater": "^6.2.1", // 自动更新
        "vite-plugin-electron": "^0.28.7" // vite 插件 electron
    },
    "devDependencies": {
        "electron": "^31.1.0", // electron
        "electron-builder": "^24.13.3" // electron打包
    }
}
```

## vite.config.ts

```ts
import electron from 'vite-plugin-electron'

export default defineConfig(() => {
    return {
        plugins: [
            electron({
                // 主进程入口文件
                entry: './electron/main.js'
            })
        ]
    }
})
```
