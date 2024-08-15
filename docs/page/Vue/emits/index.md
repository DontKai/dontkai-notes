# emits

## 标注类型使用

```vue
<script setup lang="ts">
// 方式一：运行时
const emit = defineEmits(['change', 'update'])

// 方式二：基于选项
const emit = defineEmits({
    change: (id: number) => {
        // 返回 `true` 或 `false`
        // 表明验证通过或失败
    },
    update: (value: string) => {
        // 返回 `true` 或 `false`
        // 表明验证通过或失败
    }
})

// 方式三：基于类型
const emit = defineEmits<{
    (e: 'change', id: number): void
    (e: 'update', value: string): void
}>()

// 方式四：: 可选的、更简洁的语法
const emit = defineEmits<{
    change: [id: number]
    update: [value: string]
}>()
</script>
```
