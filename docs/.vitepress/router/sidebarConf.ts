/*
 * @file: 侧边栏导航
 * @author: DontK
 * @LastEditTime: 2024-06-28 10:31:42
 */
import { DefaultTheme } from 'vitepress'
import CSS from './routes/CSS'
import JavaScript from './routes/JavaScript'
import Vue from './routes/Vue'
import Hooks from './routes/Hooks'
import Python from './routes/Python'

const sidebarConf: DefaultTheme.Sidebar = {
    '/page/CSS/': CSS,
    '/page/JavaScript/': JavaScript,
    '/page/Vue/': Vue,
    '/page/Hooks/': Hooks,
    '/page/Python/': Python
}

export default sidebarConf
