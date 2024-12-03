<!--
 * @file 渐变色边框
 * @author: DontK
 * @LastEditTime: 2024-12-03 14:21:42
-->
<template>
    <div class="card-border">
        <div class="card-border__wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.card-border {
    position: relative;
    transform-style: preserve-3d;
    border-radius: 8px;
    background-color: #fff;
    cursor: pointer;
    border: 1px solid transparent;

    .card-border__wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #fff;
        border-radius: 7px;
    }
}
.card-border:hover {
    background-image: radial-gradient(ellipse, #603cff 0%, #7700ff 32%, #be6aff 68%, #663cff 100%);
}
</style>
