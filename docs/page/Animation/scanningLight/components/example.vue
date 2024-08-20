<!--
 * @file:
 * @author: DontK
 * @LastEditTime: 2024-08-20 14:40:12
-->
<template>
    <KDemoCard>
        <div class="list">
            <BaseScanningLight text="Don't Kai" />
            <BaseScanningLight
                class="list-item card"
                width="300px"
                url="https://imgservices-1252317822.image.myqcloud.com/coco/b11272023/ececa9a5.7y0amw.jpg"
            />
            <BaseScanningLight
                class="list-item radius"
                width="150px"
                url="https://imgservices-1252317822.image.myqcloud.com/coco/s06292024/974ffb90.08i19r.jpg"
            />
            <BaseScanningLight
                class="list-item"
                width="150px"
                url="https://imgservices-1252317822.image.myqcloud.com/coco/s09252023/3af9e8de.00uqxe.png"
                imgMask
            />
            <BaseScanningLight
                class="list-item"
                width="300px"
                url="https://imgservices-1252317822.image.myqcloud.com/coco/s08152023/e55106cd.pg76bp.png"
                imgMask
            />
        </div>
    </KDemoCard>
</template>
<script setup lang="ts">
import BaseScanningLight from '../../components/baseScanningLight.vue'
</script>
<style lang="less" scoped>
.list {
    display: flex;
    justify-content: safe center;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    .list-item {
        flex-shrink: 0;
    }
    .card {
        border-radius: 8px;
    }
    .radius {
        border-radius: 50%;
    }
}
</style>
