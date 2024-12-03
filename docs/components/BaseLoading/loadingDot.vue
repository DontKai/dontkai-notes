<!--
 * @file:
 * @author: DontK
 * @LastEditTime: 2024-11-27 13:19:44
-->
<template>
    <div class="spin-loader">
        <svg
            :width="props.width"
            :height="props.height"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <g transform="translate(50 50)" class="spin-loader-main-svg">
                <g transform="rotate(0) translate(34 0)">
                    <circle cx="0" cy="0" r="8" class="dot"></circle>
                </g>
                <g transform="rotate(45) translate(34 0)">
                    <circle cx="0" cy="0" r="8" class="dot"></circle>
                </g>
                <g transform="rotate(90) translate(34 0)">
                    <circle cx="0" cy="0" r="8" class="dot"></circle>
                </g>
                <g transform="rotate(135) translate(34 0)">
                    <circle cx="0" cy="0" r="8" class="dot"></circle>
                </g>
                <g transform="rotate(180) translate(34 0)">
                    <circle cx="0" cy="0" r="8" class="dot"></circle>
                </g>
                <g transform="rotate(225) translate(34 0)">
                    <circle cx="0" cy="0" r="8" class="dot"></circle>
                </g>
                <g transform="rotate(270) translate(34 0)">
                    <circle cx="0" cy="0" r="8" class="dot"></circle>
                </g>
                <g transform="rotate(315) translate(34 0)">
                    <circle cx="0" cy="0" r="8" class="dot"></circle>
                </g>
            </g>
        </svg>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        color?: string;
        width?: string;
        height?: string;
    }>(),
    {
        color: '#39bda7',
        width: '20px',
        height: '20px'
    }
);
</script>

<style scoped lang="less">
@keyframes dot-animacija {
    to {
        opacity: 1;
        transform: scale(1);
    }
}
.spin-loader {
    position: relative;
    width: v-bind('props.width');
    height: v-bind('props.height');
    .dot {
        fill: v-bind('props.color');
        opacity: 0.5;
        transform: scale(0.5);
        animation: dot-animacija 1s infinite;
    }
    .spin-loader-main-svg {
        g {
            &:nth-child(1) {
                .dot {
                    animation-delay: 0s;
                }
            }
            &:nth-child(2) {
                .dot {
                    animation-delay: (1/8) * 1s;
                }
            }
            &:nth-child(3) {
                .dot {
                    animation-delay: (2/8) * 1s;
                }
            }
            &:nth-child(4) {
                .dot {
                    animation-delay: (3/8) * 1s;
                }
            }
            &:nth-child(5) {
                .dot {
                    animation-delay: (4/8) * 1s;
                }
            }
            &:nth-child(6) {
                .dot {
                    animation-delay: (5/8) * 1s;
                }
            }
            &:nth-child(7) {
                .dot {
                    animation-delay: (6/8) * 1s;
                }
            }
            &:nth-child(8) {
                .dot {
                    animation-delay: (7/8) * 1s;
                }
            }
        }
    }
}
</style>
