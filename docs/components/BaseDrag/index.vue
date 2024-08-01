<!--
 * @file: 拖拽组件
 * @author: DontK
 * @LastEditTime: 2024-08-01 14:21:09
-->
<template>
    <div
        class="draggable-box"
        ref="draggableRef"
        :style="{ width: `${props.minWidth}px`, height: `${props.minHeight}px` }"
    >
        <div class="resize-line n-resize" @mousedown="handleMouseDown('n', $event)">
            <!-- 上 -->
        </div>
        <div class="resize-rect ne-resize" @mousedown="handleMouseDown('ne', $event)">
            <!-- 右上 -->
        </div>
        <div class="resize-line e-resize" @mousedown="handleMouseDown('e', $event)">
            <!-- 右 -->
        </div>
        <div class="resize-rect se-resize" @mousedown="handleMouseDown('se', $event)">
            <!-- 右下 -->
        </div>
        <div class="resize-line s-resize" @mousedown="handleMouseDown('s', $event)">
            <!-- 下 -->
        </div>
        <div class="resize-rect nw-resize" @mousedown="handleMouseDown('nw', $event)">
            <!-- 左上 -->
        </div>
        <div class="resize-line w-resize" @mousedown="handleMouseDown('w', $event)">
            <!-- 左 -->
        </div>
        <div class="resize-rect sw-resize" @mousedown="handleMouseDown('sw', $event)">
            <!-- 左下 -->
        </div>
        <div class="draggable-box__wrapper" @mousedown="handleMouseDown('move', $event)">
            <div class="drag-header">
                <slot name="header"></slot>
            </div>
            <div class="drag-content">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(
    defineProps<{
        minWidth: number
        minHeight: number
    }>(),
    {
        minWidth: 0,
        minHeight: 0
    }
)
const draggableRef = ref<any>()
const directType = ref<string>('move') // 拖动类型
const movePos = ref({
    mouseToElLeft: 0, // 拖动：鼠标按下时，鼠标到元素左侧的距离
    mouseToElTop: 0, // 拖动：鼠标按下时，鼠标到元素上侧的距离
    dragWMaxLeft: 0, // 拖做：鼠标按下时拖拽左侧时，元素最大到左侧距离（元素右侧距离 - 元素最小宽度）
    dragNMaxTop: 0 // 拖上：鼠标按下时拖拽上方时，元素最大到顶部距离（元素底部距离 - 元素最小高度）
})

// 鼠标移动
const handleMouseMove = (event: MouseEvent) => {
    // 鼠标到视口左、右
    const { clientX, clientY } = event
    // 元素到上、右、下、左、宽、高
    const { top, right, bottom, left, width, height } = draggableRef.value!.getBoundingClientRect()
    // 视口宽、高
    const { innerWidth, innerHeight } = window

    // 拖动元素移动
    const move = () => {
        const newTop = clientY - movePos.value.mouseToElTop // 元素上位置
        if (newTop < 0) {
            draggableRef.value!.style.top = `0px`
        } else if (newTop > innerHeight - height) {
            draggableRef.value!.style.top = `${innerHeight - height}px`
        } else {
            draggableRef.value!.style.top = `${newTop}px`
        }
        const newLeft = clientX - movePos.value.mouseToElLeft // 元素左位置
        if (newLeft < 0) {
            draggableRef.value!.style.left = `0px`
        } else if (newLeft > innerWidth - width) {
            draggableRef.value!.style.left = `${innerWidth - width}px`
        } else {
            draggableRef.value!.style.left = `${newLeft}px`
        }
    }
    // 拖动上方
    const moveN = () => {
        let newHeight = bottom - clientY // 拖动高度
        let newTop = bottom - newHeight // 拖动顶部距离
        if (clientY < 0) {
            // 拖动最大高度
            newHeight = bottom
            newTop = 0
        } else if (newHeight < props.minHeight) {
            // 拖动最小高度
            newHeight = props.minHeight
        }
        // 高度为最小高度时，顶部距离为元素最大到顶部距离
        if (newHeight === props.minHeight) newTop = movePos.value.dragNMaxTop
        draggableRef.value!.style.height = `${newHeight}px`
        draggableRef.value!.style.top = `${newTop}px`
    }
    // 拖动右
    const moveE = () => {
        let newWidth = clientX - left // 拖动宽度
        if (clientX > innerWidth) {
            // 拖动最大宽度
            newWidth = innerWidth - left
        } else if (newWidth < props.minWidth) {
            // 拖动最小宽度
            newWidth = props.minWidth
        }
        draggableRef.value!.style.width = `${newWidth}px`
    }
    // 拖动下
    const moveS = () => {
        let newHeight = clientY - top // 拖动高度
        if (clientY > innerHeight) {
            // 拖动最大高度
            newHeight = innerHeight - top
        } else if (newHeight < props.minHeight) {
            // 拖动最小高度
            newHeight = props.minHeight
        }
        // 拖动最小高度
        draggableRef.value!.style.height = `${newHeight}px`
    }
    // 拖动左
    const moveW = () => {
        let newWidth = right - clientX // 拖动宽度
        let newLeft = right - newWidth // 拖动左部距离
        if (clientX < 0) {
            // 拖动最大高度
            newWidth = right
            newLeft = 0
        } else if (newWidth < props.minWidth) {
            // 拖动最小宽度
            newWidth = props.minWidth
        }
        if (newWidth === props.minWidth) newLeft = movePos.value.dragWMaxLeft
        draggableRef.value!.style.width = `${newWidth}px`
        draggableRef.value!.style.left = `${newLeft}px`
    }
    // 移动
    if (directType.value === 'move') {
        move()
    } else if (directType.value === 'n') {
        // 拖动上方
        moveN()
    } else if (directType.value === 'ne') {
        // 拖动上右方
        moveN()
        moveE()
    } else if (directType.value === 'e') {
        // 拖动右侧
        moveE()
    } else if (directType.value === 'se') {
        // 拖动下右方
        moveS()
        moveE()
    } else if (directType.value === 'nw') {
        // 拖动上左方
        moveN()
        moveW()
    } else if (directType.value === 'w') {
        // 拖动左侧
        moveW()
    } else if (directType.value === 'sw') {
        // 拖动下左方
        moveS()
        moveW()
    } else if (directType.value === 's') {
        // 拖动下方
        moveS()
    }
}

