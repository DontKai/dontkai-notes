<!--
 * @file: 文件手动上传
 * @author: DontK
 * @LastEditTime: 2024-07-30 14:14:53
-->
<template>
    <el-upload
        class="btn-upload"
        ref="uploadRef"
        v-model:file-list="fileList"
        :class="{ 'not-allow-allowed': props.disabled }"
        :limit="1"
        :accept="props.accept"
        :multiple="props.multiple"
        :disabled="props.disabled"
        :show-file-list="false"
        :drag="props.drag"
        :on-exceed="handleExceed"
        :before-upload="beforeUpload"
        :http-request="httpRequest"
    >
        <slot></slot>
    </el-upload>
</template>

<script setup lang="ts">
import { ElMessage, genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { reactive, ref } from 'vue'

const emit = defineEmits(['importFile'])
const props = withDefaults(
    defineProps<{
        accept?: string // 文件类型
        disabled?: boolean // 禁用状态
        multiple?: boolean // 是否多选
        drag?: boolean // 是否拖拽
        replace?: boolean // 是否替换
        total?: number // 文件总数
        totalLimit?: number // 文件总数限制
        singleLimit?: number // 单次上传限制个数
        fileSizeLimit?: number // 文件大小限制
    }>(),
    {
        accept: '.xls,.xlsx,.csv',
        disabled: false,
        multiple: false,
        drag: false,
        replace: false,
        total: 0,
        totalLimit: 0,
        singleLimit: 0,
        fileSizeLimit: 0
    }
)
const uploadRef = ref<UploadInstance>()
const fileList = defineModel<any>('fileList', {
    get(val) {
        return reactive(val || [])
    }
})

// 上传前校验
const beforeUpload = (rawFile: any) => {
    const exts = rawFile.name.split('.')
    const ext = `.${exts[exts.length - 1]}`
    const accepts = (props.accept || '').split(',')
    if (!accepts.includes(ext)) {
        ElMessage.error(`文件格式应为 ${props.accept} 格式！`)
        return false
    }
    const size = rawFile.size / 1024 / 1024
    if (props.fileSizeLimit && size > props.fileSizeLimit) {
        ElMessage.error(`上传的文件不能超过${props.fileSizeLimit}M！`)
        return false
    }
    return true
}

// 上传文件
const httpRequest = (rawFile: any): any => {
    if (!props.replace && props.totalLimit && props.total + 1 > props.totalLimit) {
        ElMessage.error(`上传的文件总数不能超过${props.totalLimit}个！`)
        return
    }
    emit('importFile', [rawFile.file])
    uploadRef.value!.clearFiles() // 上传完当前文件后清空组件文件列表
}

// 替换文件
const handleExceed: UploadProps['onExceed'] = (files) => {
    if (props.singleLimit && files.length > props.singleLimit) {
        ElMessage.error(`单次上传的文件不能超过${props.singleLimit}个！`)
        return
    }
    if (props.totalLimit && props.total + files.length > props.totalLimit) {
        ElMessage.error(`上传的文件总数不能超过${props.totalLimit}个！`)
        return
    }
    if (props.replace && uploadRef.value) {
        uploadRef.value!.clearFiles()
        const file = files[0] as UploadRawFile
        file.uid = genFileId()
        uploadRef.value!.handleStart(file)
        uploadRef.value!.submit()
    } else {
        emit('importFile', files)
        uploadRef.value!.clearFiles() // 上传完当前文件后清空组件文件列表
    }
}
</script>

<style lang="less" scoped>
.btn-upload {
    height: 100%;
    width: 100%;
}
// :deep(.el-upload) {
//     height: 100%;
//     width: 100%;
//     .el-upload-dragger {
//         height: 100%;
//         padding: 0;
//         background-color: transparent !important;
//         border: none !important;
//     }
// }
.not-allow-allowed {
    :deep(.el-upload) {
        cursor: not-allowed;
    }
}
</style>
