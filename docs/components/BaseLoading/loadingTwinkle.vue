<template>
    <div class="stage">
        <div class="dot-flashing"></div>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.stage {
    width: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.dot-flashing {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #9880ff;
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: 0.5s;
    position: relative;
}

.dot-flashing::before {
    left: -10px;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 0s;
}

.dot-flashing::after {
    left: 10px;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 1s;
}

.dot-flashing::before,
.dot-flashing::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #247afb;
}
@keyframes dotFlashing {
    0% {
        background-color: #247afb;
    }

    100% {
        background-color: #e0dff3;
    }
}
</style>
