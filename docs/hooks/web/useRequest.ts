import { Ref, ref } from 'vue'

const useRequest = (req: Function): [Ref<boolean>, Function] => {
    const loading = ref<boolean>(false)
    const request = (params: any) => {
        loading.value = true
        return new Promise((resolve, reject) => {
            req(params)
                .then((res: any) => {
                    resolve(res)
                })
                .catch((err: any) => {
                    reject(err)
                })
                .finally(() => {
                    loading.value = false
                })
        })
    }
    return [loading, request]
}

export default useRequest
