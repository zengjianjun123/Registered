<template>
  <div class="hospital">
    <div class="left">
      <div class="top">
        <svg t="1721450393859" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="12964" width="22" height="22">
          <path
            d="M512.796029 970.586145c-44.734264 0-86.786326-17.419924-118.419681-49.050083l-289.760894-289.760894c-65.296744-65.296744-65.296744-171.542618 0-236.836165L394.376348 105.178109c31.630158-31.633355 73.685417-49.050083 118.419681-49.050083s86.789523 17.419924 118.419681 49.050083l289.760894 289.760894c65.296744 65.296744 65.296744 171.542618 0 236.836165l-289.760894 289.760894c-31.630158 31.626961-73.685417 49.050083-118.419681 49.050083z m0-869.704674c-32.777846 0-63.592794 12.765234-86.770341 35.942781l-289.760895 289.760894c-47.84485 47.84485-47.84485 125.695832 0 173.543879l289.760895 289.760894c23.177547 23.177547 53.992495 35.94278 86.770341 35.942781s63.595991-12.765234 86.773538-35.942781l289.760894-289.760894c47.84485-47.84485 47.84485-125.695832 0-173.543879l-289.760894-289.760894c-23.177547-23.177547-53.995692-35.94278-86.773538-35.942781z"
            fill="#2c2c2c" p-id="12965"></path>
          <path
            d="M590.752509 778.231688h-151.654685a22.378321 22.378321 0 0 1-22.378321-22.378321v-137.898411H278.821092a22.378321 22.378321 0 0 1-22.378321-22.378321V443.921951a22.378321 22.378321 0 0 1 22.378321-22.378321h137.901608V283.645219a22.378321 22.378321 0 0 1 22.378321-22.378321h151.654684a22.378321 22.378321 0 0 1 22.378321 22.378321v137.898411h137.901608a22.378321 22.378321 0 0 1 22.378321 22.378321v151.654684a22.378321 22.378321 0 0 1-22.378321 22.378321H613.134026v137.898411a22.381518 22.381518 0 0 1-22.381517 22.378321z m-129.273167-44.756642h106.898042v-137.898411a22.378321 22.378321 0 0 1 22.378321-22.378321h137.901608V466.300272H590.755705a22.378321 22.378321 0 0 1-22.378321-22.378321V306.02354h-106.898042v137.898411a22.378321 22.378321 0 0 1-22.378321 22.378321H301.199413v106.898042h137.901608a22.378321 22.378321 0 0 1 22.378321 22.378321v137.898411z"
            fill="#2c2c2c" p-id="12966"></path>
        </svg>
        <span>医院信息</span>
      </div>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
        <el-menu-item index="/hospital/register" @click="changeMenu('/hospital/register')">
          <el-icon><icon-menu /></el-icon>
          <span class="context">预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/hospital/detail" @click="changeMenu('/hospital/detail')">
          <el-icon>
            <document />
          </el-icon>
          <span class="context">医院详情</span>
        </el-menu-item>
        <el-menu-item index="/hospital/notice" @click="changeMenu('/hospital/notice')">
          <el-icon>
            <Bell />
          </el-icon>
          <span class="context">预约通知</span>
        </el-menu-item>
        <el-menu-item index="/hospital/close" @click="changeMenu('/hospital/close')">
          <el-icon>
            <Warning />
          </el-icon>
          <span class="context">停诊信息</span>
        </el-menu-item>
        <el-menu-item index="/hospital/search" @click="changeMenu('/hospital/search')">
          <el-icon>
            <Search />
          </el-icon>
          <span class="context">查询/取消</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <!-- 路由展示区 -->
      <router-view></router-view>
    </div>
  </div>
</template> class=""
<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Bell,
  Warning,
  Search,
} from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import useDetailStore from '@/store/modules/hospitalDetail'
//获取仓库对象
let detailStore = useDetailStore()


let $router = useRouter()
let $route = useRoute()

onMounted(() => {
  //组件挂载完毕,通知pinia仓库
  detailStore.getHospital($route.query.hoscode)
  //获取医院科室详情的数据
  detailStore.getHospitalDepartment($route.query.hoscode)

})
const changeMenu = (path: string) => {
  $router.push({ path, query: { hoscode: $route.query.hoscode } })
}
//获取当前路由信息
</script>

<style scoped>
.context {
  font-size: 18px;
}

.hospital {
  width: 80%;
  margin: 0 auto;
  /* background-color: aqua; */
  display: flex;
}

.left {
  width: 200px;
}

.right {
  flex: 1;
}

.top {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 22px;
  margin-bottom: 16px;
}
</style>
