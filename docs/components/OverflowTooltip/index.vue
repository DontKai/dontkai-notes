<template>
    <el-tooltip :effect="props.effect" :placement="props.placement" :show-after="props.showAfter" :disabled="isShow">
        <template #content>
            <div class="overflow-tooltip-content">
                <slot name="content">{{ props.content }}</slot>
            </div>
        </template>
        <div class="overflow-tooltip" :style="{ width: props.width }" @mouseover="isShowTooltip">
            <span ref="contentRef">{{ props.content }}</span>
        </div>
    </el-tooltip>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
    defineProps<{
        content: string
        effect?: 'dark' | 'light'
        placement?:
            | 'top'
            | 'top-start'
            | 'top-end'
            | 'bottom'
            | 'bottom-start'
            | 'bottom-end'
            | 'left'
            | 'left-start'
            | 'left-end'
            | 'right'
            | 'right-start'
            | 'right-end'
        width?: string
        showAfter?: number
    }>(),
    {
        content: '',
        effect: 'dark',
        placement: 'top',
        width: '100%',
        showAfter: 0
    }
)
// 使用isShow来控制tooltip是否显示
const isShow = ref<boolean>(true)
// 在span标签上定义一个ref
const contentRef = ref()
const isShowTooltip = (): void => {
    // 计算span标签的offsetWidth与盒子元素的offsetWidth，给isShow赋值
    if (contentRef.value.parentNode.offsetWidth > contentRef.value.offsetWidth) {
        isShow.value = true
    } else {
        isShow.value = false
    }
}
</script>
<style scoped lang="less">
.overflow-tooltip {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.overflow-tooltip-content {
    max-width: 600px;
    max-height: 300px;
    overflow: auto;

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
