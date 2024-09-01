//自己node服务器上的

import useUserStore from "@/store/modules/user";
import axios from "axios";
import { ElMessage } from "element-plus";
const request2 = axios.create({
  baseURL: "/my", //请求路径配置
  timeout: 5000,
});
//请求拦截器
request2.interceptors.request.use((config) => {
  //获取用户仓库，拿到token
  let userStore = useUserStore();
  if (userStore.userInfo.token) {
    config.headers.token = userStore.userInfo.token;
  }
  return config;
});
//响应拦截器
request2.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    //处理错误信息
    let status: any = error.response.status;
    switch (status) {
      case 404:
        ElMessage({
          type: "error",
          message: error.message,
        });
        break;
    }
    return Promise.reject(new Error(error.message));
  }
);

export default request2;
