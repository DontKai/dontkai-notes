<!--
 * @file: 扫光效果
 * @author: DontK
 * @LastEditTime: 2024-08-20 14:37:48
-->
<template>
    <div class="base-scanning-light">
        <div v-if="props.text" class="shark-text">{{ props.text }}</div>
        <div
            v-else-if="props.url"
            class="shark-wrap"
            :class="{ 'is-mask': props.imgMask }"
            :style="{ '--mask-url': `url(${props.url})` }"
        >
            <img :src="props.url" />
        </div>
    </div>
</template>
<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        width?: string
        height?: string
        text?: string
        url?: string
        imgMask?: boolean
    }>(),
    {
        width: 'fit-content',
        height: 'fit-content',
        text: '',
        url: '',
        imgMask: false
    }
)
</script>
<style lang="less" scoped>
.base-scanning-light {
    overflow: hidden;
    .shark-text {
        height: 100px;
        line-height: 100px;
        font-size: 60px;
        font-weight: bold;
        color: #9747ff;
        margin: 0;
        background: linear-gradient(
                45deg,
                rgba(255, 255, 255, 0) 40%,
                rgba(255, 255, 255, 0.7),
                rgba(255, 255, 255, 0) 60%
            ) -100%/50% no-repeat currentColor;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        animation: shark-txt 2s infinite;
    }

    .shark-wrap {
        width: v-bind('props.width');
        height: v-bind('props.height');
        position: relative;
        overflow: hidden;
        img {
            display: block;
            width: 100%;
        }
        &::after {
            content: '';
            position: absolute;
            inset: -20%;
            background: linear-gradient(
                45deg,
                rgba(255, 255, 255, 0) 40%,
                rgba(255, 255, 255, 0.7),
                rgba(255, 255, 255, 0) 60%
            );
            animation: shark-wrap 2s infinite;
            transform: translateX(-100%);
        }
        &.is-mask {
            -webkit-mask: var(--mask-url) 0 0/100%;
        }
    }

    @keyframes shark-txt {
        to {
            background-position: 200%;
        }
    }
    @keyframes shark-wrap {
        to {
            transform: translateX(100%);
        }
    }
}
</style>
