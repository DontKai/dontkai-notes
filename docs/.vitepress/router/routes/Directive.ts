/*
 * @file: 自定义指令 路由
 * @author: DontK
 * @LastEditTime: 2024-12-24 14:08:28
 */
export const Directive_Nav = { text: '自定义指令', link: '/page/Directive/permission/' }

export default {
    '/page/Directive/': [
        {
            text: '自定义指令',
            link: '/page/Directive/index/'
        },
        {
            text: 'v-permission',
            link: '/page/Directive/permission/'
        },
        {
            text: 'v-adaptive',
            link: '/page/Directive/adaptive/'
        },
        {
            text: 'v-copy',
            link: '/page/Directive/copy/'
        }
    ]
}
