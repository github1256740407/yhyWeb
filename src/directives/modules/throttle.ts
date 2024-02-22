/*
    [指令]:v-throttle
    [参数]:Object{
            event:string, // click || input
            callBack:Function,
            delay?:number // 默认值500
          }
    [作用]:节流,不管频率多高,固定时间周期内只执行一次
    [常用场景]:click事件 -> 避免按钮被高频率点击,发送大量请求
    [使用示例]:
              <el-button
                v-throttle="{ event: 'click', callBack: handleClick }"
              />按钮</el-button>
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
function handleThrottle(callBack: Function, delay = 500) {
  let symbol: boolean = true;
  return function () {
    if (symbol) {
      setTimeout(() => {
        callBack();
        symbol = true;
      }, delay);
    }
    symbol = false;
  };
}

// 定义指令
const throttle: Directive = {
  mounted(el: ElType, binding: BindingType) {
    const { callBack, event, delay } = binding.value;
    if (!callBack || typeof callBack !== "function") {
      throw new Error("自定义指令[v-throttle]的callback参数类型必须为函数");
    }
    if (!event || typeof event !== "string") {
      throw new Error("自定义指令[v-throttle]的event参数类型必须为字符串");
    }
    el.__handleEvent__ = handleThrottle(callBack, delay);
    el.addEventListener(event, el.__handleEvent__);
  },
  beforeUnmount(el: ElType, binding: BindingType) {
    const { event } = binding.value;
    el.removeEventListener(event, el.__handleEvent__);
  },
};

export default throttle;
