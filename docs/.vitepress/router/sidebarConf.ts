/*
 * @file: 侧边栏导航
 * @author: DontK
 * @LastEditTime: 2025-01-16 16:47:56
 */
import { DefaultTheme } from 'vitepress'
import HTML from './routes/HTML'
import CSS from './routes/CSS'
import JavaScript from './routes/JavaScript'
import TypeScript from './routes/TypeScript'
import Vue from './routes/Vue'
import Components from './routes/Components'
import Plugins from './routes/Plugins'
import Others from './routes/Others'

const sidebarConf: DefaultTheme.Sidebar = {
    ...HTML,
    ...CSS,
    ...JavaScript,
    ...TypeScript,
    ...Vue,
    ...Components,
    ...Plugins,
    ...Others
}

export default sidebarConf
