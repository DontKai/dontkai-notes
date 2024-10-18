# vnodes

## h() / createVnode() 创建虚拟 dom

```vue
<script setup lang="ts">
import { h } from 'vue'

const vnode = h(
    'div', // type
    { id: 'foo', class: 'bar' }, // props
    [
        /* children */
    ]
)
</script>
```

h() 函数的使用方式非常的灵活：

```js
// 除了类型必填以外，其他的参数都是可选的
h('div')
h('div', { id: 'foo' })

// attribute 和 property 都能在 prop 中书写
// Vue 会自动将它们分配到正确的位置
h('div', { class: 'bar', innerHTML: 'hello' })

// 像 `.prop` 和 `.attr` 这样的的属性修饰符
// 可以分别通过 `.` 和 `^` 前缀来添加
h('div', { '.name': 'some-name', '^width': '100' })

// 类与样式可以像在模板中一样
// 用数组或对象的形式书写
h('div', { class: [foo, { bar }], style: { color: 'red' } })

// 事件监听器应以 onXxx 的形式书写
h('div', { onClick: () => {} })

// children 可以是一个字符串
h('div', { id: 'foo' }, 'hello')

// 没有 props 时可以省略不写
h('div', 'hello')
h('div', [h('span', 'hello')])

// children 数组可以同时包含 vnodes 与字符串
h('div', ['hello', h('span', 'hello')])
```

## 示例 1

```vue
<template>
    <div>
        <h1>使用 h 函数渲染组件并使用 ref</h1>
        <button @click="focusInput">聚焦输入框</button>
        <div ref="childComponent">
            <!-- 使用 h 函数渲染 ChildInput 组件 -->
            <ChildInput ref="inputRef" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, h } from 'vue'

// 子组件
const ChildInput = defineComponent({
    setup(_, { expose }) {
        const inputRef = ref(null)

        // 暴露输入框的聚焦方法
        const focus = () => {
            if (inputRef.value) {
                inputRef.value.focus()
            }
        }

        // 使用 expose 将 focus 方法暴露给父组件
        expose({ focus })

        return () => h('input', { ref: inputRef, type: 'text', placeholder: '请输入内容' })
    },
    props: {
        modelValue: String // v-model 的值
        // ...
    },
    emits: ['update:modelValue'] // 触发更新事件
})

// 父组件
const inputRef = ref(null)

const focusInput = () => {
    if (inputRef.value) {
        inputRef.value.focus() // 调用子组件的方法聚焦输入框
    }
}

// 在父组件中使用 h 函数渲染子组件
const ChildComponent = defineComponent({
    setup() {
        return () => h(ChildInput, { ref: inputRef }) // 使用 h 渲染子组件，并设置 ref
    }
})
</script>

<style scoped>
/* 样式可以根据需要添加 */
</style>
```

## 示例 2

```ts
// 给每个img标签  添加点击放大预览图片功能
export const changeImage = (parentName: string) => {
    const parentDom = document.getElementById(parentName)
    if (!parentDom) return
    const imgDoms = parentDom?.getElementsByTagName('img')
    if (!imgDoms) return
    const ImagePreview = (props: any) => {
        return h(ElImageViewer, {
            ...props,
            visible: true,
            onClose: () => {
                const container = document.getElementById('image-preview-container')
                if (container) {
                    render(null, container)
                }
            }
        })
    }
    Array.from(imgDoms).forEach((element: HTMLElement) => {
        if (element.onclick || element.getAttribute('noEnlarge')) return
        element.onclick = () => {
            let container: any = null
            const oldContainer = document.getElementById('image-preview-container')
            if (oldContainer) {
                container = oldContainer
            } else {
                container = document.createElement('div')
                container.id = 'image-preview-container'
            }
            document.body.appendChild(container) // Render the ImagePreview component into the container
            render(
                h(ImagePreview, {
                    urlList: [element.src], // Example image URL
                    initialIndex: 0
                }),
                container
            )
        }
    })
}
```
