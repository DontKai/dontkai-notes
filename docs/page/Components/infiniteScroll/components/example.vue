<!--
 * @file:
 * @author: DontK
 * @LastEditTime: 2024-07-26 15:48:43
-->
<template>
    <KDemoCard>
        <KTestButton text="搜索列表" @call="searchDataList" />
        <div class="infinite">
            <InfiniteScroll
                ref="infiniteScrollRef"
                v-model:list="dataList"
                v-model:pageNum="searchForm.pageNum"
                :pageSize="searchForm.pageSize"
                @onLoad="getDataList"
            >
                <div class="scroll-inner">
                    <div class="scroll-inner-item" v-for="(data, index) in dataList" :key="data">
                        {{ `${index + 1}:${data}` }}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    </KDemoCard>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import InfiniteScroll from '../../../../components/InfiniteScroll/index.vue'

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
const searchForm = ref<any>({
    pageNum: 1,
    pageSize: 10,
    searchContent: ''
})
const infiniteScrollRef = ref<any>()
const dataList = ref<any[]>([])

// 获取列表
const getDataList = async (isInit: boolean = false) => {
    infiniteScrollRef.value!.getDataList(testReq, searchForm.value, isInit)
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
