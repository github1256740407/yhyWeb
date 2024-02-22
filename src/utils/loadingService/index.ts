/**
 * @author: 叶花弈<l1256740407@gmail.com>
 * @description: 全局Loading
 * @todo:
 *  减少每个页面的loading冗余代码,自动检测axios请求发送,结束时loading的动画展示效果
 *  在axios拦截器中调用,记录发送请求的数量(只用记录接口数量,不关心是什么接口,哪个接口结束)
 *  当请求数量变动时,loading状态会发生改变
 */
import { ElLoading } from "element-plus";

let loadingInstance: ReturnType<typeof ElLoading.service>;
let loadingRequestNum = 0;

const startLoading = () => {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
};
const endLoading = () => {
  loadingInstance.close();
};

/**
 * @description: 全局Loading函数
 * @param {start|end} type 开始/结束
 * @example
 *  请求拦截器-开始: loadingService('start')
 *  请求拦截器-结束: loadingService('end')
 */
const loadingService = (type: string) => {
  if (type === "start") {
    loadingRequestNum++;
    if (loadingRequestNum > 0) {
      startLoading();
    }
  } else if (type === "end") {
    if (loadingRequestNum <= 0) return;

    loadingRequestNum--;
    if (loadingRequestNum === 0) {
      endLoading();
    }
  }
};
export default loadingService;
