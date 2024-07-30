<!--
 * @file: 拖拽组件
 * @author: DontK
 * @LastEditTime: 2024-07-30 14:05:46
-->
<template>
    <div class="draggable-box" ref="draggableRef" :style="{ width: `${width}px`, height: `${height}px` }">
        <div class="resize-line n-resize" @mousedown.prevent="handleMouseDown('n', $event)">上</div>
        <div class="resize-rect ne-resize" @mousedown.prevent="handleMouseDown('ne', $event)">右上</div>
        <div class="resize-line e-resize" @mousedown.prevent="handleMouseDown('e', $event)">右</div>
        <div class="resize-rect se-resize" @mousedown.prevent="handleMouseDown('se', $event)">右下</div>
        <div class="resize-line s-resize" @mousedown.prevent="handleMouseDown('s', $event)">下</div>
        <div class="resize-rect nw-resize" @mousedown.prevent="handleMouseDown('nw', $event)">左上</div>
        <div class="resize-line w-resize" @mousedown.prevent="handleMouseDown('w', $event)">左</div>
        <div class="resize-rect sw-resize" @mousedown.prevent="handleMouseDown('sw', $event)">左下</div>
        <div class="draggable-box__wrapper" @mousedown.prevent="handleMouseDown('move', $event)">
            <div class="drag-header">
                <slot name="header"></slot>
            </div>
            <slot name="content"></slot>
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
const width = ref<number>(props.minWidth)
const height = ref<number>(props.minHeight)
const draggableRef = ref<any>()
const directType = ref<string>('move')
const movePos = ref<any>({
    left: 0,
    top: 0
})
const resizePos = ref<any>({
    minLeft: 0,
    maxTop: 0
})

// 鼠标移动
const handleMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event // 鼠标到左和上的距离
    const { top, right, bottom, left, width, height } = draggableRef.value!.getBoundingClientRect()

    const move = () => {
        const newLeft = clientX - movePos.value.left // 元素左位置
        const newTop = clientY - movePos.value.top // 元素上位置
        if (newLeft < 0) {
            draggableRef.value!.style.left = `0px`
        } else if (newLeft > window.innerWidth - width) {
            draggableRef.value!.style.left = `${window.innerWidth - width}px`
        } else {
            draggableRef.value!.style.left = `${newLeft}px`
        }
        if (newTop < 0) {
            draggableRef.value!.style.top = `0px`
        } else if (newTop > window.innerHeight - height) {
            draggableRef.value!.style.top = `${window.innerHeight - height}px`
        } else {
            draggableRef.value!.style.top = `${newTop}px`
        }
    }
    const moveN = () => {
        // 拖动上方
        let newHeight = bottom - event.clientY
        let newTop = top + height - newHeight
        if (newHeight < props.minHeight) newHeight = props.minHeight
        draggableRef.value!.style.height = `${newHeight}px`
        if (newHeight === props.minHeight) newTop = resizePos.value.maxTop
        draggableRef.value!.style.top = `${newTop}px`
    }
    const moveE = () => {
        let newWidth = event.clientX - left
        if (newWidth < props.minWidth) newWidth = props.minWidth
        draggableRef.value!.style.width = `${newWidth}px`
    }
    const moveS = () => {
        let newHeight = event.clientY - top
        if (newHeight < props.minHeight) newHeight = props.minHeight
        draggableRef.value!.style.height = `${newHeight}px`
    }
    const moveW = () => {
        let newWidth = right - event.clientX
        let newLeft = left + width - newWidth
        if (newWidth < props.minWidth) newWidth = props.minWidth
        draggableRef.value!.style.width = `${newWidth}px`
        if (newWidth === props.minWidth) newLeft = resizePos.value.minLeft
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
    const { top, bottom, left } = draggableRef.value!.getBoundingClientRect()
    movePos.value.left = event.clientX - left // 鼠标到元素左距离
    movePos.value.top = event.clientY - top // 鼠标到元素上距离
    resizePos.value.minLeft = left
    resizePos.value.maxTop = bottom - props.minHeight
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
            background-color: rgba(255, 255, 255, 0.3);
            cursor: move;
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
