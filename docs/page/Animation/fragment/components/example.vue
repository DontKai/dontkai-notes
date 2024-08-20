<!--
 * @file:
 * @author: DontK
 * @LastEditTime: 2024-08-20 14:46:08
-->
<template>
    <KDemoCard>
        <div class="list">
            <div class="list-left">
                <BaseFragment v-model:visible="showFragment" :url="img_1" :direction="direction" />
            </div>
            <div class="list-right">
                <el-button type="primary" @click="setDirection('top-bottom')"> 效果1-从上到下 </el-button>
                <el-button type="primary" @click="setDirection('bottom-top')"> 效果1-从下到上 </el-button>
                <el-button type="primary" @click="setDirection('left-right')"> 效果2-从左到右 </el-button>
                <el-button type="primary" @click="setDirection('right-left')"> 效果2-从右到左 </el-button>
                <el-button type="primary" @click="setDirection('random')"> 效果3-随机 </el-button>
                <el-button type="primary" @click="setDirection('left-top-right-bottom-corner')">
                    效果4-从左上角到右下角
                </el-button>
                <el-button type="primary" @click="setDirection('left-bottom-right-top-corner')">
                    效果4-从左下角到右上角
                </el-button>
                <el-button type="primary" @click="setDirection('right-top-left-bottom-corner')">
                    效果4-从右上角到左下角
                </el-button>
                <el-button type="primary" @click="setDirection('right-bottom-left-top-corner')">
                    效果4-从右下角到左上角
                </el-button>
                <el-button type="primary" @click="setDirection('center-around')"> 效果5-中心向四周扩散 </el-button>
                <el-button type="primary" @click="setDirection('around-center')"> 效果6-四周向中心聚合 </el-button>
            </div>
        </div>
    </KDemoCard>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import BaseFragment from '../../components/baseFragment.vue'
import img_1 from '../../assets/999.png'

const direction = ref<
    | 'top-bottom'
    | 'bottom-top'
    | 'left-right'
    | 'right-left'
    | 'left-top-right-bottom-corner'
    | 'left-bottom-right-top-corner'
    | 'right-top-left-bottom-corner'
    | 'right-bottom-left-top-corner'
    | 'random'
    | 'center-around'
    | 'around-center'
>('right-left')
const showFragment = ref<boolean>(true)
const setDirection = (
    dir:
        | 'top-bottom'
        | 'bottom-top'
        | 'left-right'
        | 'right-left'
        | 'random'
        | 'left-top-right-bottom-corner'
        | 'left-bottom-right-top-corner'
        | 'right-top-left-bottom-corner'
        | 'right-bottom-left-top-corner'
        | 'center-around'
        | 'around-center'
) => {
    direction.value = dir
    showFragment.value = false
    setTimeout(() => {
        showFragment.value = true
    }, 0)
}
</script>
<style lang="less" scoped>
.list {
    display: flex;
    gap: 10px;
    .list-right {
        width: 200px;
        background-color: gray;
        gap: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px;
        .el-button {
            width: 100%;
            margin: 0;
        }
    }
}
</style>
