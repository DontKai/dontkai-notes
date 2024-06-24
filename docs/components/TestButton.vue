<template>
    <button class="test-button" @click="emit('call')">测试一下</button>
</template>
<script setup lang="ts">
const emit = defineEmits(['call'])
</script>
<style lang="less" scoped>
.test-button {
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
    &:hover {
        background-color: var(--vp-c-brand-dark);
    }
}
</style>
