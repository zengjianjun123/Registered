<template>
    <div class="content">
        <div class="top">
            <div class="h">医院等级</div>
            <ul>
                <li :class="{ active: activeLevelFlag == '' }" @click="changeLevel('')"> 全部 </li>
                <li v-for=" item in levelArr" :key="item.value" :class="{ active: activeLevelFlag == item.value }"
                    @click="changeLevel(item.value)">{{ item.name }}</li>
            </ul>
        </div>
        <div class="top">
            <div class="h">所在地区</div>
            <ul>
                <li :class="{ active: activeRegionFlag == '' }" @click="changeRegion('')">全部</li>
                <li v-for="item in regionArr" :key="item.value" :class="{ active: activeRegionFlag == item.value }"
                    @click="changeRegion(item.value)">{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reqHospitalLevelOrRegin } from '@/api/home'
import { onMounted, ref } from 'vue';
import type { HospitalLevelOrReginResponseData } from '@/api/home/type'

onMounted(() => {
    getLevel()
    getRegion()
})
let $emit = defineEmits(['getLF', 'getRF'])
//
let activeLevelFlag = ref<string>('')
let activeRegionFlag = ref<string>('')

//存放等级
let levelArr = ref<any>([])
//存放地区
let regionArr = ref<any>([])
//点击等级回调
const changeLevel = (level: string) => {
    activeLevelFlag.value = level
    $emit('getLF', level)
}
//点击地区回调
const changeRegion = (level: string) => {
    activeRegionFlag.value = level
    $emit('getRF', level)
}

//获取医院等级
const getLevel = async () => {
    let res: HospitalLevelOrReginResponseData = await reqHospitalLevelOrRegin('HosType')
    if (res.code === 200) {
        levelArr.value = res.data;
    }
}
//获得医院地区
const getRegion = async () => {
    let res: HospitalLevelOrReginResponseData = await reqHospitalLevelOrRegin('Beijing')
    if (res.code === 200) {
        regionArr.value = res.data;
    }
}
</script>
<style scoped>
.content {
    padding-top: 60px;
    /* margin-bottom: -20px; */
}

.top {
    color: #7f7f7f;
    font-size: 18px;
    display: flex;
    gap: 5px;
    margin-bottom: 20px;
    align-items: flex-start;
}

.h {
    font-weight: 700;
    width: 80px;
    flex-shrink: 0;
}

.active {
    color: #50aeb1;
}

ul {
    list-style-type: none;
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
}

li:hover {
    color: #50aeb1;
    cursor: pointer;
}

li {
    width: 80px;
    text-align: center;
}
</style>
