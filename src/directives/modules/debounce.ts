/*
    [指令]:v-debounce
    [参数]:Object{
            event:string, // click || input
            callBack:Function,
            delay?:number // 默认值500
          }
    [作用]:防抖,高频率的触发事件,等待最后一次事件触发后的间隔一定时间无再次触发才会执行
    [常用场景]:input事件 -> 值变动,远程模糊搜索下拉数据
    [使用示例]:
              <el-input
                v-model="input"
                placeholder="Please input"
                v-debounce="{ event: 'input', callBack: handleInput }"
              />
*/
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
  __handleEvent__: any;
}
interface BindingType extends DirectiveBinding {
  value: {
    event: string;
    callBack: Function;
    delay?: number;
  };
}
function handleDebounce(callBack: Function, delay = 500) {
  let timer: NodeJS.Timeout | null = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callBack();
      timer = null;
    }, delay);
  };
}

// 定义指令
const debounce: Directive = {
  mounted(el: ElType, binding: BindingType) {
    const { callBack, event, delay } = binding.value;
    if (!callBack || typeof callBack !== "function") {
      throw new Error("自定义指令[v-debounce]的callback参数类型必须为函数");
    }
    if (!event || typeof event !== "string") {
      throw new Error("自定义指令[v-debounce]的event参数类型必须为字符串");
    }
    el.__handleEvent__ = handleDebounce(callBack, delay);
    el.addEventListener(event, el.__handleEvent__);
  },
  beforeUnmount(el: ElType, binding: BindingType) {
    const { event } = binding.value;
    el.removeEventListener(event, el.__handleEvent__);
  },
};

export default debounce;
