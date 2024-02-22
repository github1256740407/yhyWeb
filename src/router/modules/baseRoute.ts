import { RouteRecordRaw } from "vue-router";

/**
 * @description: 静态路由
 */
const baseRoute: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    name: "layout",
    path: "/layout",
    component: () => import("@/layout/BaseView.vue"),
    children: [
      {
        name: "home",
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "叶花弈的小窝-首页",
        },
      },
    ],
  },
];

export default baseRoute;
