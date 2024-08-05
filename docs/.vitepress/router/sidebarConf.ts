/*
 * @file: 侧边栏导航
 * @author: DontK
 * @LastEditTime: 2024-08-05 10:29:05
 */
import { DefaultTheme } from 'vitepress'
import CSS from './routes/CSS'
import JavaScript from './routes/JavaScript'
import Vue from './routes/Vue'
import Components from './routes/Components'
import Hooks from './routes/Hooks'
import Utils from './routes/Utils'
import Directive from './routes/Directive'
import Plugins from './routes/Plugins'
import Others from './routes/Others'
import Python from './routes/Python'

const sidebarConf: DefaultTheme.Sidebar = {
    '/page/CSS/': CSS,
    '/page/JavaScript/': JavaScript,
    '/page/Vue/': Vue,
    '/page/Components/': Components,
    '/page/Hooks/': Hooks,
    '/page/Utils/': Utils,
    '/page/Directive/': Directive,
    '/page/Plugins/': Plugins,
    '/page/Others/': Others,
    '/page/Python/': Python
}

export default sidebarConf
