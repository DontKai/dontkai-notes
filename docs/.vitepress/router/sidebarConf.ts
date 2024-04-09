/*
 * @file: 侧边栏导航
 * @author: DontK
 * @LastEditTime: 2024-04-09 11:01:10
 */
import { DefaultTheme } from 'vitepress'
import HTML from './routes/HTML'
import CSS from './routes/CSS'
import JavaScript from './routes/JavaScript'
import TypeScript from './routes/TypeScript'
import Browser from './routes/Browser'

const sidebarConf: DefaultTheme.Sidebar = {
    '/page/frontend/HTML/': HTML,
    '/page/frontend/CSS/': CSS,
    '/page/frontend/JavaScript/': JavaScript,
    '/page/frontend/TypeScript/': TypeScript,
    '/page/frontend/Browser/': Browser
}

export default sidebarConf
