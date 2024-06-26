/*
 * @file: 侧边栏导航
 * @author: DontK
 * @LastEditTime: 2024-06-26 13:43:21
 */
import { DefaultTheme } from 'vitepress'
import JavaScript from './routes/JavaScript'
import Vue from './routes/Vue'
import Hooks from './routes/Hooks'

const sidebarConf: DefaultTheme.Sidebar = {
    '/page/JavaScript/': JavaScript,
    '/page/Vue/': Vue,
    '/page/Hooks/': Hooks
}

export default sidebarConf
