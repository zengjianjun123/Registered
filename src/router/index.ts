import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  //路由的模式设置
  history: createWebHistory(), //createWebHashHistory()
  //管理路由
  routes: [
    {
      path: "/home",
      component: () => import("@/pages/home/index.vue"),
      meta: {
        title: "首页",
      },
    },
    {
      path: "/segmodel",
      component: () => import("@/pages/ai/seg.vue"),
      meta: {
        title: "视网膜分割",
      },
    },
    {
      path: "/fileupload",
      component: () => import("@/pages/ai/largeUpload.vue"),
      meta: {
        title: "视频上传",
      },
    },
    {
      path: "/ai",
      component: () => import("@/pages/ai/index.vue"),
      meta: {
        title: "ChatGPT",
      },
    },
    {
      path: "/hospital",
      component: () => import("@/pages/hospital/index.vue"),
      children: [
        {
          path: "register",
          component: () => import("@/pages/hospital/register/Register.vue"),
          meta: {
            title: "预约挂号",
          },
        },
        {
          path: "register_detail",
          component: () =>
            import("@/pages/hospital/register/Register_detail.vue"),
          meta: {
            title: "预约第一步",
          },
        },
        {
          path: "register_record",
          component: () =>
            import("@/pages/hospital/register/Register_record.vue"),
          meta: {
            title: "预约第二步",
          },
        },
        {
          path: "detail",
          component: () => import("@/pages/hospital/Detail.vue"),
          meta: {
            title: "医院详情",
          },
        },
        {
          path: "notice",
          component: () => import("@/pages/hospital/Notice.vue"),
          meta: {
            title: "预约通知",
          },
        },
        {
          path: "close",
          component: () => import("@/pages/hospital/Close.vue"),
          meta: {
            title: "停诊信息",
          },
        },
        {
          path: "search",
          component: () => import("@/pages/hospital/Search.vue"),
          meta: {
            title: "查询",
          },
        },
      ],
    },
    {
      path: "/wxlogin",
      component: () => import("@/pages/wxlogin/index.vue"),
    },
    {
      path: "/user",
      component: () => import("@/pages/user/index.vue"),
      children: [
        {
          path: "certification",
          component: () => import("@/pages/user/certification.vue"),
          meta: {
            title: "实名认证",
          },
        },
        {
          path: "order",
          component: () => import("@/pages/user/order.vue"),
          meta: {
            title: "挂号订单",
          },
        },
        {
          path: "patient",
          component: () => import("@/pages/user/patient.vue"),
          meta: {
            title: "就诊人管理",
          },
        },
        {
          path: "profile",
          component: () => import("@/pages/user/profile.vue"),
          meta: {
            title: "账号信息",
          },
        },
        {
          path: "comment",
          component: () => import("@/pages/user/comment.vue"),
          meta: {
            title: "信息反馈",
          },
        },
      ],
    },
    {
      path: "/",
      redirect: "/home",
    },
  ],
  // 控制路由切换时滚动条行为
  // scrollBehavior() {
  //   return {
  //     left: 0,
  //     top: 0,
  //   };
  // },
});
