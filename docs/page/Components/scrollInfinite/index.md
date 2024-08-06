<script setup lang="ts">
    import Example from './components/example.vue'
</script>

# 无限滚动(向下)

无限滚动：基于 ElementPlus 的 infinite-scroll 组件，实现向下滚动加载列表

## 示例

```vue
<template>
    <ScrollInfinite ref="scrollInfiniteRef" v-model:list="dataList" v-model:params="searchForm" @onLoad="getDataList">
        <div class="scroll-inner">列表内容 ...</div>
    </ScrollInfinite>
</template>

<script setup lang="ts">
const searchForm = ref<any>({
    pageNum: 1,
    pageSize: 10
})
const scrollInfiniteRef = ref<any>()
const dataList = ref<any[]>([])

// 获取列表
const getDataList = async (isInit: boolean = false) => {
    scrollInfiniteRef.value!.getDataList(tableReq, isInit)
}
</script>
```

<!-- 示例代码 -->
<Example />

## 代码

::: details 点我查看代码
<<< @/components/ScrollInfinite/index.vue
:::
