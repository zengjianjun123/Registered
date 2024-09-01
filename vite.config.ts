import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      // "@": fileURLToPath(new URL("./src", import.meta.url)), //
      "@": path.resolve(__dirname, "src"),
    },
  },
  //配置跨域
  server: {
    proxy: {
      "/api": {
        //请求前缀是 /api 走代理服务器
        target: "http://syt.atguigu.cn", //代理服务器与谁通信
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),  //到服务器端了  是否保留前缀
      },
      "/my": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/my/, ""),
      },
    },
  },
});
