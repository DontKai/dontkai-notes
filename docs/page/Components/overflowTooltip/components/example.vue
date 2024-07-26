<!--
 * @file:
 * @author: DontK
 * @LastEditTime: 2024-07-26 16:20:11
-->
<template>
    <KDemoCard>
        <div style="width: 250px">
            <OverflowTooltip content="div宽度为250px，内容超出隐藏显示...，鼠标悬浮显示全部文字内容" />
        </div>
        <br />
        <div style="width: 250px">
            <OverflowTooltip content="div宽度为250px，内容未超出" />
        </div>
    </KDemoCard>
</template>
<script setup lang="ts">
import OverflowTooltip from '../../../../components/OverflowTooltip/index.vue'
</script>
<style lang="less" scoped></style>
