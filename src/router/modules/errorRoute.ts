import { RouteRecordRaw } from "vue-router";

/**
 * @description: 错误路由
 */
const errorRoute: RouteRecordRaw[] = [
  {
    // 无权限
    path: "/403",
    name: "403",
    component: () => import("@/layout/403.vue"),
    meta: {
      title: "403页面",
    },
  },
  {
    // 网络错误
    path: "/500",
    name: "500",
    component: () => import("@/layout/500.vue"),
    meta: {
      title: "500页面",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/layout/404.vue"),
    meta: {
      title: "404页面",
    },
  },
];

export default errorRoute;
