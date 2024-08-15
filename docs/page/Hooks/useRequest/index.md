<script setup lang="ts">
    import Example from './components/example.vue'
</script>

# useRequest

简单的封装请求函数，内置 loading 状态

## 示例

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

## 代码

::: details 点我查看代码
<<< @/hooks/web/useRequest.ts
:::
