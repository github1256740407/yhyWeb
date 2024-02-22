/*
    [指令]:v-copy
    [参数]:string || Ref<string> || Reactive<string>
    [作用]:复制值到剪贴版
    [使用示例]:
              <span
                v-copy="message"
              >{{message}}</span>
*/
import type { Directive, DirectiveBinding } from "vue";
import { ElMessage } from "element-plus";
interface ElType extends HTMLElement {
  __handleClick__: any;
  copyValue: string | number;
}
function handleCopy(this: any) {
  const { copyValue } = this;
  /*
      *新写法(推荐):navigator(浏览器全局对象)
      理由:简洁,但是需要注意,只有在localhost和https的环境下,才能拿到navigator.clipboard
  */
  /* 
      老写法(不推荐):document.execCommand("Copy")
      理由:部分浏览器正在废弃掉document.execCommand
  */
  if (navigator.clipboard) {
    navigator.clipboard.writeText(copyValue).then(() => {});
  } else {
    const input = document.createElement("input");
    input.value = copyValue.toLocaleString();
    document.body.appendChild(input);
    input.select();
    document.execCommand("Copy");
    document.body.removeChild(input);
  }
  ElMessage.success("复制成功");
}
const copy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    const { value } = binding;
    el.__handleClick__ = handleCopy;
    el.copyValue = value;
    el.addEventListener("click", el.__handleClick__);
  },
  updated(el: ElType, binding: DirectiveBinding) {
    const { value } = binding;
    el.copyValue = value;
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener("click", el.__handleClick__);
  },
};

export default copy;
