<!--
 * @file pdf文件预览
 * @desc: 使用方式 <PDFPreview :source="xxx.pdf" />
 * @author: DontK
 * @LastEditTime: 2024-12-03 14:24:06
-->
<template>
    <div ref="pdfBoxRef" class="pdf-preview" :class="{ 'visibility-hidden': hidden }">
        <div class="pdf-box">
            <vue-pdf-embed
                ref="pdfRef"
                :source="sourceUrl"
                :width="pdfWidth"
                @password-requested="handlePasswordRequest"
                @rendered="handleDocumentRender"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'

const props = defineProps({
    // 是否只打印pdf
    isPrint: {
        type: Boolean,
        default: false
    },
    // pdf文件地址
    source: {
        type: String,
        default: ''
    }
})
const pdfBoxRef = ref<any>() // 预览ref
const pdfRef = ref<any>() // 预览pdf的ref
const pdfWidth = ref<number>(0) // 预览pdf文件宽度
const sourceUrl = ref<any>('')
const hidden = ref<boolean>(false)

/**
 * @description: 加载pdf文件
 */
const handleDocumentRender = () => {
    hidden.value = false
}

const handlePasswordRequest = (callback: any, retry: any) => {
    callback(prompt(retry ? 'Enter password again' : 'Enter password'))
}

onMounted(() => {
    nextTick(() => {
        sourceUrl.value = {
            url: props.source,
            // cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/cmaps/', // 在线文字字体
            // cMapUrl: '/src/components/Preview/cmaps/', // 本地文字字体
            cMapPacked: true
        }
        pdfWidth.value = pdfBoxRef.value.clientWidth
    })
})
</script>

<style lang="less" scoped>
.visibility-hidden {
    visibility: hidden;
}
.pdf-preview {
    height: 100%;
    width: 100%;
    padding: 0 !important;
    :deep(.vue-pdf-embed) {
        .vue-pdf-embed__page {
            display: flex;
            justify-content: center;
        }
    }
    .pdf-box {
        // height: calc(100% - 42px - 10px);
        // cursor: pointer;
    }
}
</style>
