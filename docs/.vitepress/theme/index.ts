// 在.vitepress/theme/index.ts文件
import DefaultTheme from 'vitepress/theme'
import 'element-plus/dist/index.css'
import './custom.css'
import { setupElementPlus, setupElementPlusIcon } from '../plugins/ElementPlus'
import CustomLayout from './Layout.vue'
import KDemoCard from '../../components/KDemoCard/index.vue'
import KTestButton from '../../components/KTestButton/index.vue'

export default {
    extends: DefaultTheme,
    Layout: CustomLayout,
    enhanceApp: ({ app }) => {
        // 注册element-plus
        setupElementPlus(app)
        setupElementPlusIcon(app)
        // 全局注册基础组件
        app.component('KDemoCard', KDemoCard)
        app.component('KTestButton', KTestButton)
    }
}
