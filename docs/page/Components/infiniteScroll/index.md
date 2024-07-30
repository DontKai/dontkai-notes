<script setup lang="ts">
    import Example from './components/example.vue'
</script>

# 无限滚动

无限滚动：滚动加载列表

## 示例

```vue
<template>
    <InfiniteScroll
        ref="infiniteScrollRef"
        v-model:list="dataList"
        v-model:pageNum="pageInfo.pageNum"
        :pageSize="pageInfo.pageSize"
        @onLoad="getDataList"
    >
        <div class="scroll-inner">列表内容 ...</div>
    </InfiniteScroll>
</template>

<script setup lang="ts">
const pageInfo = ref<any>({
    pageNum: 1,
    pageSize: 10
})
const infiniteScrollRef = ref<any>()
const dataList = ref<any[]>([])
</script>
```

<!-- 示例代码 -->
<Example />

## 代码

::: details 点我查看代码
<<< @/components/InfiniteScroll/index.vue
:::
