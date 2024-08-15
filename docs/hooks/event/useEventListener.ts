import { onMounted, onUnmounted } from 'vue'

/**
 * 使用自定义的事件监听器
 * 此函数用于在组件挂载时向指定目标添加事件监听器，并在组件卸载时移除事件监听器
 * 它帮助开发者在组件生命周期内安全地管理事件监听器，避免内存泄漏
 *
 * @param target 任何可以添加事件监听器的对象，如DOM元素或组件实例
 * @param event 要监听的事件名称，如'click'、'mouseover'等
 * @param callback 事件触发时执行的回调函数
 */
export const useEventListener = (target: any, event: string, callback: Function) => {
    // 在组件挂载时添加事件监听器
    onMounted(() => target.addEventListener(event, callback))
    // 在组件卸载时移除事件监听器
    onUnmounted(() => target.removeEventListener(event, callback))
}
