<script setup lang="ts">
    import Example from './components/example.vue'
</script>

# 拖拽

拖拽：拖拽移动、拖拽改变大小

## 示例

```vue
<template>
    <BaseDrag width="440px" height="440px">
        <template #header>头部...</template>
        <template #content>内容...</template>
    </BaseDrag>
</template>
```

<!-- 示例代码 -->
<Example />

## 代码

::: details 点我查看代码
<<< @/components/BaseDrag/index.vue
:::
