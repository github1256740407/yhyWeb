/**
 * @description: 登录相关API
*/

import Service from "@/api";

// 登录(获取token+路由+按钮权限)
interface signInRequestType {
  username: string;
  password: string;
}
export const signInRequest = (data: signInRequestType) => {
  // return Service({
  //     url: `/background/login`,
  //     method: 'post',
  //     data
  // })
  return {
    code: 200,
    data: {
      token:'QAQTOKEN',
      userName: '叶花弈'
    },
    message:'success'
  };
};

// 退出登录
export const signOutRequest = () => {
  // return Service({
  //   url: `/background/logout`,
  //   method: 'post',
  // });
  return {
    code: 200,
    data: null,
    message:'success'
  };
};