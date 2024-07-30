<script setup lang="ts">
    import Example from './components/example.vue'
</script>

# 手动上传

手动上传：通过获取文件，手动上传文件

## 示例

```vue
<template>
    <BaseUpload
        class="btn-upload-plus"
        accept=".png,.jpg,.jpeg"
        multiple
        :single-limit="2"
        :file-size-limit="3"
        @import-file="importFile"
    >
        <el-button>点击上传</el-button>
    </BaseUpload>
</template>

<script setup lang="ts">
const importFile = (files: File[]) => {
    console.log('files: ', files)
}
</script>
```

<!-- 示例代码 -->
<Example />

## 代码

::: details 点我查看代码
<<< @/components/BaseUpload/index.vue
:::
