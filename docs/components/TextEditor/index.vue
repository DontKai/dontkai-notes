<!--
 * @file: 输入框插入标签
 * @author: DontK
 * @LastEditTime: 2024-08-01 14:32:00
-->
<template>
    <div class="el-textarea">
        <div
            ref="textRef"
            class="el-textarea__inner"
            :contenteditable="true"
            :placeholder="props.placeholder"
            @input="handleInput"
            @blur="handleBlur"
        ></div>
    </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'

const emit = defineEmits(['blur', 'input', 'addTag'])
const props = withDefaults(
    defineProps<{
        placeholder?: string
        varColor?: string
        varList?: any[]
    }>(),
    {
        placeholder: '请输入',
        varColor: 'red',
        varList: () => {
            return []
        }
    }
)
const inputValue = defineModel()
const textRef = ref<HTMLDivElement>()
const range = shallowRef<Range>()
const selection = shallowRef<Selection | null>(null)
const handleInput = () => {
    if (textRef.value!.innerText) {
        inputValue.value = textRef.value!.innerText
    } else {
        inputValue.value = ''
    }
}

const handleBlur = () => {
    selection.value = window.getSelection()
    range.value = selection.value?.getRangeAt(0)
    emit('blur')
}

/**
 * @description 点击参数展示到输入框
 */
const getSpanTag = (item: any) => {
    // 创建前缀
    const prefix: string = `<span contenteditable="false" disabled="disabled" class="textarea-var">`
    // 创建后缀
    const suffix: string = '</span>'
    // 创建span元素
    const el: any = document.createElement('span')
    el.innerHTML = prefix + item.label + suffix
    // 去掉外层的span
    const frag = document.createDocumentFragment()
    const node = frag.appendChild(el.firstChild!)
    if (!selection.value) {
        textRef.value?.focus()
        selection.value = window.getSelection()
        range.value = selection.value?.getRangeAt(0)
    }
    // 插入tag
    range.value?.insertNode(node)
    // 设置光标
    range.value?.setStartAfter(node)
    range.value?.collapse(true)
    // 不移除selection会到聚焦点击的文本
    selection.value?.removeAllRanges()
    // 添加选区
    selection.value?.addRange(range.value!)
    handleInput()
}

// 清空输入框内容
const clearHtml = () => {
    if (textRef.value!.innerHTML) {
        textRef.value!.innerHTML = ''
    }
}

// 详情回显输入框内容
const setInputHtml = (val: any) => {
    let str: any = val
    props.varList.forEach((item: any) => {
        str = str.replaceAll(
            item.label,
            `<span contenteditable="false" disabled="disabled" class="textarea-var">${item.label}</span>`
        )
    })
    textRef.value!.innerHTML = str
}

defineExpose({
    getSpanTag,
    clearHtml,
    setInputHtml
})
</script>

<style scoped lang="less">
.el-textarea {
    .el-textarea__inner {
        width: 100%;
        height: 240px;
        min-height: 32px;
        box-sizing: border-box;
        display: block;
        overflow: auto;
        background-image: none;
        color: #606266;
        font-family: inherit;
        font-size: inherit;
        position: relative;
        resize: vertical;
        width: 100%;
        background-color: #fff;
        word-break: break-all;
        border: none;
        outline: none;
        // border-radius: 4px;
        // padding: 5px 11px;
        // box-shadow: 0 0 0 1px #dcdfe6 inset;
        // transition: box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        // &:hover {
        //     box-shadow: 0 0 0 1px #c0c4cc inset;
        // }
        // &:focus {
        //     box-shadow: 0 0 0 1px #3b1af4 inset;
        // }
        // 滚动条样式
        &::-webkit-scrollbar {
            width: 6px;
            transition: all 2s;
        }
        &::-webkit-scrollbar-track-piece {
            background-color: #f8f8f800;
        }
        &::-webkit-scrollbar-thumb {
            // height: 100px;
            border-radius: 100px;
            background-color: rgba(204, 204, 204, 0.8);
            cursor: pointer;
        }
        &::-webkit-scrollbar-thumb:hover {
            background-color: rgba(178, 178, 178, 0.8);
        }
        &::-webkit-scrollbar-corner {
            background-color: rgba(255, 255, 255, 0);
        }
        &:empty::before {
            content: attr(placeholder);
            color: #a8abb2;
        }
        /*文本框不为空时， placeholder设置为none*/
        &:focus:placeholder-shown {
            content: none;
        }
        :deep(.textarea-var) {
            font-size: 14px;
            color: v-bind('props.varColor');
        }
    }
}
</style>
