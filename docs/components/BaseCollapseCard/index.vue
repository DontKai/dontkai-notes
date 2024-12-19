<!--
 * @file: 基础折叠面板组件
 * @author: DontK
 * @LastEditTime: 2024-12-19 17:06:56
-->
<template>
    <div class="base-collapse-card" :class="{ 'is-disabled': isDisabled }">
        <!-- 标题 -->
        <div
            class="collapse-title"
            v-show="isAlwaysShowHeader || (!isAlwaysShowHeader && isCollapse)"
            @click="changeCollapse"
        >
            <slot name="title"></slot>
        </div>
        <!-- 展开的内容 -->
        <el-collapse-transition @after-leave="afterLeave">
            <div class="collapse-content" v-show="!isCollapse">
                <slot></slot>
            </div>
        </el-collapse-transition>
        <!-- 按钮 -->
        <div class="collapse-button" v-if="!isDisabled" @click="changeCollapse">
            <el-icon class="collapse-icon" :class="{ 'is-active': isCollapse }">
                <ArrowUp />
            </el-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElCollapseTransition } from 'element-plus'
import { computed, ref } from 'vue'

const props = withDefaults(
    defineProps<{
        collapse?: boolean // 默认折叠状态 false
        disabled?: boolean // 是否禁用折叠 false
        alwaysShowHeader?: boolean // 是否一直显示header false
    }>(),
    {
        collapse: false,
        disabled: false,
        alwaysShowHeader: false
    }
)
const isDisabled = computed(() => props.disabled) // 是否禁用
const isAlwaysShowHeader = computed(() => props.alwaysShowHeader) // 是否一直显示header
const isCollapse = ref<boolean>(props.collapse) // 是否折叠

// 切换折叠状态
const changeCollapse = (data?: any) => {
    if (typeof data === 'boolean') {
        isCollapse.value = data
    } else {
        isCollapse.value = !isCollapse.value
    }
}

// 动画结束后
const afterLeave = (evt: any) => {
    // console.log('evt: ', evt);
}

defineExpose({
    changeCollapse
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
            color: #000;
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
