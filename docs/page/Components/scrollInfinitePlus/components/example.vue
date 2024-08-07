<!--
 * @file:
 * @author: DontK
 * @LastEditTime: 2024-08-07 11:08:18
-->
<template>
    <KDemoCard>
        <div class="button-list">
            <KTestButton text="搜索列表" @call="searchDataList" />
            <KTestButton text="跳转到第3页" @call="goToPageNum(3)" />
            <KTestButton text="跳转到第2页" @call="goToPageNum(2)" />
            <KTestButton text="跳转到第1页" @call="goToPageNum(1)" />
        </div>
        <div class="infinite" v-loading="!dataList.length && tableLoading">
            <ScrollInfinitePlus
                ref="scrollInfinitePlusRef"
                v-model:list="dataList"
                v-model:params="searchForm"
                :req="tableReq"
            >
                <div class="scroll-inner">
                    <div class="scroll-inner-item" v-for="data in dataList" :key="data">
                        {{ data }}
                    </div>
                </div>
            </ScrollInfinitePlus>
        </div>
    </KDemoCard>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ScrollInfinitePlus from '../../../../components/ScrollInfinitePlus/index.vue'
import useRequest from '../../../../hooks/useRequest'

const testReq = (data: any) => {
    console.log('data: ', data)
    return new Promise((resolve, reject) => {
        const list: any = []
        if (data.pageNum === 3) {
            for (let i = 0; i < 5; i += 1) {
                list.push(`${data.pageNum}=====` + Math.random() * 10000)
            }
        } else {
            for (let i = 0; i < 10; i += 1) {
                list.push(`${data.pageNum}=====` + Math.random() * 10000)
            }
        }
        setTimeout(() => {
            if (data.pageNum === 4) {
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
const scrollInfinitePlusRef = ref<any>()
const dataList = ref<any[]>([])

// 获取列表
const getTableData = async (initType: 0 | 1 | 2 = 1, nextPage?: boolean) => {
    await scrollInfinitePlusRef.value!.getDataList(initType, nextPage)
}

// 跳转到指定页面
const goToPageNum = (num: number) => {
    scrollInfinitePlusRef.value!.setCurrentPageNum(num)
}

// 搜索列表
const searchDataList = () => {
    getTableData(1)
}

onMounted(() => {
    getTableData(1)
})
</script>
<style lang="less" scoped>
.button-list {
    display: flex;
    align-items: center;
    gap: 10px;
}
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
