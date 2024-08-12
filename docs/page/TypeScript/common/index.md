# TypeScript 通用使用示例

<!-- const dialog = ref<InstanceType<typeof LoginForm>>(); -->

## InstanceType 结合 typeof 使用

InstanceType 函数: 该函数返回（构造） 由某个构造函数构造出来的实例类型组成的类型

### 示例一： 获取组件暴露属性的类型

定义组件

```vue
...

<script setup lang="ts">
...

const arrays = ref<string[]>([])
const func1 = () => {
    console.log(111)
}
defineExpose({
    arrays,
    func1
})
</script>
...
```

使用方式

```typescript
import Test from 'test.vue'
const component = ref<InstanceType<typeof Test>>()
```
