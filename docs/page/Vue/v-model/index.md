# v-model 双向绑定

## 原理

## vue 3.4 之前组件使用

### 单个 v-model 绑定

```vue
<!-- Child.vue -->
<template>
    <el-input v-model="inputValue" />
</template>
<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        modelValue: string
    }>(),
    {
        modelValue: ''
    }
)
const emit = defineEmits(['update:modelValue'])
// 使用watch也可以，使用computed更方便
const inputValue = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emits('update:modelValue', value)
    }
})
</script>
```

```vue
<!-- Parent.vue -->
<template>
    <Child v-model="xxxxx" />
</template>
```

### 多个 v-model 绑定

```vue
<!-- Child.vue -->
<template>
    <el-input v-model="inputValue1" />
    <el-input v-model="inputValue2" />
</template>
<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        qqq: string
        www: string
    }>(),
    {
        qqq: '',
        www: ''
    }
)
const emit = defineEmits(['update:qqq', 'update:www'])
const inputValue1 = computed({
    get() {
        return props.qqq
    },
    set(value) {
        emits('update:qqq', value)
    }
})
const inputValue2 = computed({
    get() {
        return props.www
    },
    set(value) {
        emits('update:www', value)
    }
})
</script>
```

```vue
<!-- Parent.vue -->
<template>
    <Child v-model:qqq="xxxxx" v-model:www="xxxxx" />
</template>
```

## vue 3.4 之后组件使用

### defineModel 参数详解

defineModel(参数一(单个绑定可传可不传，多个绑定必须传), 参数二(选传，对象格式与 defineProps 定义参数方式相同))

1. 参数一：

    当为单个绑定时 v-model="xxx"，可不传参数(参数默认与 3.4 之前 modelValue)

    使用方式： defineModel() / defineModel('modelValue')

    当为多个绑定时 v-model:xxx="xxx"，传参数为 xxx

    使用方式： defineModel('xxx')

2. 参数二：与 defineProps 定义参数方式相同

    type: 类型,

    required: 是否必须

    default: 默认值

    validator:自定义验证

    get: 获取值

    set: 设置值

### 单个 v-model 绑定

```vue
<!-- Child.vue -->
<template>
    <el-input v-model="inputValue" />
</template>
<script setup lang="ts">
const inputValue = defineModel({ required: true, type: String, default: '' })
</script>
```

```vue
<!-- Parent.vue -->
<template>
    <Child v-model="xxxxx" />
</template>
```

### 多个 v-model 绑定

```vue
<!-- Child.vue -->
<template>
    <el-input v-model="inputValue1" />
    <el-input v-model="inputValue2" />
</template>
<script setup lang="ts">
const inputValue1 = defineModel({ required: true, type: String, default: '' })
const inputValue2 = defineModel({ required: true, type: String, default: '' })
</script>
```

```vue
<!-- Parent.vue -->
<template>
    <Child v-model:qqq="xxxxx" v-model:www="xxxxx" />
</template>
```

### defineModel 绑定对象/数组

```vue
<script setup lang="ts">
const form = defineModel('form', {
    get(val) {
        return reactive(val || {})
    }
})
const array = defineModel('array', {
    get(val) {
        return reactive(val || [])
    }
})
</script>
```
