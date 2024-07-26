<script setup lang="ts">
    // import Example from './components/example.vue'
</script>

# v-dragResize 拖拽放大缩小

## 组件代码

::: details 点我查看代码
<<< ./components/baseDrag.vue
:::

## 使用示例

::: details 点我查看代码

```vue
<BaseDrag
    width="440px"
    height="440px"
    v-dragResize="{
        dragMoveId: 'dragHeader',
        dragTopId: 'dragTop',
        dragRightId: 'dragRight',
        dragBottomId: 'dragBottom',
        dragLeftId: 'dragLeft',
        minWidth: 440,
        minHeight: 440
    }"
/>
```

:::

<!-- 示例代码 -->
<!-- <Example /> -->

## 代码

::: details 点我查看代码
<<< @/directive/dragResize/index.ts
:::
