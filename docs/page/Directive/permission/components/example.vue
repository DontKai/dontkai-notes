<template>
    <KDemoCard>
        <div class="button-list">
            <KTestButton text="角色1按钮" @call="testClick(1)" />
            <KTestButton text="角色2按钮" @call="testClick(2)" />
            <KTestButton text="角色3按钮" @call="testClick(3)" />
        </div>
        <div>角色按钮权限：{{ usePermission.buttonList }}</div>
        <div style="margin-top: 10px">
            按钮显示权限：
            <el-button v-permission="['test:add']">新增</el-button>
            <el-button v-permission="['test:edit']">编辑</el-button>
        </div>
    </KDemoCard>
</template>
<script setup lang="ts">
import usePermissionStore from '../../../../store/modules/usePermissionStore'

const usePermission = usePermissionStore()

const testClick = (type: number) => {
    if (type === 1) {
        usePermission.buttonList = ['test:add', 'test:edit']
    } else if (type === 2) {
        usePermission.buttonList = ['test:add']
    } else if (type === 3) {
        usePermission.buttonList = ['test:edit']
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
