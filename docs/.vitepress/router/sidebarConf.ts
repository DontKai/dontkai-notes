/*
 * @file: 侧边栏导航
 * @author: DontK
 * @LastEditTime: 2024-12-02 15:53:17
 */
import { DefaultTheme } from 'vitepress'
import CSS_HTML from './routes/CSS_HTML'
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
import Python from './routes/Python'

const sidebarConf: DefaultTheme.Sidebar = {
    '/page/CSS_HTML/': CSS_HTML,
    '/page/JavaScript/': JavaScript,
    '/page/TypeScript/': TypeScript,
    '/page/Canvas/': Canvas,
    '/page/Vue/': Vue,
    '/page/Components/': Components,
    '/page/Animation/': Animation,
    '/page/Hooks/': Hooks,
    '/page/Utils/': Utils,
    '/page/Service/': Service,
    '/page/Directive/': Directive,
    '/page/Plugins/': Plugins,
    '/page/Others/': Others,
    '/page/Python/': Python
}

export default sidebarConf
