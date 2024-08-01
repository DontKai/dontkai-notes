import type { App } from 'vue'
import { setupElementPlus } from './element-plus'
import { setupElementPlusIcon } from './element-plus-icon'

/**
 * @description: Element-Plus 和 图标
 */
export const setupElement = (app: App<Element>) => {
    setupElementPlus(app)
    setupElementPlusIcon(app)
}
