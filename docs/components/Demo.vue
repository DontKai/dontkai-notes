<template>
    <div class="demo">
        <slot></slot>
    </div>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped>
.demo {
    font-size: var(--vt-doc-code-font-size);
    background: var(--vp-code-block-bg);
    padding: 2em;
    position: relative;
    margin-bottom: 10px;
    border-radius: 8px;
    transition: background-color 0.5s;
}
</style>
