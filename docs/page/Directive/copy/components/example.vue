<template>
    <KDemoCard>
        <div class="button-list">
            <KTestButton text="点击复制" v-copy="`按钮复制内容`" />
            <div style="cursor: pointer" v-copy="`文字复制内容`">点击复制</div>
        </div>
        <div style="margin-top: 10px">
            <el-input type="textarea" v-model="textarea" resize="none" placeholder="复制内容到输入框中" />
        </div>
    </KDemoCard>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const textarea = ref<string>()
</script>
<style lang="less" scoped>
.button-list {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>
