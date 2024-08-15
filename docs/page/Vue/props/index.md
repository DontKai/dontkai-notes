# props

## 标注类型使用

```vue
<script setup lang="ts">
// 方式一
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

// 方式二
import type { PropType } from 'vue'

interface Param4 {
    [key: string]: any
}
const props = defineProps({
  param4: Array as PropType<any[]>
  param5: Object as PropType<Book>
})

// 方式三: 通过 withDefaults 编译器宏解决
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
</script>
```
