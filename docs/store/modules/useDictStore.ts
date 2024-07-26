import { defineStore } from 'pinia'
import storageOwn from '../../utils/storageOwn'

interface DictState {
    [key: string]: any
    dictionaries: { [key: string]: any[] }
}

const useDictStore = defineStore('dict', {
    state: (): DictState => ({
        dictionaries: {}
    }),
    getters: {},
    actions: {
        clearState() {
            this.dictionaries = {}
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'dk_dict', // 自定义存储名称
                storage: storageOwn, // 自定义存储位置
                paths: []
            }
        ]
    }
})

export default useDictStore
