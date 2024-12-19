<script setup lang="ts">
    import Example from './components/example.vue'
</script>

# 折叠组件

## 示例

```vue
<template>
    <BaseCollapseCard width="440px" height="440px">
        <template #header>头部...</template>
        <template #content>内容...</template>
    </BaseCollapseCard>
</template>
```

<!-- 示例代码 -->
<Example />

## 代码

::: details 点我查看代码
<<< @/components/BaseCollapseCard/index.vue
:::
