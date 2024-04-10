/*
 * @file: 侧边栏导航
 * @author: DontK
 * @LastEditTime: 2024-04-10 19:52:48
 */
import { DefaultTheme } from 'vitepress'
import HTML from './routes/HTML'
import CSS from './routes/CSS'
import JavaScript from './routes/JavaScript'
import TypeScript from './routes/TypeScript'
import Browser from './routes/Browser'
import Vue from './routes/Vue'

const sidebarConf: DefaultTheme.Sidebar = {
    '/page/frontend/HTML/': HTML,
    '/page/frontend/CSS/': CSS,
    '/page/frontend/JavaScript/': JavaScript,
    '/page/frontend/TypeScript/': TypeScript,
    '/page/frontend/Browser/': Browser,
    '/page/frontend/Vue/': Vue
}

export default sidebarConf
