//对axios进行二次封装
//目的:利用请求、响应拦截器的功能
//引入用户相关的仓库
import useUserStore from "@/store/modules/user";
import axios from "axios";
import { ElMessage } from "element-plus";
const request = axios.create({
  baseURL: "/api", //请求路径配置
  timeout: 5000,
});
//请求拦截器
request.interceptors.request.use((config) => {
  //获取用户仓库，拿到token
  let userStore = useUserStore();
  if (userStore.userInfo.token) {
    config.headers.token = userStore.userInfo.token;
  }
  return config;
});
//响应拦截器
request.interceptors.response.use(
  (response) => {
    // 响应拦截器成功地回调，一般会进行简化
    return response.data;
  },
  (error) => {
    // 处理http网络错误
    let status = error.response.status;
    switch (status) {
      case 404:
        // 错误提示信息
        ElMessage({
          type: "error",
          //   message: error.message,
          message: "请求失败,路径出现问题",
        });
        break;
      case 401:
        // 错误提示信息
        ElMessage({
          type: "error",
          //   message: error.message,
          message: "参数有误",
        });
        break;
      case 500 | 501 | 502 | 503 | 504 | 505:
        // 错误提示信息
        ElMessage({
          type: "error",
          //   message: error.message,
          message: "服务器挂了",
        });
        break;
    }
    return Promise.reject(new Error(error.message));
  }
);

export default request;
