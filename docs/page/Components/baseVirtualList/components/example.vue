<!--
 * @file:
 * @author: DontK
 * @LastEditTime: 2025-01-16 14:17:43
-->
<template>
    <KDemoCard>
        <div class="demo-container">
            <BaseVirtualList :data="exampleList" :item-height="94" :show-size="20" :show-scrollbar="true">
                <template #default="{ data }">
                    <div class="item">
                        <div class="item__wrapper">
                            <div class="item-title">
                                <OverflowTooltip :content="data.title || ''" :show-after="400" />
                            </div>
                            <div class="item-content">
                                <OverflowTooltip :content="data.content || ''" :show-after="400" />
                            </div>
                        </div>
                    </div>
                </template>
            </BaseVirtualList>
            <div class="btn-container">
                <el-button type="primary" @click="addExampleList">添加数据</el-button>
                <br /><br />
                <el-button type="primary" @click="changeExampleList">切换数据</el-button>
            </div>
        </div>
    </KDemoCard>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseVirtualList from '../../../../components/BaseVirtualList/index.vue'
import OverflowTooltip from '../../../../components/OverflowTooltip/index.vue'

const { exampleList, getExampleList, addExampleList, changeExampleList } = useExample()
function useExample() {
    const getRandomNumber = (min: number, max: number): number => {
        // 计算范围内的随机数
        let random = Math.random() * (max - min + 1) + min
        // 向下取整得到整数
        let randomNumber = Math.floor(random)
        // 返回随机数
        return randomNumber
    }

    const exampleList = ref<any>([])

    const getExampleList = () => {
        for (let i = 0; i < 1000; i++) {
            exampleList.value.push({
                title: `${i}-经济运行规模的宏观经济指标，其在政治、经济、外交`,
                content: `${i}-国内生产总值，是国际上通行的用于衡量一个国家（或地区）经济运行规模的宏观经济指标，其在政治、经济、外交、研究等领域具有广泛应用。`
            })
        }
    }

    const addExampleList = () => {
        const len = exampleList.value.length
        for (let i = len; i < len + 30; i++) {
            exampleList.value.push({
                title: `${i}-经济运行规模的宏观经济指标，其在政治、经济、外交`,
                content: `${i}-国内生产总值，是国际上通行的用于衡量一个国家（或地区）经济运行规模的宏观经济指标，其在政治、经济、外交、研究等领域具有广泛应用。`
            })
        }
    }

    const changeExampleList = () => {
        const arr: any[] = []
        const random = getRandomNumber(0, 100)
        for (let i = random; i < random + 30; i++) {
            arr.push({
                title: `${i}-经济运行规模的宏观经济指标，其在政治、经济、外交`,
                content: `${i}-国内生产总值，是国际上通行的用于衡量一个国家（或地区）经济运行规模的宏观经济指标，其在政治、经济、外交、研究等领域具有广泛应用。`
            })
        }
        exampleList.value = arr
    }

    return {
        exampleList,
        getExampleList,
        addExampleList,
        changeExampleList
    }
}

onMounted(() => {
    getExampleList()
})
</script>
<style lang="less" scoped>
.demo-container {
    height: 400px;
    width: 300px;
    background-color: #a8b1ff;
    position: relative;
    .item {
        height: 94px;
        padding-bottom: 24px;
        .item__wrapper {
            width: 100%;
            height: 70px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: space-between;
            padding: 10px 16px;
            background: #ffffff;
            cursor: pointer;
            overflow: hidden;
            .item-title {
                font-size: 16px;
                font-weight: bold;
                color: #718096;
            }
            .item-content {
                font-size: 14px;
                font-weight: normal;
                color: #718096;
            }
        }
    }
    .btn-container {
        position: absolute;
        right: -100px;
        top: 0px;
    }
}
</style>
