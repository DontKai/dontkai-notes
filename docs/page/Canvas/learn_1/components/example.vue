<template>
    <KDemoCard>
        <div class="draw-title">{{ drawToolsTitle }}</div>
        <div class="draw-tools">
            <el-button v-for="tool in tools" :key="tool.value" type="primary" @click="changeDrawToolsType(tool)">
                {{ tool.label }}
            </el-button>
        </div>
        <div class="draw-canvas-box" ref="drawCanvasBoxRef">
            <canvas ref="drawCanvasRef"></canvas>
        </div>
    </KDemoCard>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Option {
    label: string
    value: string
}

const { tools, drawToolsTitle, changeDrawToolsType } = useDrawTools()
const { drawCanvasBoxRef, drawCanvasRef, content, clearDraw, drawLine, drawSquare, drawTriangle } = useDrawCanvas()
function useDrawTools() {
    const tools: Option[] = [
        {
            value: 'line',
            label: '画线'
        },
        {
            value: 'square',
            label: '画正方形'
        },
        {
            value: 'triangle',
            label: '画三角形'
        }
    ]
    const drawToolsType = ref<string>('')
    const drawToolsTitle = ref<string>('标题')

    // 改变画笔类型
    const changeDrawToolsType = (tool: Option) => {
        if (drawToolsType.value !== tool.value) {
            drawToolsType.value = tool.value
            drawToolsTitle.value = tool.label
            clearDraw()
            switch (tool.value) {
                case 'line':
                    drawLine()
                    break
                case 'square':
                    drawSquare()
                    break
                case 'triangle':
                    drawTriangle()
                    break
                default:
                    break
            }
        }
    }

    return {
        tools,
        drawToolsType,
        drawToolsTitle,
        changeDrawToolsType
    }
}

function useDrawCanvas() {
    const drawCanvasBoxRef = ref<HTMLDivElement | null>(null) // 画布父级容器
    const drawCanvasRef = ref<HTMLCanvasElement | null>(null) // 画布容器
    const content = ref<CanvasRenderingContext2D | null>()

    // 清除画布
    const clearDraw = () => {
        if (drawCanvasRef.value && content.value) {
            // (起点, 终点, 区域宽度, 区域高度)
            content.value.clearRect(0, 0, drawCanvasRef.value.width, drawCanvasRef.value.height)
            // 使用fillRect填充整个画布
            content.value.fillStyle = 'gray'
            content.value.fillRect(0, 0, drawCanvasRef.value.width, drawCanvasRef.value.height)
        }
    }

    // 画线
    const drawLine = () => {
        if (content.value) {
            // 第一条
            content.value.beginPath() // 开启一条新路径
            content.value.moveTo(0, 0)
            content.value.lineTo(350, 50)
            content.value.lineWidth = 1
            content.value.strokeStyle = 'blue'
            content.value.lineCap = 'butt'
            content.value.stroke()
            content.value.closePath() // 关闭路径
            // 第二条
            content.value.beginPath() // 开启一条新路径
            content.value.moveTo(0, 200)
            content.value.lineTo(50, 200)
            content.value.lineTo(50, 150)
            content.value.lineTo(100, 150)
            content.value.lineTo(100, 200)
            content.value.lineTo(150, 200)
            content.value.lineTo(150, 150)
            content.value.lineTo(200, 150)
            content.value.lineWidth = 5
            content.value.strokeStyle = 'red'
            content.value.lineCap = 'round'
            content.value.stroke()
            content.value.closePath() // 关闭路径
        }
    }

    // 画正方形
    const drawSquare = () => {
        if (content.value) {
            content.value.beginPath()
            content.value.moveTo(60, 60)
            content.value.lineTo(150, 60)
            content.value.lineTo(150, 150)
            content.value.lineTo(60, 150)
            content.value.lineTo(60, 60)
            content.value.stroke()
            content.value.closePath()
        }
    }

    // 画三角形
    const drawTriangle = () => {
        if (content.value) {
            content.value.beginPath()
            content.value.moveTo(60, 60)
            content.value.lineTo(150, 60)
            content.value.lineTo(150, 150)
            content.value.lineTo(60, 60)
            content.value.stroke()
            content.value.closePath()
        }
    }

    return {
        drawCanvasBoxRef,
        drawCanvasRef,
        content,
        clearDraw,
        drawLine,
        drawSquare,
        drawTriangle
    }
}

onMounted(() => {
    if (drawCanvasRef.value && drawCanvasBoxRef.value) {
        drawCanvasRef.value.width = drawCanvasBoxRef.value.clientWidth
        drawCanvasRef.value.height = drawCanvasBoxRef.value.clientHeight
        content.value = drawCanvasRef.value?.getContext('2d')
    }
})
</script>
<style lang="less" scoped>
.draw-title {
    text-align: center;
    height: 40px;
    font-size: 20px;
    color: var(--vp-c-brand);
}
.draw-tools {
    display: flex;
}
.draw-canvas-box {
    height: 300px;
    margin-top: 20px;
    background-color: gray;
}
</style>
