/* eslint-disable no-use-before-define */
/*
 * @file: 拖拽移动 拖拽边框放大缩小
 * @author: DontK
 * @LastEditTime: 2024-07-23 14:52:02
 */
import { App, Directive } from 'vue'

const dragResize: Directive = {
    mounted(el, binding) {
        if (!binding.value) {
            return
        }
        const { dragMoveId, dragTopId, dragRightId, dragBottomId, dragLeftId, minWidth, minHeight } = binding.value

        let dragId = ''
        const movePos = {
            left: 0,
            top: 0
        }
        const resizePos = {
            minLeft: 0,
            maxTop: 0
        }

        // 鼠标移动
        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event // 鼠标到左和上的距离
            const { top, right, bottom, left, width, height } = el.getBoundingClientRect()
            // 移动
            if (dragId === dragMoveId) {
                const newLeft = clientX - movePos.left // 元素左位置
                const newTop = clientY - movePos.top // 元素上位置
                if (newLeft < 0) {
                    el.style.left = `0px`
                } else if (newLeft > window.innerWidth - width) {
                    el.style.left = `${window.innerWidth - width}px`
                } else {
                    el.style.left = `${newLeft}px`
                }
                if (newTop < 0) {
                    el.style.top = `0px`
                } else if (newTop > window.innerHeight - height) {
                    el.style.top = `${window.innerHeight - height}px`
                } else {
                    el.style.top = `${newTop}px`
                }
            } else if (dragId === dragTopId) {
                // 拖动上方
                let newHeight = bottom - event.clientY
                let newTop = top + height - newHeight
                if (newHeight < minHeight) newHeight = minHeight
                el.style.height = `${newHeight}px`
                if (newHeight === minHeight) newTop = resizePos.maxTop
                el.style.top = `${newTop}px`
            } else if (dragId === dragRightId) {
                // 拖动右侧
                let newWidth = event.clientX - left
                if (newWidth < minWidth) newWidth = minWidth
                el.style.width = `${newWidth}px`
            } else if (dragId === dragBottomId) {
                // 拖动下方
                let newHeight = event.clientY - top
                if (newHeight < minHeight) newHeight = minHeight
                el.style.height = `${newHeight}px`
            } else if (dragId === dragLeftId) {
                // 拖动左侧
                let newWidth = right - event.clientX
                let newLeft = left + width - newWidth
                if (newWidth < minWidth) newWidth = minWidth
                el.style.width = `${newWidth}px`
                if (newWidth === minWidth) newLeft = resizePos.minLeft
                el.style.left = `${newLeft}px`
            }
        }

        // 鼠标抬起
        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        // 鼠标按下
        const handleMouseDown = (event: MouseEvent) => {
            event.preventDefault()
            event.stopPropagation()
            const targetId = (event.target as any).id
            if (![dragMoveId, dragTopId, dragRightId, dragBottomId, dragLeftId].includes(targetId)) {
                return
            }
            const { top, bottom, left } = el.getBoundingClientRect()
            dragId = targetId
            movePos.left = event.clientX - left // 鼠标到元素左距离
            movePos.top = event.clientY - top // 鼠标到元素上距离
            resizePos.minLeft = left
            resizePos.maxTop = bottom - minHeight
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }

        el.addEventListener('mousedown', handleMouseDown)

        // 清除事件
        el.cleanUpDrag = () => {
            el.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    },
    unmounted(el) {
        if (el.cleanUpDrag) {
            el.cleanUpDrag()
            delete el.cleanUpDrag
        }
    }
}

/**
 * @methods 拖拽元素移动，用法: v-dragResize
 */
export const setupDragResize = (app: App<Element>) => {
    app.directive('dragResize', dragResize)
}

export default dragResize
