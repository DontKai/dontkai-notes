# props 使用

## 方式一

```ts
const props = defineProps({
    param4: {
        type: Array,
        required: true,
        default: () => []
    },
    param5: {
        type: Object,
        default: () => ({})
    }
})
```

## 方式二

结合 withDefaults

```ts
const props = withDefaults(
    defineProps<{
        param1: string
        param2?: number
        param3?: boolean
        param4?: any[]
        param5?: {
            [key: string]: any
        }
    }>(),
    {
        param1: '',
        param2: 0,
        param3: false,
        param4: () => [],
        param5: () => ({})
    }
)
```
