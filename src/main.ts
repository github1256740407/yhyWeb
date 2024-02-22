import { createApp } from "vue";
import App from "./App.vue";
import pinia from "@/store";
import router from "@/router";
import * as Icons from "@element-plus/icons-vue"; // 导入图标
import directives from "@/directives";
const app = createApp(App);

// 全局注册element Icons组件
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

// 全局注册自定义指令
directives.install(app)

app.use(pinia);
app.use(router);
app.mount("#app");
