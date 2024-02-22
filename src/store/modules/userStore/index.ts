import { defineStore } from "pinia";
import { signInRequest, signOutRequest } from "@/api/modules/login";
import { authRoutesRequest, authButtonsRequest } from "@/api/modules/base";
const modules = import.meta.glob("@/views/**/*.vue");

/**
 * @description: pinia: 用户信息
 * @example
 *  {身份凭证, 用户名, 权限路由, 权限按钮}
 */
const getUserStore = defineStore("userStore", {
  state: () => ({
    token: localStorage.getItem("token"),
    userName: localStorage.getItem("userName"),
    authRoutes: [] as any[],
    authButtons: [] as any[],
  }),
  getters: {
    // 1.[初始化]菜单路由表
    menuRouteData: (state) => initMenuRoutes(state.authRoutes),
    // 2.[扁平化+组件路径]动态添加路由表,避免深层页面因前页面无router-view而不展示
    dynamicRouteData: (state) => initDynamicRoutes(state.authRoutes),
    // 3.[初始化]面包屑,因路由扁平化丢失层级,需手动处理面包屑层级数据
    breadData: (state) => initBreads(state.authRoutes),
  },
  actions: {
    // 登录
    async signIn(params: { username: any; password: any }) {
      const { data } = await signInRequest(params);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.userName);
      this.token = data.token;
      this.userName = data.userName;
    },
    // 退出登录
    async signOut() {
      await signOutRequest();
      localStorage.clear();
      this.token = null;
      this.userName = null;
      this.authRoutes = [];
      this.authButtons = [];
    },
    // 获取当前账号的路由表
    async getAuthRoutes() {
      const { data } = await authRoutesRequest();
      this.authRoutes = data;
    },
    // 获取当前账号的按钮权限
    async getAuthButtons() {
      const { data } = await authButtonsRequest();
      this.authButtons = data;
    },
  },
});

/**
 * @description: 初始化菜单路由
 * @param {Array<any>} authRoutes 路由表
 */
const initMenuRoutes = (authRoutes: Array<any>) => {
  let result = authRoutes.map((item) => {
    return item;
  });
  return result;
};

/**
 * @description: 初始化动态路由
 * @param {Array<any>} authRoutes 路由表
 */
const initDynamicRoutes = (authRoutes: Array<any>) => {
  const routerAry = JSON.parse(JSON.stringify(authRoutes));
  const result = routerAry.reduce((pre: any, next: any) => {
    if (next.component) {
      next.component = modules["/src/views" + next.component];
    }
    pre = [...pre, next];
    if (next.children) {
      pre = [...pre, ...initDynamicRoutes(next.children)];
      delete next.children;
    }
    return pre;
  }, []);
  return result;
};

/**
 * @description: 初始化面包屑
 *
 */
const initBreads = (authRoutes: Array<any>, result: { [key: string]: any } = {}, preInfo = []) => {
  for (let item of authRoutes) {
    result[item.path] = [...preInfo, item];
    // 如果有children,则往下收集
    if (item.children) {
      initBreads(item.children, result, result[item.path]);
    }
  }
  return result;
};

export default getUserStore;
