import { ref } from 'vue'
import { useEventListener } from './useEventListener'

/**
 * 使用useMouse钩子来追踪目标元素上的鼠标位置
 *
 * @param target 目标元素，可以是具体的DOM元素或者是一个包含ref属性的对象
 * @returns 返回一个对象，包含鼠标位置的x和y坐标
 */
export const useMouse = (target: any) => {
    // 初始化x坐标为0
    const x = ref(0)
    // 初始化y坐标为0
    const y = ref(0)

    // 监听目标元素上的mousemove事件，以更新鼠标位置
    useEventListener(target, 'mousemove', (event: any) => {
        // 更新鼠标位置的x坐标
        x.value = event.pageX
        // 更新鼠标位置的y坐标
        y.value = event.pageY
    })

    // 返回当前鼠标位置的x和y坐标
    return { x, y }
}
