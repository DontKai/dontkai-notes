<!--
 * @file:
 * @author: DontK
 * @LastEditTime: 2024-08-06 15:27:57
-->
<template>
    <KDemoCard>
        <KTestButton text="搜索列表" @call="searchDataList" />
        <div class="infinite" v-loading="!dataList.length && tableLoading">
            <ScrollInfinite
                ref="scrollInfiniteRef"
                v-model:list="dataList"
                v-model:params="searchForm"
                @onLoad="getDataList"
            >
                <div class="scroll-inner">
                    <div class="scroll-inner-item" v-for="(data, index) in dataList" :key="data">
                        {{ `${index + 1}:${data}` }}
                    </div>
                </div>
            </ScrollInfinite>
        </div>
    </KDemoCard>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ScrollInfinite from '../../../../components/ScrollInfinite/index.vue'
import useRequest from '../../../../hooks/useRequest'

const testReq = (data: any) => {
    console.log('data: ', data)
    return new Promise((resolve, reject) => {
        const list: any = []
        for (let i = 0; i < 10; i += 1) {
            list.push(Math.random() * 10000)
        }
        setTimeout(() => {
            if (data.pageNum === 3) {
                resolve({
                    code: '200',
                    data: {
                        list: []
                    }
                })
            } else {
                resolve({
                    code: '200',
                    data: {
                        list
                    }
                })
            }
        }, 1000)
    })
}
const [tableLoading, tableReq] = useRequest(testReq)
const searchForm = ref<any>({
    pageNum: 1,
    pageSize: 10
})
const scrollInfiniteRef = ref<any>()
const dataList = ref<any[]>([])

// 获取列表
const getDataList = async (isInit: boolean = false) => {
    scrollInfiniteRef.value!.getDataList(tableReq, isInit)
}

// 搜索列表
const searchDataList = () => {
    getDataList(true)
}

onMounted(() => {
    getDataList(true)
})
</script>
<style lang="less" scoped>
.infinite {
    height: 400px;
    overflow: hidden;
    .scroll-inner {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .scroll-inner-item {
            height: 50px;
            line-height: 50px;
            padding: 0 10px;
            background-color: rgba(255, 255, 255, 0.3);
        }
    }
}
</style>
