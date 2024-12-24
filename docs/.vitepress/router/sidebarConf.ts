/*
 * @file: 侧边栏导航
 * @author: DontK
 * @LastEditTime: 2024-12-24 14:12:28
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
import Hooks from './routes/Hooks'
import Utils from './routes/Utils'
import Service from './routes/Service'
import Directive from './routes/Directive'
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
    ...Hooks,
    ...Utils,
    ...Service,
    ...Directive,
    ...Plugins,
    ...Others,
    ...Git
}

export default sidebarConf
