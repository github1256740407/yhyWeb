// vite创建Vue3项目自带引入
import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 额外引入
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  /*
    根据配置的项目启动命令后的mode决定使用env + env.dev||fat||prod文件内的配置变量
    process.cwd() 返回当前脚本文件的运行目录
  */
  const envConfig = loadEnv(mode, process.cwd());
  return {
    // 插件配置
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ["vue", "vue-router", "pinia"], // 自动导入相关函数
        dts: "src/auto-import.d.ts", // 生成 `auto-import.d.ts` 全局声明
        eslintrc: {
          // 已存在文件设置默认 false，需要更新时再打开，防止每次更新都重新生成
          enabled: true,
          // 生成文件地址和名称
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true,
        },
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    // 路径别名配置
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "./src"), //配置根路径@ 代表 src
        },
      ],
    },
    // 服务构建
    server: {
      open: JSON.parse(envConfig.VITE_OPEN),
      host: envConfig.VITE_HOST,
      port: Number(envConfig.VITE_PORT),
      cors: true,
      // 前端跨域代理配置
      proxy: {
        "/api": {
          // target: "http://10.142.25.100:39999/wechat/api/v1", // 局域网开发
          target: "http://123.60.62.151:39999/wechat/api/v1", // 线上服务器
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
