/**
 * @description: 基础API请求
 */

import Service from "@/api";
import authRoutes from "@/api/mock/authRoutes.json";
import authButtons from "@/api/mock/authButtons.json";

//公共图片上传
export const uploadImg = (data: FormData) => {
  return Service({
    url: `/image/upload`,
    data,
  });
};

//权限:获取路由表
export const authRoutesRequest = () => {
  return authRoutes;
};

//权限:获取按钮权限
export const authButtonsRequest = () => {
  return authButtons;
};
