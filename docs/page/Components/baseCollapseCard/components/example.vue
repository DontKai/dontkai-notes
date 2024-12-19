<template>
    <KDemoCard>
        <BaseCollapseCard :alwaysShowHeader="true">
            <template #title>
                <div class="title">11111</div>
            </template>
            <div class="content">22222</div>
        </BaseCollapseCard>
        <br />
        <BaseCollapseCard>
            <template #title>
                <div class="title">33333</div>
            </template>
            <div class="content">44444</div>
        </BaseCollapseCard>
        <br />
        <KTestButton text="展开/折叠" />
        <BaseCollapseCard>
            <div class="content">55555</div>
        </BaseCollapseCard>
    </KDemoCard>
</template>
<script setup lang="ts">
import BaseCollapseCard from '../../../../components/BaseCollapseCard/index.vue'
</script>
<style lang="less" scoped>
.title {
    color: red;
}
.content {
    color: blue;
}
</style>
