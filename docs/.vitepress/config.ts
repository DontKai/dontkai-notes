import { defineConfig } from 'vitepress'
import sidebarConf from './router/sidebarConf'
import navConf from './router/navConf'
import socialLinksConf from './router/socialLinksConf'

export default defineConfig({
    // head 会被渲染成 <link .... >
    base: '/dontkai-notes/',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }], // 页头icon
        ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }] // 字体
    ],
    lang: 'zh-CN',
    title: 'DontKai',
    description: 'DontKai 的documents',
    lastUpdated: true,
    themeConfig: {
        logo: '/hero.png',
        search: {
            provider: 'local'
        },
        nav: navConf,
        socialLinks: socialLinksConf as any,
        sidebar: sidebarConf,
        outline: {
            level: [2, 6],
            label: '目录'
        },
        lastUpdated: {
            text: '最后更新于'
        },
        footer: {
            message: '基于 MIT 许可发布',
            copyright: 'Copyright © 2024-present DontKai'
        }
    }
})
