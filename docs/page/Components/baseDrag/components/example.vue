<template>
    <KDemoCard>
        <div class="button-list">
            <KTestButton text="点击显示" @call="isShow = !isShow" />
        </div>
        <BaseDrag v-if="isShow" :minWidth="400" :minHeight="440">
            <template #header>
                <div class="header">
                    <div class="title">标题</div>
                </div>
            </template>
            <template #content>
                <div class="content">
                    <div class="content-wrapper">内容</div>
                </div>
            </template>
        </BaseDrag>
    </KDemoCard>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import BaseDrag from '../../../../components/BaseDrag/index.vue'

const isShow = ref<boolean>(false)
</script>
<style lang="less" scoped>
.button-list {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 10px;
}
.header {
    padding: 10px;
    color: var(--vp-c-purple);
    .title {
        background-color: rgba(255, 255, 255, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.content {
    height: 100%;
    padding: 10px;
    color: var(--vp-c-purple);
    .content-wrapper {
        height: 100%;
        background-color: rgba(255, 255, 255, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
