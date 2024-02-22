import { defineStore } from "pinia";
import piniaPersistConfig from "@/store/piniaPresist";

// 日间/夜间主题样式
const themeStyleConfig = {
  // 面包屑
  "--breadCrumb-background-color": {
    light: "#ffffff",
    dark: "#1e1e20",
  },
  // 页面盒子
  "--viewBox-background-color": {
    light: "#eff0f2",
    dark: "#000000",
  },
  // 页面内容
  "--view-background-color": {
    light: "#ffffff",
    dark: "#1e1e20",
  },
};

/**
 * @description: pinia: 项目主题样式配置信息
 */
const getSettingStore = defineStore("themeStore", {
  state: () => ({
    themeName: "light", // 主题名称
    menuCollapse: false, // 侧边栏收缩
  }),
  actions: {
    /**
     * @description: 设置主题
     * @param {light|dark} theme
     */
    setTheme(theme: string) {
      this.themeName = theme;
      console.log(`%c>>> 样式切换,当前主题:[${this.themeName}]`, "background: black; color: #fff; padding: 4px");
      // 切换样式
      // Object.keys(themeStyleConfig).forEach((key) => {
      //   document.body.style.setProperty(
      //     key,
      //     themeStyleConfig[key][this.themeName]
      //   );
      // });
    },
    /**
     * @description: 设置侧边栏是否收缩
     */
    setMenuCollapse(open: boolean) {
      this.menuCollapse = open;
    },
  },
  persist: piniaPersistConfig("getSettingStore"),
});

export default getSettingStore;
