// BoxDraggable.vue
<template>
    <div class="draggable-box">
        <!-- 边框用于调整大小 -->
        <div id="dragTop" class="resize-handle"></div>
        <div id="dragRight" class="resize-handle"></div>
        <div id="dragBottom" class="resize-handle"></div>
        <div id="dragLeft" class="resize-handle"></div>
        <div class="draggable-box__wrapper">
            <div id="dragHeader" class="drag-header">
                <slot name="header"></slot>
            </div>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        width: string
        height: string
    }>(),
    {
        width: '440px',
        height: '440px'
    }
)
</script>

<style scoped>
.draggable-box {
    box-sizing: border-box;
    position: fixed;
    width: v-bind('props.width');
    height: v-bind('props.height');
    z-index: 100;
    background-color: var(--vp-c-purple);
    .draggable-box__wrapper {
        height: 100%;
        width: 100%;
        .drag-header {
            height: 50px;
            background-color: rgba(255, 255, 255, 0.3);
        }
    }
}

.resize-handle {
    position: absolute;
    background: rgba(0, 0, 0, 0);
}

#dragTop,
#dragBottom {
    left: 0;
    right: 0;
    height: 5px;
    cursor: ns-resize;
}

#dragRight,
#dragLeft {
    top: 0;
    bottom: 0;
    width: 5px;
    cursor: ew-resize;
}

#dragTop {
    top: 0;
}
#dragRight {
    right: 0;
}
#dragBottom {
    bottom: 0;
}
#dragLeft {
    left: 0;
}

.resize-handle:hover {
    background-color: rgba(255, 255, 255, 0); /* 当鼠标悬停时改变背景颜色 */
}
</style>
