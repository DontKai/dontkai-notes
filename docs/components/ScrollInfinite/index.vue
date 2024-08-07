<!--
 * @file: 无限滚动组件
 * @author: DontK
 * @LastEditTime: 2024-08-06 15:22:20
-->
<template>
    <div
        v-if="dataList.length"
        class="infinite-box"
        v-infinite-scroll="onLoadMore"
        :infinite-scroll-disabled="disabled"
        :infinite-scroll-distance="props.distance"
        :infinite-scroll-immediate="false"
    >
        <!-- 列表 -->
        <div class="infinite-list">
            <slot></slot>
        </div>
        <!-- 加载中 -->
        <div v-if="loading">
            <slot name="loading">
                <div class="infinite-loading" v-loading="loading"></div>
            </slot>
        </div>
        <!-- 没有更多数据 -->
        <div class="infinite-no-more" v-if="dataList.length >= params.pageSize && noMore">
            <slot name="noMore"> 没有更多数据 </slot>
        </div>
    </div>
    <div v-else class="no-data">
        <slot name="empty">
            <el-empty description="暂无数据" />
        </slot>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const emit = defineEmits(['onLoad'])
const props = withDefaults(
    defineProps<{
        distance?: number
    }>(),
    {
        distance: 30
    }
)
const dataList = defineModel<any>('list', {
    required: true,
    get(val) {
        return reactive(val || [])
    }
})
const params = defineModel<any>('params', {
    required: true,
    get(val) {
        return reactive(
            val || {
                pageNum: 1,
                pageSize: 10
            }
        )
    }
})
const loading = ref<boolean>(false)
const noMore = ref<boolean>(true)
const disabled = computed(() => loading.value || noMore.value)

// 获取列表
const getDataList = async (req: Function, isInit: boolean = false) => {
    if (isInit) {
        params.value.pageNum = 1
        noMore.value = true
        dataList.value = []
    }
    try {
        const res: any = await req(params.value)
        const list = res?.data?.list || []
        if (isInit) {
            dataList.value = list
        } else {
            dataList.value.push(...list)
        }
        if (list.length < Number(params.value.pageSize)) {
            noMore.value = true
        } else {
            noMore.value = false
        }
    } catch {
        dataList.value = []
        noMore.value = true
    } finally {
        loading.value = false
    }
}

// 加载更多报告列表
const onLoadMore = () => {
    if (noMore.value) return
    if (params.value.pageNum) {
        params.value.pageNum += 1
        loading.value = true
        setTimeout(() => {
            emit('onLoad')
        }, 200)
    }
}

defineExpose({
    getDataList
})
</script>

<style scoped lang="less">
.infinite-box {
    height: 100%;
    padding-right: 12px;
    overflow: auto;
    // 滚动条样式
    &::-webkit-scrollbar {
        display: none;
        width: 6px;
        transition: all 2s;
    }
    &::-webkit-scrollbar-track-piece {
        background-color: #f8f8f800;
    }
    &::-webkit-scrollbar-thumb {
        height: 100px;
        border-radius: 100px;
        background-color: #cccccc;
        cursor: pointer;
    }
    &::-webkit-scrollbar-thumb:hover {
        background-color: #b2b2b2;
    }
    &::-webkit-scrollbar-corner {
        background-color: rgba(255, 255, 255, 0);
    }
    .infinite-loading {
        height: 50px;
        line-height: 50px;
        font-size: 30px;
        text-align: center;
    }
    .infinite-no-more {
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        text-align: center;
        color: #b0b4c8;
    }
}
.no-data {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
html.dark .el-empty {
    --el-empty-fill-color-0: var(--el-color-black);
    --el-empty-fill-color-1: #4b4b52;
    --el-empty-fill-color-2: #36383d;
    --el-empty-fill-color-3: #1e1e20;
    --el-empty-fill-color-4: #262629;
    --el-empty-fill-color-5: #202124;
    --el-empty-fill-color-6: #212224;
    --el-empty-fill-color-7: #1b1c1f;
    --el-empty-fill-color-8: #1c1d1f;
    --el-empty-fill-color-9: #18181a;
}
</style>
