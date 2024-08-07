<!--
 * @file:
 * @author: DontK
 * @LastEditTime: 2024-08-07 11:40:11
-->
<template>
    <KDemoCard>
        <div class="list">
            <div class="list-left">111</div>
            <div class="list-right">
                <el-button type="primary">效果1-从上到下</el-button>
                <el-button type="primary">效果2-从左到右</el-button>
                <el-button type="primary">效果3-随机</el-button>
                <el-button type="primary">效果4-从左下角到右下角</el-button>
                <el-button type="primary">效果5-中心向四周扩散</el-button>
                <el-button type="primary">效果6-四周向中心聚合</el-button>
            </div>
        </div>
    </KDemoCard>
</template>
<script setup lang="ts">
const height = '300px'
</script>
<style lang="less" scoped>
.list {
    display: flex;
    gap: 10px;
    .list-left {
        width: 200px;
        height: v-bind(height);
    }
    .list-right {
        height: v-bind(height);
        width: 200px;
        background-color: gray;
        gap: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        .el-button {
            width: 100%;
            margin: 0;
        }
    }
}
</style>
