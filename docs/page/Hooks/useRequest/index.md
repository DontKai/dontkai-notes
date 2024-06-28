<script setup lang="ts">
    import Example from './components/example.vue'
</script>

# useRequest

## useRequest.ts

简单的封装请求函数，内置 loading 状态

::: details 点我查看代码
<<< @/hooks/useRequest.ts

:::

## 使用示例

<!-- 示例代码 -->
<Example />

```typescript
import { testReq } from 'xxx/testReq'

const [testLoading, testRequest] = useRequest(testReq)

const testClick = async () => {
    const res = await testRequest()
    ...
}
```
