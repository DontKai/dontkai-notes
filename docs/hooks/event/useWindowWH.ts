// /*
//  * @file:
//  * @author: DontK
//  * @LastEditTime: 2024-12-03 14:08:44
//  */
// import { ref } from 'vue'
// import { useEventListener } from './useEventListener'

// export const useWindowWH = () => {
//     const width = ref<any>(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
//     const height = ref(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)

//     useEventListener(window, 'resize', (event: any) => {
//         width.value = event.target.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
//         height.value = event.target.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
//     })

//     return { width, height }
// }
