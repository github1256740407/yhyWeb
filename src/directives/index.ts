import { App } from "vue";
import checkButtonAuth from "@/directives/modules/checkButtonAuth";
import copy from "@/directives/modules/copy";
import debounce from "@/directives/modules/debounce";
import throttle from "@/directives/modules/throttle";
import waterMarker from "@/directives/modules/waterMarker"

/*
  为了避免指令重复绑定某个事件函数,导致重新执行函数代码,以及解绑时确认解绑的是同一个函数
  我们需要将事件函数绑定到el本身上,这点在modules下的自定义指令代码中有体现
*/

// 自定义指令总对象
const directiveList: any = {
  checkButtonAuth,
  copy,
  debounce,
  throttle,
  waterMarker
};

// 自定义指令
const directives = {
  install: function (app: App<Element>) {
    Object.keys(directiveList).forEach((key) => {
      // 注册所有自定义指令
      app.directive(key, directiveList[key]);
    });
  },
};

export default directives;
