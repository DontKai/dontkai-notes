<template>
    <KDemoCard>
        <div class="button-list">
            <KTestButton text="点击显示" @call="isShow = true" />
        </div>
        <BaseDrag
            v-if="isShow"
            width="440px"
            height="440px"
            v-dragResize="{
                dragMoveId: 'dragHeader',
                dragTopId: 'dragTop',
                dragRightId: 'dragRight',
                dragBottomId: 'dragBottom',
                dragLeftId: 'dragLeft',
                minWidth: 440,
                minHeight: 440
            }"
        />
    </KDemoCard>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import BaseDrag from './baseDrag.vue'

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
