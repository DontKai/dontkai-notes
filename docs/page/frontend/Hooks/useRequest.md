# useRequest

## useRequest.ts

```javascript
import { Ref, ref } from 'vue'

const useRequest = (req: Function): [Ref<boolean>, Function] => {
    const loading = ref(false)
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
```

## 使用示例

<script setup lang="ts">
import { Ref, ref } from 'vue'
import TestButton from '../../../components/TestButton.vue'
import Demo from '../../../components/Demo.vue'

const data = ref({})
const useRequest = (req: Function): [Ref<boolean>, Function] => {
    const loading = ref<boolean>(false);
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

const testReq = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                code: '200',
                data: 'Hello World'
            })
        }, 1000)
    })
}

const [testLoading, testRequest] = useRequest(testReq)

const testClick = async () => {
    if(data.value){
        data.value = {};
    }
    const res = await testRequest();
    data.value = res
}
</script>

<Demo>
    <div>loading: {{ testLoading }}</div>
    <div>data: {{ data }}</div>
    <TestButton @call="testClick" />
</Demo>

<!-- 代码 -->

```javascript
import { Ref, ref } from 'vue'

const testReq = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                code: '200',
                data: 'Hello World'
            })
        }, 1000)
    })
}

const [testLoading, testRequest] = useRequest(testReq)

const testClick = async () => {
    const res = await testRequest()
    data.value = res
}
```
