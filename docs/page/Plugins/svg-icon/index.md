# Svg-Icon

## 文件结构

```
.                          # 项目根目录
├─ src
│  ├─ assets               # 项目静态资源
│  │    └─ svg             # svg图标
│  │        └─ xxx.svg
│  └─ plugins              # 项目插件
│       └─ SVGIcon         # svg图标插件
│           └─ index.ts
├─ package.json            # 项目依赖包
├─ vite.config.ts          # vite配置
└─ ...
```

## components - SvgIcon - index.vue

::: details 点我查看代码
<<< @/components/SvgIcon/index.vue
:::

## plugins - SVGIcon - index.ts

::: details 点我查看代码
<<< @/plugins/SVGIcon/index.ts
:::

## package.json

```json
{
    "devDependencies": {
        "vite-plugin-svg-icons": "^2.0.1",
        "vite-svg-loader": "^4.0.0"
    }
}
```

## vite.config.ts

```ts
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// eslint-disable-next-line import/no-extraneous-dependencies
import svgLoader from 'vite-svg-loader'

export default defineConfig(() => {
    return {
        plugins: [
            svgLoader({ defaultImport: 'url' }), // 将 SVG 静态图转化为 Vue 组件
            createSvgIconsPlugin({
                iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
                symbolId: 'icon-[dir]-[name]'
            })
        ]
    }
})
```
