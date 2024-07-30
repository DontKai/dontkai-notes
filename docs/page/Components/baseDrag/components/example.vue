<template>
    <KDemoCard>
        <div class="button-list">
            <KTestButton text="点击显示" @call="isShow = !isShow" />
        </div>
        <BaseDrag v-if="isShow" :minWidth="400" :minHeight="440">
            <template #header>头部...</template>
            <template #content>内容...</template>
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
</style>
