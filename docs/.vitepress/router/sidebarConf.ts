/*
 * @file: 侧边栏导航
 * @author: DontK
 * @LastEditTime: 2024-06-24 16:10:55
 */
import { DefaultTheme } from 'vitepress'
import JavaScript from './routes/JavaScript'
import Vue from './routes/Vue'
import Hooks from './routes/Hooks'

const sidebarConf: DefaultTheme.Sidebar = {
    '/page/frontend/JavaScript/': JavaScript,
    '/page/frontend/Vue/': Vue,
    '/page/frontend/Hooks/': Hooks
}

export default sidebarConf
