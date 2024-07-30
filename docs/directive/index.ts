/*
 * @file: 自定义指令
 * @author: DontK
 * @LastEditTime: 2024-07-30 09:59:24
 */
import type { App } from 'vue'
import { setupPermissionDirective } from './permission'
// import { setupAdaptiveDirective } from './adaptive'
import { setupCopy } from './copy'

/**
 * @description: 引入自定义指令
 */
export const setupDirective = (app: App<Element>) => {
    setupPermissionDirective(app)
    // setupAdaptiveDirective(app)
    setupCopy(app)
}
