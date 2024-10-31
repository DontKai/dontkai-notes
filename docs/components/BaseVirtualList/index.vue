<!--
 * @file: 虚拟列表组件
 * @author: DontK
 * @LastEditTime: 2024-10-31 16:40:03
-->
<template>
    <div
        class="virtual-list__wrap"
        :class="props.showScrollbar ? 'has-scroll' : 'not-scroll'"
        ref="wrapEl"
        @scroll="handleScroll"
    >
        <div class="virtual-list__view" ref="viewEl">
            <div class="virtual-list__content" ref="contentEl">
                <div v-for="item in showList" ref="itemEls" class="virtual-list__item" :key="item">
                    <slot :data="item"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'

const props = withDefaults(
    defineProps<{
        data: any[]
        itemHeight?: number
        showSize?: number
        showScrollbar?: boolean
    }>(),
    {
        data: () => [],
        itemHeight: undefined,
        showSize: 20,
        showScrollbar: false
    }
)

const { wrapEl, viewEl, contentEl, itemEls, showList, initData, updateRenderData, handleScroll } = useVirtualEl()

function useVirtualEl() {
    const wrapEl = ref<HTMLElement>() // 虚拟列表 滚动容器
    const viewEl = ref<HTMLElement>() // 渲染实际高度的容器
    const contentEl = ref<HTMLElement>() // 需要偏移的目标元素
    const itemEls = ref<HTMLElement[]>() // 列表项
    const allList = ref<any[]>([]) // 全部的数据
    const showList = ref<any[]>([]) // 显示的数据
    const RenderedItemsCache = ref<any[]>([]) // 缓存已经渲染元素的高度
    const startIndex = ref<number>(0)
    const offsetHeight = ref<number>(0)

    // 初始化数据源
    const initData = (data: any[]) => {
        allList.value = data
        if (data.length > props.showSize) {
            showList.value = allList.value.slice(0, props.showSize)
        } else {
            showList.value = allList.value
        }
        RenderedItemsCache.value = []
        startIndex.value = 0
        offsetHeight.value = 0
        if (wrapEl.value) {
            wrapEl.value.scrollTop = 0
        }
    }

    // 获取每项item元素缓存高度，若无缓存则取配置项的 itemHeight
    const getItemHeightFromCache = (index: number | string) => {
        const val = RenderedItemsCache.value[index] ?? undefined
        return val === undefined ? props.itemHeight : val
    }

    // 更新view实际高度
    const updateActualHeight = () => {
        let viewHeight = 0
        allList.value.forEach((_, index) => {
            viewHeight += getItemHeightFromCache(index)
        })
        viewEl.value!.style.height = `${viewHeight}px`
    }

    // 更新已渲染列表项的缓存高度
    const updateRenderedItemCache = (isInit: boolean) => {
        // 当所有元素的实际高度更新完毕，就不需要重新计算高度
        const shouldUpdate = Object.keys(RenderedItemsCache).length < allList.value.length
        if (!shouldUpdate && !isInit) return

        nextTick(() => {
            const arr: any[] = itemEls.value || []
            // 列表项元素进行缓存
            arr.forEach((el: HTMLElement) => {
                if (!RenderedItemsCache[startIndex.value]) {
                    RenderedItemsCache[startIndex.value] = el.offsetHeight
                }
                startIndex.value++
            })

            // 更新实际高度
            updateActualHeight()
        })
    }

    // 更新偏移值
    const updateOffset = (offset: number) => {
        contentEl.value!.style.transform = `translateY(${offset}px)`
    }

    // 更新实际渲染数据
    const updateRenderData = (scrollTop: number, isInit: boolean) => {
        startIndex.value = 0
        offsetHeight.value = 0

        // 遍历所有元素，计算出当前滚动位置对应的起始索引
        for (let i = 0; i < allList.value.length; i++) {
            offsetHeight.value += getItemHeightFromCache(i)

            if (offsetHeight.value >= scrollTop) {
                startIndex.value = i
                break
            }
        }

        // 计算得出的渲染数据
        showList.value = allList.value.slice(startIndex.value, startIndex.value + props.showSize)

        // 缓存最新的列表项高度
        updateRenderedItemCache(isInit)

        // 更新偏移值
        updateOffset(offsetHeight.value - getItemHeightFromCache(startIndex.value))
    }

    // 滚动事件
    const handleScroll = (e: any) => {
        // 渲染正确的数据
        updateRenderData(e.target.scrollTop, false)
    }

    return {
        wrapEl,
        viewEl,
        contentEl,
        itemEls,
        allList,
        showList,
        initData,
        updateRenderData,
        handleScroll
    }
}

// 数据源发生变动
watch(
    () => props.data,
    (newVal: any[]) => {
        // 更新数据源
        initData(newVal)
        // 计算需要渲染的数据
        updateRenderData(0, true)
    },
    {
        deep: true
    }
)

onMounted(() => {
    initData(props.data)
})
</script>

<style scoped lang="less">
.virtual-list__wrap {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}
.not-scroll {
    //隐藏滚动条
    /* Firefox */
    scrollbar-width: none;
    /* IE 10+ */
    -ms-overflow-style: none;
    /* Chrome Safari */
    &::-webkit-scrollbar {
        display: none;
    }
    .virtual-list__item {
        height: fit-content;
        width: 100%;
    }
}
.has-scroll {
    // 滚动条样式
    &::-webkit-scrollbar {
        width: 6px;
        transition: all 2s;
    }

    &::-webkit-scrollbar-track-piece {
        background-color: #f8f8f800;
    }

    &::-webkit-scrollbar-thumb {
        // height: 100px;
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
}
</style>