// 鼠标抬起
const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
}

// 鼠标按下
const handleMouseDown = (type: string, event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    directType.value = type
    // 鼠标到视口左、右
    const { clientX, clientY } = event
    // 元素到上、下、左
    const { top, right, bottom, left } = draggableRef.value!.getBoundingClientRect()
    movePos.value.mouseToElLeft = clientX - left
    movePos.value.mouseToElTop = clientY - top
    movePos.value.dragWMaxLeft = right - props.minWidth
    movePos.value.dragNMaxTop = bottom - props.minHeight
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
}

// 清空事件
const cleanUpDrag = () => {
    if (draggableRef.value) {
        draggableRef.value!.removeEventListener('mousedown', handleMouseDown)
    }
    document!.removeEventListener('mousemove', handleMouseMove)
    document!.removeEventListener('mouseup', handleMouseUp)
}

onMounted(() => {
    if (draggableRef.value) {
        draggableRef.value!.addEventListener('mousedown', handleMouseDown)
    }
})

onUnmounted(() => {
    cleanUpDrag()
})
</script>

<style scoped lang="less">
.draggable-box {
    box-sizing: border-box;
    z-index: 100;
    background-color: var(--vp-c-purple);
    position: fixed;
    top: 20%;
    left: 50%;
    .draggable-box__wrapper {
        height: 100%;
        width: 100%;
        .drag-header {
            height: 50px;
            cursor: move;
            background-color: rgba(255, 255, 255, 0.3);
            border-bottom: 1px solid var(--vp-c-purple);
        }
        .drag-content {
            height: calc(100% - 50px);
            background-color: rgba(255, 255, 255, 0.3);
        }
    }
}

.resize-line {
    position: absolute;
    z-index: 1;
    overflow: hidden;
    opacity: 0;
}

.n-resize,
.s-resize {
    left: 0;
    right: 0;
    height: 5px;
    cursor: ns-resize;
}

.e-resize,
.w-resize {
    top: 0;
    bottom: 0;
    width: 5px;
    cursor: ew-resize;
}

.n-resize {
    left: 0;
}
.e-resize {
    right: 0;
}
.s-resize {
    bottom: 0;
}
.w-resize {
    left: 0;
}

.resize-rect {
    position: absolute;
    height: 10px;
    width: 10px;
    z-index: 2;
    overflow: hidden;
    opacity: 0;
}
.ne-resize {
    cursor: ne-resize;
    right: 0;
    top: 0;
}
.se-resize {
    cursor: se-resize;
    right: 0;
    bottom: 0;
}
.nw-resize {
    cursor: nw-resize;
    left: 0;
    top: 0;
}
.sw-resize {
    cursor: sw-resize;
    left: 0;
    bottom: 0;
}
</style>
