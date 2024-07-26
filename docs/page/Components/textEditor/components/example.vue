<template>
    <KDemoCard>
        <div>
            插入标签内容
            <span class="compony-var" v-for="item in varList" :key="item.label" @click="handleCurrentChange(item)">
                {{ item.label }}
            </span>
        </div>
        <TextEditor
            ref="textEditor"
            :varList="varList"
            varColor="red"
            v-model="content"
            placeholder="文本编辑器，可点击变量进行插入"
        />
    </KDemoCard>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TextEditor from '../../../../components/TextEditor/index.vue'

const varList = [
    {
        label: '【标签1】',
        value: 'label1'
    },
    {
        label: '【标签2】',
        value: 'label2'
    },
    {
        label: '【标签3】',
        value: 'label3'
    }
]
const textEditor = ref<any>()
const content = ref<string>('')

// 插入变量
const handleCurrentChange = (item: any) => {
    textEditor.value!.getSpanTag(item)
}
</script>
<style lang="less" scoped>
:deep(.compony-var) {
    font-size: 14px;
    color: red;
    cursor: pointer;
}
</style>
