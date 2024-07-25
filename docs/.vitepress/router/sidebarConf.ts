/*
 * @file: 侧边栏导航
 * @author: DontK
 * @LastEditTime: 2024-07-25 13:32:39
 */
import { DefaultTheme } from 'vitepress'
import CSS from './routes/CSS'
import JavaScript from './routes/JavaScript'
import Vue from './routes/Vue'
import Hooks from './routes/Hooks'
import Utils from './routes/Utils'
import Directive from './routes/Directive'
import Python from './routes/Python'

const sidebarConf: DefaultTheme.Sidebar = {
    '/page/CSS/': CSS,
    '/page/JavaScript/': JavaScript,
    '/page/Vue/': Vue,
    '/page/Hooks/': Hooks,
    '/page/Utils/': Utils,
    '/page/Directive/': Directive,
    '/page/Python/': Python
}

export default sidebarConf
