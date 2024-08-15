<template>
    <KDemoCard>
        <KTestButton @call="testClick" />
        <div>loading: {{ testLoading }}</div>
        <div>data: {{ data }}</div>
    </KDemoCard>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import useRequest from '../../../../hooks/web/useRequest'

const testReq = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                code: '200',
                data: 'Hello World'
            })
        }, 1000)
    })
}
const [testLoading, testRequest] = useRequest(testReq)
const data = ref({})

const testClick = async () => {
    if (data.value) {
        data.value = {}
    }
    const res = await testRequest()
    data.value = res
}
</script>
<style lang="less" scoped></style>
