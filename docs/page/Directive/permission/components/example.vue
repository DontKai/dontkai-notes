<!--
<template>
    <KDemoCard>
        <div class="button-list">
            <KTestButton text="角色1按钮" @call="testClick(1)" />
            <KTestButton text="角色2按钮" @call="testClick(2)" />
            <KTestButton text="角色3按钮" @call="testClick(3)" />
        </div>
        <div>角色按钮权限：{{ getStorage('buttonList') }}</div>
        <div style="margin-top: 10px">
            按钮显示权限：
            <el-button v-permission="['test:add']">新增</el-button>
            <el-button v-permission="['test:edit']">编辑</el-button>
        </div>
    </KDemoCard>
</template>
<script setup lang="ts">
import useStorage from '../../../../hooks/useStorage.ts'

const { setStorage, getStorage } = useStorage()
const testClick = (type: number) => {
    if (type === 1) {
        setStorage('buttonList', ['test:add', 'test:edit'])
    } else if (type === 2) {
        setStorage('buttonList', ['test:add'])
    } else if (type === 3) {
        setStorage('buttonList', ['test:edit'])
    }
    window.location.reload()
}
</script>
<style lang="less" scoped>
.button-list {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>
-->
