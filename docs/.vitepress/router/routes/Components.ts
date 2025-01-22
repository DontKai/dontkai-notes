/*
 * @file: 组件 路由
 * @author: DontK
 * @LastEditTime: 2025-01-22 18:05:47
 */
export const Components_Nav = { text: '组件', link: '/page/Components/textEditor/' }

export default {
    '/page/Components/': [
        {
            text: '文本编辑器',
            link: '/page/Components/textEditor/'
        },
        {
            text: '文件上传',
            link: '/page/Components/baseUpload/'
        },
        {
            text: '无限滚动(向下)',
            link: '/page/Components/scrollInfinite/'
        },
        {
            text: '无限滚动(向上向下)',
            link: '/page/Components/scrollInfinitePlus/'
        },
        {
            text: '文本超出隐藏，鼠标悬浮显示',
            link: '/page/Components/overflowTooltip/'
        },
        {
            text: '拖拽移动，拖大，拖小',
            link: '/page/Components/baseDrag/'
        }
    ]
}
