/**
 * @description: 指令: v-checkButtonAuth
 * @param {string[]|string}
 * @todo 按钮权限控制, 如果登录的账号没有对应的按钮权限,页面将不会展示这些按钮
 * @example
 *  <el-button v-checkButtonAuth="code">新增</el-button>
 */
import getUserStore from "@/store/modules/userStore";
import type { Directive, DirectiveBinding } from "vue";

const checkButtonAuth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    // 获取该账号下,获取到的按钮权限
    const userStore = getUserStore();
    // 如果value传入数组,则判断传入的值,该账号是否全部拥有
    if (value instanceof Array && value.length) {
      const hasAllPermission = value.every((item) => userStore.authButtons.includes(item));
      if (!hasAllPermission) el.remove();
    } else if (!userStore.authButtons.includes(value)) {
      el.remove();
    }
  },
};

export default checkButtonAuth;
