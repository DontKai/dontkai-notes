// import { defineStore } from 'pinia'
// import storageOwn from '../../utils/cryptoUtils/storageOwn'

// interface UserState {
//     [key: string]: any
//     userBaseInfo: any
//     token: string
// }

// const useUserStore = defineStore('userStore', {
//     state: (): UserState => {
//         return {
//             userBaseInfo: {}, // 用户信息
//             token: '' // token
//         }
//     },
//     getters: {},
//     actions: {
//         clearState() {
//             this.userBaseInfo = {}
//             this.token = ''
//         }
//     },
//     persist: {
//         enabled: true,
//         strategies: [
//             {
//                 key: 'dk_user', // 自定义存储名称
//                 storage: storageOwn, // 自定义存储位置
//                 paths: ['userBaseInfo', 'token'] // 指定要持久化的字段
//             }
//         ]
//     }
// })

// export default useUserStore
