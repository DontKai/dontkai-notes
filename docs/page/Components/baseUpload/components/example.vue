<!--
 * @file:
 * @author: DontK
 * @LastEditTime: 2024-07-26 14:18:06
-->
<template>
    <KDemoCard>
        <div>
            <div>
                多选，多选时单次文件上传数量限制：2个，不限制文件总数，单个文件大小限制：3MB，文件类型限制：.png,.jpg,.jpeg
            </div>
            <BaseUpload
                class="btn-upload-plus"
                accept=".png,.jpg,.jpeg"
                multiple
                :single-limit="2"
                :file-size-limit="3"
                @import-file="importFile"
            >
                <KTestButton text="点击上传" @call="isShow = true" />
            </BaseUpload>
            <div>已上传文件：{{ filesOne.map((file: any) => file.name).join(',') }}</div>
        </div>
        <br />
        <div>
            <div>
                多选，单次文件上传数量限制：2个，文件总数限制为：5个，单个文件大小限制：1MB，文件类型限制：.xls,.xlsx
            </div>
            <BaseUpload
                class="btn-upload-plus"
                accept=".xls,.xlsx"
                multiple
                :total="filesTwo.length"
                :total-limit="5"
                :single-limit="2"
                :file-size-limit="1"
                @import-file="importFileTwo"
            >
                <KTestButton text="点击上传" @call="isShow = true" />
            </BaseUpload>
            <div>已上传文件：{{ filesTwo.map((file: any) => file.name).join(',') }}</div>
        </div>
        <br />
        <div>
            <div>单选，文件总数限制为：1个，不替换文件</div>
            <BaseUpload
                class="btn-upload-plus"
                :total="filesThree.length"
                :total-limit="1"
                @import-file="importFileThree"
            >
                <KTestButton text="点击上传" @call="isShow = true" />
            </BaseUpload>
            <div>已上传文件：{{ filesThree.map((file: any) => file.name).join(',') }}</div>
        </div>
        <br />
        <div>
            <div>单选，文件总数限制为：1个，替换文件</div>
            <BaseUpload
                class="btn-upload-plus"
                :total="filesFour.length"
                :total-limit="1"
                replace
                @import-file="importFileFour"
            >
                <KTestButton text="点击上传" @call="isShow = true" />
            </BaseUpload>
            <div>已上传文件：{{ filesFour.map((file: any) => file.name).join(',') }}</div>
        </div>
    </KDemoCard>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import BaseUpload from '../../../../components/BaseUpload/index.vue'

const filesOne = ref<File[]>([])
const filesTwo = ref<File[]>([])
const filesThree = ref<File[]>([])
const filesFour = ref<File[]>([])
const importFile = (files: File[]) => {
    filesOne.value = [...filesOne.value, ...files]
}

const importFileTwo = (files: File[]) => {
    filesTwo.value = [...filesTwo.value, ...files]
}

const importFileThree = (files: File[]) => {
    filesThree.value = [...filesThree.value, ...files]
}

const importFileFour = (files: File[]) => {
    filesFour.value = [...files]
}
</script>
<style lang="less" scoped></style>
