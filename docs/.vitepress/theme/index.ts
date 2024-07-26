// 在.vitepress/theme/index.ts文件
import DefaultTheme from 'vitepress/theme'
import 'element-plus/dist/index.css'
import './custom.css'
import { setupElement } from '../plugins/ElementPlus'
import { setupDirective } from '../../directive'
// import { setupStore } from '../../store'
import { setupComponents } from '../../components'
import CustomLayout from './Layout.vue'

export default {
    extends: DefaultTheme,
    Layout: CustomLayout,
    enhanceApp: ({ app }) => {
        // 注册pinia
        // setupStore(app)
        // 注册element-plus
        setupElement(app)
        // 注册自定义指令
        setupDirective(app)
        // 全局注册基础组件
        setupComponents(app)
    }
}
