/*
 * @file: 侧边栏导航
 * @author: DontK
 * @LastEditTime: 2025-02-06 14:04:50
 */
import { DefaultTheme } from 'vitepress'
import HTML from './routes/HTML'
import CSS from './routes/CSS'
import JavaScript from './routes/JavaScript'
import TypeScript from './routes/TypeScript'
import Vue from './routes/Vue'
import Plugins from './routes/Plugins'
import Others from './routes/Others'

const sidebarConf: DefaultTheme.Sidebar = {
    ...HTML,
    ...CSS,
    ...JavaScript,
    ...TypeScript,
    ...Vue,
    ...Plugins,
    ...Others
}

export default sidebarConf
