<template>
    <div class="container">
        <h2>{{ detaileStore.hospitalInfo.hospital?.hosname || '人民医院' }}停诊信息</h2>
        <el-empty description="目前没有停诊信息" />
    </div>
</template>
<script setup lang="ts">
import useDetailStore from '@/store/modules/hospitalDetail';
let detaileStore = useDetailStore()
</script>
<style scoped>
.container {
    margin-top: 30px;
    width: 90%;
}

h2 {
    text-align: center;
    margin-bottom: 50px;
}
</style>