<script setup lang="ts">
    import Example from './components/example.vue'
</script>

# useRequest

## useRequest.ts

简单的封装请求函数，内置 loading 状态

::: details 点我查看代码

```typescript
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
```

:::

## 使用示例

<!-- 代码 -->
<Example />

```typescript
import { testReq } from 'xxx/testReq'

const [testLoading, testRequest] = useRequest(testReq)

const testClick = async () => {
    const res = await testRequest()
    ...
}
```
