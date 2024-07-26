/*
 * @file: 侧边栏导航
 * @author: DontK
 * @LastEditTime: 2024-07-26 11:11:47
 */
import { DefaultTheme } from 'vitepress'
import CSS from './routes/CSS'
import JavaScript from './routes/JavaScript'
import Vue from './routes/Vue'
import Components from './routes/Components'
import Hooks from './routes/Hooks'
import Utils from './routes/Utils'
import Directive from './routes/Directive'
import Python from './routes/Python'

const sidebarConf: DefaultTheme.Sidebar = {
    '/page/CSS/': CSS,
    '/page/JavaScript/': JavaScript,
    '/page/Vue/': Vue,
    '/page/Components/': Components,
    '/page/Hooks/': Hooks,
    '/page/Utils/': Utils,
    '/page/Directive/': Directive,
    '/page/Python/': Python
}

export default sidebarConf
