<!--
 * @file: 碎片显示动画
 * @author: DontK
 * @LastEditTime: 2024-08-07 16:23:35
-->
<template>
    <div class="base-fragment">
        <template v-for="(row, index1) in props.rows" v-if="visible">
            <div
                v-for="(col, index2) in props.cols"
                :key="col"
                class="small-box"
                :ref="`smallBoxRef${row}${index1}${col}${index2}`"
                :style="setStyle(col, row)"
            ></div>
        </template>
    </div>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, onMounted } from 'vue'

const { proxy } = getCurrentInstance() as any
const props = withDefaults(
    defineProps<{
        url: string
        width?: number
        height?: number
        cols?: number
        rows?: number
        delay?: number
        direction?:
            | 'top-bottom'
            | 'bottom-top'
            | 'left-right'
            | 'right-left'
            | 'left-top-right-bottom-corner'
            | 'left-bottom-right-top-corner'
            | 'right-top-left-bottom-corner'
            | 'right-bottom-left-top-corner'
            | 'random'
            | 'center-around'
            | 'around-center'
    }>(),
    {
        width: 300,
        height: 600,
        url: '',
        cols: 15,
        rows: 10,
        delay: 50,
        direction: 'top-bottom'
    }
)
const visible = defineModel<any>('visible', { default: false })
const imgUrl = computed(() => {
    return new URL(props.url, import.meta.url).href
})
const width = computed(() => {
    return props.width ? `${props.width}px` : 'fit-content'
})
const height = computed(() => {
    return props.height ? `${props.height}px` : 'fit-content'
})

const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

const setDelay = (col: number, row: number) => {
    if (props.direction === 'top-bottom') {
        return `${row * props.delay}ms`
    }
    if (props.direction === 'bottom-top') {
        return `${(props.rows - row) * props.delay}ms`
    }
    if (props.direction === 'left-right') {
        return `${col * props.delay}ms`
    }
    if (props.direction === 'right-left') {
        return `${(props.cols - col) * props.delay}ms`
    }
    if (props.direction === 'left-top-right-bottom-corner') {
        return `${(row + col) * props.delay}ms`
    }
    if (props.direction === 'left-bottom-right-top-corner') {
        return `${(props.rows - row + col) * props.delay}ms`
    }
    if (props.direction === 'right-top-left-bottom-corner') {
        return `${(row + props.cols - col) * props.delay}ms`
    }
    if (props.direction === 'right-bottom-left-top-corner') {
        return `${(props.rows - row + props.cols - col) * props.delay}ms`
    }
    if (props.direction === 'random') {
        return `${getRandom(0, props.cols + props.rows) * props.delay}ms`
    }
    if (props.direction === 'center-around') {
        return `${(Math.abs(props.cols / 2 - col) + Math.abs(props.rows / 2 - row)) * props.delay}ms`
    }
    if (props.direction === 'around-center') {
        return `${
            (props.cols / 2 - Math.abs(props.cols / 2 - col) + (props.cols / 2 - Math.abs(props.rows / 2 - row))) *
            props.delay
        }ms`
    }
    return ''
}
const setStyle = (col: number, row: number) => {
    return {
        width: `${props.width / props.cols}px`,
        height: `${props.height / props.rows}px`,
        backgroundImage: `url(${imgUrl.value})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `${((col * props.width) / props.cols) * -1}px ${
            ((row * props.height) / props.rows) * -1
        }px`,
        backgroundSize: `${props.width}px ${props.height}px`,
        animationDelay: setDelay(col, row)
        // '--rotateX': `rotateX(${(col + row) % 2 ? -180 : 0}deg)`,
        // '--rotateY': `rotateY(${(col + row) % 2 ? 0 : -180}deg)`
    }
}

onMounted(() => {})
</script>
<style lang="less" scoped>
.base-fragment {
    width: v-bind(width);
    height: v-bind(height);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .small-box {
        opacity: 0;
        animation: smallBoxAnimate 1000ms linear forwards;
        --rotateX: rotateX(0);
        --rotateY: rotateY(0);
        transform: var(--rotateX) var(--rotateY) scale(0.8);
        background-color: black;
    }
    @keyframes smallBoxAnimate {
        0% {
            opacity: 0;
            transform: var(--rotateX) var(--rotateY) scale(0.8);
        }
        40% {
            opacity: 0;
            transform: var(--rotateX) var(--rotateY) scale(0.8);
        }
        70% {
            opacity: 1;
            transform: rotateX(0) rotateY(0) scale(0.8);
        }
        100% {
            opacity: 1;
            transform: rotateX(0) rotateY(0) scale(1);
        }
    }
}
</style>
