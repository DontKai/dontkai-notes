<!--
 * @file: 无限滚动组件
 * @author: DontK
 * @LastEditTime: 2024-08-06 18:24:41
-->
<template>
    <div class="infinite-box">
        {{ topLoading }}
        {{ bottomLoading }}
        <el-scrollbar ref="scrollbarDom" @scroll="scroll">
            <!-- 没有更多数据 -->
            <div class="infinite-no-more" v-if="topNoMore">
                <slot name="noMore"> 没有更多数据 </slot>
            </div>
            <!-- 向上加载中 -->
            <div v-show="topLoading">
                <slot name="loading">
                    <div class="infinite-loading" v-loading="topLoading"></div>
                </slot>
            </div>
            <!-- 列表 -->
            <div class="infinite-list" v-if="dataList.length">
                <slot></slot>
            </div>
            <!-- 暂无数据 -->
            <div v-else class="no-data">
                <slot name="empty">
                    <el-empty description="暂无数据" />
                </slot>
            </div>
            <!-- 向下加载中 -->
            <div v-show="bottomLoading">
                <slot name="loading">
                    <div class="infinite-loading" v-loading="bottomLoading"></div>
                </slot>
            </div>
            <!-- 没有更多数据 -->
            <div class="infinite-no-more" v-if="bottomNoMore">
                <slot name="noMore"> 没有更多数据 </slot>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick } from 'vue'

const emit = defineEmits(['onLoad'])
const props = withDefaults(
    defineProps<{
        distance?: number // 距离上/下距离 加载数据
        initLoading?: boolean // 初始加载 使用上/下 加载loading
    }>(),
    {
        distance: 80,
        initLoading: false
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
const scrollbarDom = ref<any>()
// 向上滚动
const topLoading = ref<boolean>(false)
const topPageNum = ref<number>(1)
const topNoMore = ref<boolean>(false)
// 向下滚动
const bottomLoading = ref<boolean>(false)
const bottomPageNum = ref<number>(1)
const bottomNoMore = ref<boolean>(false)
const lastScrollHeight = ref<number>(0) // 滚动最后高度
const lastHeight = ref<any>(0) // 初次滚动最后高度

/**
 * @description:  获取列表
 * @param req 请求接口
 * @param initType 初始类型 0-不初始数据 1-初始数据 2-初始数据-不重置分页
 * @param nextPage 是否下一页
 */
const getDataList = async (req: Function, initType: 0 | 1 | 2 = 1, nextPage?: boolean) => {
    if (initType) {
        dataList.value = []
        lastScrollHeight.value = 0
        lastHeight.value = 0
        topNoMore.value = false
        bottomNoMore.value = false
        if (props.initLoading) {
            topLoading.value = false
            bottomLoading.value = true
        }
        if (initType === 1) {
            params.value.pageNum = 1
            topPageNum.value = 1
            bottomPageNum.value = 1
        }
    }
    try {
        const res: any = await req(params.value)
        const list = res?.data?.list || []
        // 初始加载数据
        if (initType) {
            dataList.value = [...list]
            console.log(list.length < Number(params.value.pageSize))
            if (list.length < Number(params.value.pageSize)) {
                // 初始页码为1
                if (params.value.pageNum === 1) {
                    topNoMore.value = true
                } else {
                    // 初始页码不为1，则数据不够需要获取上一页的数据
                    // (例如：直接设置页码为某一页数据，设置的页码可能为最后一页，数据量不够pageSize)
                    topNoMore.value = true
                    bottomLoading.value = true
                    bottomPageNum.value -= 1
                    params.value.pageNum = bottomPageNum.value
                    emit('onLoad', 0, true)
                }
            } else {
                topNoMore.value = false
                bottomNoMore.value = false
                nextTick(() => {
                    scrollbarDom.value.setScrollTop(scrollbarDom.value.wrapRef.scrollHeight)
                    lastScrollHeight.value = scrollbarDom.value.wrapRef.scrollHeight
                    lastHeight.value = scrollbarDom.value.wrapRef.scrollHeight
                })
            }
        } else if (nextPage) {
            // 向下滚动加载数据
            dataList.value.push(...list)
            if (list.length < Number(params.value.pageSize)) {
                bottomNoMore.value = true
            } else {
                bottomNoMore.value = false
            }
        } else if (!nextPage) {
            // 向上滚动加载数据
            dataList.value.unshift(...list)
            if (list.length < Number(params.value.pageSize)) {
                topNoMore.value = true
            } else {
                topNoMore.value = false
            }
        }
    } catch {
        dataList.value = []
        topNoMore.value = true
        bottomNoMore.value = true
    } finally {
        if (initType !== 2) {
            topLoading.value = false
            bottomLoading.value = false
        }
    }
}

// 滚动加载列表
const scroll = async (evt: any) => {
    if (scrollbarDom.value) {
        const { scrollTop } = evt
        // 滚动方向：scrollDirection>0 向下滚动，scrollDirection<0 向上滚动
        const scrollDirection = scrollTop - lastScrollHeight.value
        if (scrollDirection < 0 && !topNoMore.value) {
            // 向上滚动
            if (scrollTop < props.distance && !topLoading.value) {
                // 向上滚动加载 未加载
                topLoading.value = true
                topPageNum.value += 1
                params.value.pageNum = topPageNum.value
                emit('onLoad', 0, false)
                scrollbarDom.value.setScrollTop(
                    scrollbarDom.value.wrapRef.scrollHeight - lastHeight.value + props.distance
                )
                lastHeight.value = scrollbarDom.value.wrapRef.scrollHeight
            }
        } else if (scrollDirection >= 0 && bottomPageNum.value > 1) {
            console.log('evt: ', evt)
            // 向下滚动
            if (
                !bottomLoading.value &&
                scrollbarDom.value.wrapRef.scrollHeight - scrollTop <
                    scrollbarDom.value.wrapRef.offsetHeight + props.distance
            ) {
                bottomLoading.value = true
                bottomPageNum.value -= 1
                params.value.pageNum = bottomPageNum.value
                emit('onLoad', 0, true)
            }
        }
        lastScrollHeight.value = scrollTop
    }
}

// 设置当前页码
const setCurrentPageNum = (num: number) => {
    params.value.pageNum = num
    topPageNum.value = num
    bottomPageNum.value = num
    emit('onLoad', 2, true)
}

defineExpose({
    getDataList,
    setCurrentPageNum
})
</script>

<style scoped lang="less">
.infinite-box {
    height: 100%;
    padding-right: 12px;
    overflow: hidden;
    :deep(.el-scrollbar) {
        .el-scrollbar__wrap {
            overflow-anchor: none;
        }
        .el-scrollbar__view {
            padding-right: 12px;
        }
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
