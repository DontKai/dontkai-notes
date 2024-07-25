import type { App } from 'vue'
import KDemoCard from './KDemoCard/index.vue'
import KTestButton from './KTestButton/index.vue'

/**
 * @description: 注册全局组件
 */
export const setupComponents = (app: App<Element>) => {
    app.component('KDemoCard', KDemoCard)
    app.component('KTestButton', KTestButton)
}
