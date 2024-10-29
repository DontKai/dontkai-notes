<!--
 * @file: 虚拟列表组件
 * @author: DontK
 * @LastEditTime: 2024-10-29 14:39:07
-->
<template>
    <div class="virtual-list__wrap" ref="wrapEl">
        <div class="virtual-list__view" ref="viewEl">
            <div class="virtual-list__content" ref="contentEl">
                <template v-for="item in showList" :key="item">
                    <slot :data="item"></slot>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const props = withDefaults(
    defineProps<{
        data: any[]
        itemContainer: string
        itemHeight?: number
        showSize?: number
    }>(),
    {
        data: () => [],
        itemContainer: '',
        itemHeight: undefined,
        showSize: 20
    }
)

const { wrapEl, viewEl, contentEl, itemEls, getItemEls } = useVirtualEl()
const { showList, initData } = useVirtualData()

function useVirtualEl() {
    const wrapEl = ref<HTMLElement>()
    const viewEl = ref<HTMLElement>()
    const contentEl = ref<HTMLElement>()
    const itemEls = ref<HTMLElement[]>([])

    const getItemEls = () => {
        if (contentEl.value && props.itemContainer) {
            itemEls.value = Array.from(contentEl.value.querySelectorAll(props.itemContainer))
        }
    }

    return {
        wrapEl,
        viewEl,
        contentEl,
        itemEls,
        getItemEls
    }
}

function useVirtualData() {
    const showList = ref<any[]>([])

    const initData = () => {
        if (props.data.length > props.showSize) {
            showList.value = props.data.slice(0, props.showSize)
        } else {
            showList.value = props.data
        }
    }

    return {
        showList,
        initData
    }
}

onMounted(() => {
    initData()
    nextTick(() => {
        getItemEls()
        console.log('wrapEl: ', wrapEl.value)
        console.log('viewEl: ', viewEl.value)
        console.log('contentEl: ', contentEl.value)
        console.log('itemEls: ', itemEls.value)
    })
})
</script>

<style scoped lang="less">
.virtual-list__wrap {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    //隐藏滚动条
    /* Firefox */
    scrollbar-width: none;
    /* IE 10+ */
    -ms-overflow-style: none;
    /* Chrome Safari */
    &::-webkit-scrollbar {
        display: none;
    }
}
</style>
