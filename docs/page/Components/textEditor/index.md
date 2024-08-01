<script setup lang="ts">
    import Example from './components/example.vue'
</script>

# textEditor 文本输入框

文本输入框：可插入标签内容

## 示例

```vue
<template>
    <TextEditor
        ref="textEditor"
        :varList="varList"
        varColor="red"
        v-model="content"
        placeholder="文本编辑器，可点击变量进行插入"
    />
</template>

<script setup lang="ts">
const varList = [
    {
        label: '【标签1】',
        value: 'label1'
    },
    {
        label: '【标签2】',
        value: 'label2'
    },
    {
        label: '【标签3】',
        value: 'label3'
    }
]
</script>
```

<!-- 示例代码 -->
<Example />

## 代码

::: details 点我查看代码
<<< @/components/TextEditor/index.vue
:::
