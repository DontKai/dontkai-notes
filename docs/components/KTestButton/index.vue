<template>
    <el-button class="k-test-button" @click="emit('call')">
        {{ props.text }}
        <el-icon><Pointer /></el-icon>
    </el-button>
</template>
<script setup lang="ts">
const emit = defineEmits(['call'])
const props = withDefaults(
    defineProps<{
        text?: string
    }>(),
    {
        text: '测试一下'
    }
)
</script>
<style lang="less" scoped>
.k-test-button {
    padding: 3px 15px;
    background-color: var(--vp-c-brand);
    border: none;
    outline: none;
    color: #fff;
    margin: 0.5rem 0;
    border-bottom: 2px solid var(--vp-c-brand-dark);
    text-shadow: 1px 1px 1px var(--vp-c-brand-dark);
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    &:hover {
        background-color: var(--vp-c-brand-dark);
    }
}
</style>
