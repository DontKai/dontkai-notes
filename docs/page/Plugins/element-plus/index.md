# Element-Plus

## 按需引入

### package.json

```json
{
    "dependencies": {
        "@element-plus/icons-vue": "^2.3.1",
        "element-plus": "^2.7.6"
    }
}
```

### plugins - ElementPlus - element-plus-icon.ts

::: details 点我查看代码
<<< @/plugins/ElementPlus/element-plus-icon.ts
:::

### plugins - ElementPlus - element-plus.ts

::: details 点我查看代码
<<< @/plugins/ElementPlus/element-plus.ts
:::

### plugins - ElementPlus - index.ts

::: details 点我查看代码
<<< @/plugins/ElementPlus/index.ts
:::

## 自动导入

### package.json

```json
{
    "dependencies": {
        "@element-plus/icons-vue": "^2.3.1",
        "element-plus": "^2.7.6"
    },
    // 自动导入相关
    "devDependencies": {
        "unplugin-auto-import": "^0.17.2",
        "unplugin-vue-components": "^0.26.0"
    }
}
```

### vite.config.ts

```ts
// element 自动引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ mode }) => {
    return {
        plugins: [
            AutoImport({
                imports: ['vue'], // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
                resolvers: [ElementPlusResolver()], // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
                dts: './auto-imports.d.ts',
                eslintrc: {
                    enabled: true // 如有用到eslint记得加上写段，没有用到可以忽略
                }
            }),
            Components({
                resolvers: [ElementPlusResolver()], // 自动导入 Element Plus 组件
                dts: './components.d.ts'
            })
        ]
    }
})
```

### tsconfig.json

```json
{
    "include": [
        "src/**/*.ts",
        "src/**/*.d.ts",
        "src/**/*.tsx",
        "src/**/*.vue",
        "./auto-imports.d.ts", // 添加自动导入的类型声明文件
        "./components.d.ts" // 添加自动导入的类型声明文件
    ]
}
```

### .gitignore

```
auto-imports.d.ts
components.d.ts
```

### .eslintrc.js

```js
module.exports = {
    ...
    extends: [
        'plugin:vue/vue3-essential',
        'airbnb-base',
        'plugin:prettier/recommended',
        './.eslintrc-auto-import.json' // 添加自动导入eslint规则，会自动生成文件
    ]
    ...
};

```
