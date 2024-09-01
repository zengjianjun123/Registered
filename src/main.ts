import { createApp } from "vue";
import App from "./App.vue";
import Navigate from "@/components/Navigate.vue";
import Footer from "@/components/Footer.vue";
import Login from "@/components/Login.vue";
import "@/style/iconfont.css";
//引入router
import router from "@/router";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn"; //组件国际化
//引入pinia仓库
import pinia from "@/store";
//引入路由鉴权的文件
import "./permisstion";

const app = createApp(App);

app.component("Navigate", Navigate);
app.component("Footer", Footer);
app.component("Login", Login);
//安装router
app.use(router);
//安装pinia
app.use(pinia);
app.use(ElementPlus, {
  locale: zhCn,
});
app.mount("#app");
