<!--
 * @file: 基础折叠面板组件
 * @author: DontK
 * @LastEditTime: 2024-12-03 14:02:40
-->
<template>
    <div class="base-collapse-card" :class="{ 'is-disabled': isDisabled }">
        <!-- 标题 -->
        <div class="collapse-title" @click="changeCollapse">
            <slot name="title"></slot>
        </div>
        <!-- 展开的内容 -->
        <el-collapse-transition>
            <div class="collapse-content" v-show="!isCollapse">
                <slot name="content"></slot>
            </div>
        </el-collapse-transition>
        <!-- 按钮 -->
        <div class="collapse-button" @click="changeCollapse" v-if="!isDisabled">
            <el-icon class="collapse-icon" :class="{ 'is-active': isCollapse }">
                <ArrowUp />
            </el-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElCollapseTransition } from 'element-plus'
import { computed, ref } from 'vue'
import { useCheckClick } from '@/hooks/useCheckClick'

const props = withDefaults(
    defineProps<{
        collapse?: boolean
        disabled?: boolean
    }>(),
    {
        collapse: false,
        disabled: false
    }
)
const isDisabled = computed(() => props.disabled)
const { checkClick } = useCheckClick(isDisabled)

const isCollapse = ref<boolean>(props.collapse)

const changeCollapse = checkClick(() => {
    isCollapse.value = !isCollapse.value
})
</script>

<style scoped lang="less">
.base-collapse-card {
    width: 100%;
    background-color: #f6f6f6;
    padding: 12px 16px;
    border-radius: 12px;
    position: relative;
    .collapse-title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }
    .collapse-content {
        width: 100%;
    }
    .collapse-button {
        cursor: pointer;
        position: absolute;
        top: 12px;
        right: 16px;
        .collapse-icon {
            transform: rotate(0);
            transition: 0.3s;
        }
        .is-active {
            transform: rotate(180deg);
        }
    }
}
.base-collapse-card.is-disabled {
    .collapse-title {
        width: 100%;
        cursor: auto;
    }
}
</style>
