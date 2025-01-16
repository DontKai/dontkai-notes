/*
 * @file: 侧边栏导航
 * @author: DontK
 * @LastEditTime: 2025-01-16 14:29:14
 */
import { DefaultTheme } from 'vitepress'
import HTML from './routes/HTML'
import CSS from './routes/CSS'
import JavaScript from './routes/JavaScript'
import TypeScript from './routes/TypeScript'
import Canvas from './routes/Canvas'
import Vue from './routes/Vue'
import Components from './routes/Components'
import Animation from './routes/Animation'
import Plugins from './routes/Plugins'
import Others from './routes/Others'
import Git from './routes/Git'

const sidebarConf: DefaultTheme.Sidebar = {
    ...HTML,
    ...CSS,
    ...JavaScript,
    ...TypeScript,
    ...Canvas,
    ...Vue,
    ...Components,
    ...Animation,
    ...Plugins,
    ...Others,
    ...Git
}

export default sidebarConf
