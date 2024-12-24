/*
 * @file: Service 路由
 * @author: DontK
 * @LastEditTime: 2024-06-26 14:12:05
 */
export const Service_Nav = { text: 'Service', link: '/page/Service/axios/' }

export default {
    '/page/Service/': [
        {
            text: 'axios 封装',
            link: '/page/Service/axios/'
        },
        {
            text: 'eventStream 封装',
            link: '/page/Service/eventStream/'
        },
        {
            text: 'webSocket 封装',
            link: '/page/Service/webSocket/'
        }
    ]
}
