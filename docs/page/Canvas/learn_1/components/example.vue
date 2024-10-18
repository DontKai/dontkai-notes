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
const {
    drawCanvasBoxRef,
    drawCanvasRef,
    content,
    clearDraw,
    drawLine,
    drawDashLine,
    drawSquare,
    drawTriangle,
    drawBezierCurve,
    drawArc
} = useDrawCanvas()
function useDrawTools() {
    const tools: Option[] = [
        {
            value: 'line',
            label: '画线'
        },
        {
            value: 'dashLine',
            label: '画虚线'
        },
        {
            value: 'triangle',
            label: '画三角形'
        },
        {
            value: 'bezierCurve',
            label: '画贝塞尔曲线'
        },
        {
            value: 'square',
            label: '画正方形'
        },
        {
            value: 'arc',
            label: '画圆弧'
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
                case 'dashLine':
                    drawDashLine()
                    break
                case 'square':
                    drawSquare()
                    break
                case 'triangle':
                    drawTriangle()
                    break
                case 'bezierCurve':
                    drawBezierCurve()
                    break
                case 'arc':
                    drawArc()
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

    // 画虚线
    const drawDashLine = () => {
        if (content.value) {
            content.value.beginPath()
            content.value.moveTo(100, 150)
            content.value.lineTo(200, 10)
            content.value.lineTo(275, 250)
            content.value.lineTo(380, 150)
            content.value.strokeStyle = 'red'
            content.value.setLineDash([10, 5])
            content.value.stroke()
            content.value.closePath()
        }
    }

    // 画三角形
    const drawTriangle = () => {
        if (content.value) {
            // content.value.beginPath()
            // content.value.moveTo(60, 60)
            // content.value.lineTo(150, 60)
            // content.value.lineTo(150, 150)
            // content.value.lineTo(60, 60)
            // 先设置样式 再绘制 再关闭路径 则会导致闭合不完全
            // content.value.lineWidth = 5
            // content.value.strokeStyle = 'red'
            // content.value.stroke()
            // content.value.closePath()
            content.value.beginPath()
            content.value.moveTo(60, 60)
            content.value.lineTo(150, 60)
            content.value.lineTo(150, 150)
            content.value.lineTo(60, 60)
            content.value.closePath()
            // 先关闭路径 再设置样式 再绘制 解决闭合不完全问题
            content.value.lineWidth = 5
            content.value.strokeStyle = 'red'
            content.value.stroke()
        }
    }

    // 画贝塞尔曲线
    const drawBezierCurve = () => {
        if (content.value) {
            console.log('content.value: ', content.value)
            // 三次贝塞尔曲线
            content.value.beginPath()
            content.value.moveTo(100, 150)
            // content.value.quadraticCurveTo(200, 10, 380, 150) // 一个曲线，控制点(200,10) 结束点(300,100)
            content.value.bezierCurveTo(200, 10, 275, 250, 380, 150) // 两个曲线，控制点1(200,10) 控制点2(275,250) 结束点(300,100)
            content.value.stroke()
            content.value.closePath()
            // 辅助线
            content.value.beginPath()
            content.value.moveTo(100, 150)
            content.value.lineTo(200, 10)
            content.value.lineTo(275, 250)
            content.value.lineTo(380, 150)
            content.value.strokeStyle = 'red'
            content.value.stroke()
            content.value.closePath()
        }
    }

    // 画正方形
    const drawSquare = () => {
        if (content.value) {
            // 方法一: lineTo
            content.value.beginPath()
            // fillStyle()填充颜色一定要写在生成矩形fillRect()之前，否则颜色不生效
            content.value.fillStyle = 'skyblue'
            content.value.fillRect(50, 50, 100, 100) // 填充区域大小
            content.value.moveTo(50, 50)
            content.value.lineTo(150, 50)
            content.value.lineTo(150, 150)
            content.value.lineTo(50, 150)
            content.value.lineTo(50, 50)
            content.value.stroke()
            content.value.closePath()
            // 方法二: strokeRect(x,y,width,height)
            content.value.beginPath()
            // fillStyle()填充颜色一定要写在生成矩形fillRect()之前，否则颜色不生效
            content.value.fillStyle = 'red'
            content.value.fillRect(160, 50, 100, 100) // 填充区域大小
            content.value.strokeRect(160, 50, 100, 100)
            content.value.closePath()
            // 方法三: stroke()和rect()
            content.value.beginPath()
            content.value.rect(270, 50, 100, 100)
            content.value.fillStyle = 'blue'
            // fill()方法和stroke()方法都是用来绘制出来形状，只不过前者是填充绘制，后者是用线轮廓。
            content.value.fill()
            // content.value.stroke()
            content.value.closePath()
        }
    }

    // 画圆弧
    const drawArc = () => {
        if (content.value) {
            // 1、arc()绘制圆 arc(x, y, radius, startAngle, endAngle, anticlockwise)
            // x,y：圆形坐标 radius：半径 startAngle：初始角度 endAngle：结束角度 anticlockwise：false顺时针或true逆时针(默认为false)
            content.value.beginPath()
            content.value.arc(100, 100, 50, 0, ([Math.PI / 180] as any) * 360) // (Math.PI) / 180 = 1°
            content.value.stroke() // 如果此处改为使用fill()方法，那么将会绘制出填充的圆
            content.value.closePath()
            // 2、arc()绘制圆弧
            content.value.beginPath()
            content.value.arc(220, 100, 50, 0, ([Math.PI / 180] as any) * 90) // (Math.PI) / 180 = 1°
            content.value.stroke()
            content.value.closePath()
            // 3、arcTo()绘制圆弧 arcTo(x1,y1,x2,y2,radius)
            // x1,y1：两切线交点坐标 x2,y2：结束点坐标 radius：半径
            content.value.beginPath()
            content.value.moveTo(400, 100) // 定义线段的起点
            content.value.arcTo(450, 50, 500, 200, 45) // 切线交点坐标为(350,50)，结束点为(500,200)
            content.value.lineWidth = 1
            content.value.stroke()
            content.value.closePath()
            // 辅助线
            content.value.beginPath()
            content.value.moveTo(400, 100)
            content.value.lineTo(450, 50)
            content.value.lineTo(500, 200)
            content.value.strokeStyle = 'red'
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
        drawDashLine,
        drawSquare,
        drawTriangle,
        drawBezierCurve,
        drawArc
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
