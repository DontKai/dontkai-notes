import { defineStore } from 'pinia'
// import storageOwn from '@/utils/storageOwn';

interface MainState {
    [key: string]: any
    collapse: boolean
}

const useMainStore = defineStore('main', {
    state: (): MainState => ({
        collapse: false
    }),
    getters: {},
    actions: {
        clearState() {
            this.collapse = false
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'dk_main', // 自定义存储名称
                // storage: storageOwn, // 自定义存储位置
                paths: []
            }
        ]
    }
})

export default useMainStore
