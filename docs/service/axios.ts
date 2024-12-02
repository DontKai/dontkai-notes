// import { ElMessage, ElMessageBox } from 'element-plus'
// import axios from 'axios'
// import router from '@/router/index'
// import useUserStore from '@/store/modules/useUserStore'
// import useMainStore from '@/store/modules/useMainStore'
// import useAuthStore from '@/store/modules/useAuthStore'

// const service = axios.create({
//     baseURL: import.meta.env.VITE_BASE_URL
// })

// service.interceptors.request.use(
//     (config: any) => {
//         // showL();
//         const userStore = useUserStore()
//         if (userStore.token) {
//             // eslint-disable-next-line no-param-reassign
//             config.headers.Authorization = `${userStore.token}`
//         }
//         return config
//     },
//     (error) => {
//         // hideL();
//         return Promise.reject(error)
//     }
// )

// service.interceptors.response.use(
//     (response) => {
//         // hideL();
//         const res = response.data
//         const userStore = useUserStore()
//         const mainStore = useMainStore()
//         const authStore = useAuthStore()
//         if (res.code && res.code !== '200') {
//             if (res.code === '401') {
//                 if (!userStore.isErrorMessage) {
//                     userStore.isErrorMessage = true
//                     ElMessageBox.confirm('会话失效，请重新登录', '注意', {
//                         confirmButtonText: '确认',
//                         showClose: false,
//                         showCancelButton: false,
//                         closeOnClickModal: false,
//                         closeOnPressEscape: false,
//                         type: 'warning'
//                     }).then(() => {
//                         router.push('/login')
//                         setTimeout(() => {
//                             userStore.clearState()
//                             mainStore.clearState()
//                             authStore.clearState()
//                         }, 1000)
//                     })
//                 }
//             } else if (['300', '302', '303'].includes(res.code)) {
//                 if (!userStore.isErrorMessage) {
//                     userStore.isErrorMessage = true
//                     ElMessage({
//                         message: res.msg || 'Error',
//                         showClose: true,
//                         type: 'error',
//                         duration: 5 * 1000
//                     })
//                     router.push('/login')
//                     setTimeout(() => {
//                         userStore.clearState()
//                         mainStore.clearState()
//                         authStore.clearState()
//                     }, 2000)
//                 }
//             } else {
//                 ElMessage({
//                     message: res.msg || 'Error',
//                     showClose: true,
//                     type: 'error',
//                     duration: 5 * 1000
//                 })
//             }
//             return Promise.reject(res || 'Error')
//         }
//         return res
//     },
//     (error) => {
//         // hideL();
//         const res = error.response.data
//         const userStore = useUserStore()
//         const mainStore = useMainStore()
//         const authStore = useAuthStore()
//         if (res.code && res.code === '300') {
//             if (!userStore.isErrorMessage) {
//                 userStore.isErrorMessage = true
//                 ElMessageBox.confirm('会话失效，请重新登录', '注意', {
//                     confirmButtonText: '确认',
//                     showClose: false,
//                     showCancelButton: false,
//                     closeOnClickModal: false,
//                     closeOnPressEscape: false,
//                     type: 'warning'
//                 }).then(() => {
//                     router.push('/login')
//                     setTimeout(() => {
//                         userStore.clearState()
//                         mainStore.clearState()
//                         authStore.clearState()
//                     }, 2000)
//                 })
//             }
//         } else if (res.status && res.status === 404) {
//             if (!userStore.isErrorMessage) {
//                 userStore.isErrorMessage = true
//                 ElMessage({
//                     message: '找不到该请求404',
//                     showClose: true,
//                     type: 'error',
//                     duration: 5 * 1000
//                 })
//             }
//         }
//         return Promise.reject(error)
//     }
// )

// export default service
