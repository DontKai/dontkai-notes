/*
 * @file: 侧边栏导航
 * @author: DontK
 * @LastEditTime: 2025-01-16 16:23:04
 */
import { DefaultTheme } from 'vitepress'
import HTML from './routes/HTML'
import CSS from './routes/CSS'
import JavaScript from './routes/JavaScript'
import TypeScript from './routes/TypeScript'
import Vue from './routes/Vue'
import Components from './routes/Components'
import Animation from './routes/Animation'
import Plugins from './routes/Plugins'
import Others from './routes/Others'

const sidebarConf: DefaultTheme.Sidebar = {
    ...HTML,
    ...CSS,
    ...JavaScript,
    ...TypeScript,
    ...Vue,
    ...Components,
    ...Animation,
    ...Plugins,
    ...Others
}

export default sidebarConf
