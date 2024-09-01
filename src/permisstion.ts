//路由鉴权
//引入路由器
import router from "./router";
//引入进度条插件
//@ts-ignore
import Nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";
import useUserStore from "@/store/modules/user";

import pinia from "@/store";

let userStore = useUserStore(pinia);
//存储 未登录可访问路由名称
let whiteList = [
  "/home",
  "/hospital/register",
  "/hospital/detail",
  "/hospital/notice",
  "/hospital/close",
  "/hospital/search",
];
//进度条的加载小圆球去掉
Nprogress.configure({ showSpinner: false });

//添加全局守卫
//前置守卫
router.beforeEach((to, from, next) => {
  //路由组件进入之前，进度条开始动
  Nprogress.start();
  //动态设置网页左上角的标题
  document.title = `眼医-${to.meta.title}`;
  //判断用户是否登录
  let token = userStore.userInfo.token;
  if (token) {
    //说明登录了
    next();
  } else {
    //未登录  只有个别路由可以访问
    if (whiteList.includes(to.path)) {
      next();
    } else {
      //弹出登录框
      userStore.visiable = true;
      //跳到首页
      next({ query: { redirect: to.fullPath } });
    }
  }
});

//后置守卫
router.afterEach((to, from) => {
  //路由组件进入之后，进度条消失
  Nprogress.done();
});
