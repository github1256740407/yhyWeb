import { createRouter, createWebHistory } from "vue-router";
import NProgress from "@/utils/nprogress";

// 路由文件
import baseRoute from "@/router/modules/baseRoute";
import errorRoute from "@/router/modules/errorRoute";

const router = createRouter({
  routes: [...baseRoute, ...errorRoute],
  history: createWebHistory(),
});

const { VITE_PROJECT_TITLE } = import.meta.env;

// 路由前置拦截守卫(开始)
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = to.meta.title ?? VITE_PROJECT_TITLE;
  next()
});

// 路由后置拦截守卫(结束)
router.afterEach(() => {
  NProgress.done();
});

// 路由跳转错误
router.onError((error) => {
  NProgress.done();
  console.warn("路由跳转发生错误", error.message);
});

export default router;
