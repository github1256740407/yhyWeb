// 引入请求相关文件,配置
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ElMessage } from "element-plus";
import getUserStore from "@/store/modules/userStore";
import loadingService from "@/utils/loadingService";

const config = {
  baseURL: import.meta.env.VITE_API_BASEURL as string, // 基础路径
  timeout: 10 * 1000, // 超时限制
  withCredentials: true, // 跨域时候允许携带凭证
  crossDomain: true,
};

const Service = axios.create(config);

// 请求拦截器
interface requestConfig extends InternalAxiosRequestConfig {
  openLoading?: true; // 是否启用全局loading
  token?: string;
}
Service.interceptors.request.use(
  (config: requestConfig) => {
    // 判断是否启用全局loading
    const { openLoading } = config;
    if (openLoading) loadingService("start");
    // 添加token至请求头中
    const userStore = getUserStore();
    config.headers.token = userStore.token;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
const handleResponseStatus = (code: number): string => {
  let msg = null;
  switch (code) {
    case 400:
      msg = "400: 请求失败,请您稍后重试";
      break;
    case 401:
      msg = "401: 登录失效,请重新登录";
      break;
    case 403:
      msg = "403: 当前账号无权限访问！";
      break;
    case 404:
      msg = "404: 你所访问的资源不存在！";
      break;
    case 405:
      msg = "405: 请求方式错误！请您稍后重试";
      break;
    case 408:
      msg = "408: 请求超时！请您稍后重试";
      break;
    case 500:
      msg = "500: 服务异常！";
      break;
    case 502:
      msg = "502: 网关错误！";
      break;
    case 503:
      msg = "503: 服务不可用！";
      break;
    case 504:
      msg = "504: 网关超时！";
      break;
    default:
      msg = "异常错误";
  }
  return msg;
};
Service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    if (data.code && data.code !== 200) {
      ElMessage.error(data.message);
      // token过期
      if (data.code == "19995") {
        const userStore = getUserStore();
        userStore.signOut();
      }
      return Promise.reject(data);
    }
    return data;
  },
  (error: AxiosError) => {
    const { response, message }: any = error;
    let errorMsg = null;
    if (message.indexOf("timeout") !== -1 || !response) {
      errorMsg = "请求超时,请稍后重试";
    } else {
      errorMsg =
        response.data?.message ?? handleResponseStatus(response.status);
    }
    ElMessage.error(errorMsg);
    return Promise.reject(error);
  }
);

export default Service;
