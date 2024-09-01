<!-- 挂号订单 -->
<template>
    <div class="">
        <!--有订单id  展示订单详情-->
        <div v-if="$route.query.orderId">
            <OrderDetail />
        </div>
        <!-- 无订单id    展示所有订单-->
        <div v-else>
            <AllOrder />
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import AllOrder from '@/components/AllOrder.vue';
import OrderDetail from '@/components/OrderDetail.vue';
let $route = useRoute()
</script>
<style scoped></style>
