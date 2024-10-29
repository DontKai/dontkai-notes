<!--
 * @file:
 * @author: DontK
 * @LastEditTime: 2024-10-29 14:27:34
-->
<template>
    <KDemoCard>
        <div class="demo-container">
            <BaseVirtualList :data="exampleList" itemContainer=".item" :item-height="94" :show-size="20">
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
        </div>
    </KDemoCard>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseVirtualList from '../../../../components/BaseVirtualList/index.vue'
import OverflowTooltip from '../../../../components/OverflowTooltip/index.vue'

const { exampleList, getExampleList } = useExample()
function useExample() {
    const exampleList = ref<any>([])

    const getExampleList = () => {
        for (let i = 0; i < 30; i++) {
            exampleList.value.push({
                title: `${i}-经济运行规模的宏观经济指标，其在政治、经济、外交`,
                content: `${i}-国内生产总值，是国际上通行的用于衡量一个国家（或地区）经济运行规模的宏观经济指标，其在政治、经济、外交、研究等领域具有广泛应用。`
            })
        }
    }

    return {
        exampleList,
        getExampleList
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
}
</style>
