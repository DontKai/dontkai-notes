import { defineStore } from 'pinia'
import storageOwn from '../../utils/storageOwn'

interface PermissionState {
    [key: string]: any
    buttonList: any[]
}

const usePermissionStore = defineStore('permission', {
    state: (): PermissionState => ({
        buttonList: []
    }),
    getters: {},
    actions: {
        clearState() {
            this.buttonList = []
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'dk_permission', // 自定义存储名称
                storage: storageOwn // 自定义存储位置
                // paths: []
            }
        ]
    }
})

export default usePermissionStore
