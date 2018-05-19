const apiDomain = 'http://127.0.0.1:3000';

const apiConfig = {
  api: {
    // 用户相关
    users: {
      register: `${apiDomain}/users/`, // 方法为POST
      get: `${apiDomain}/users/`, // 获取指定用户，方法为get
      verifyEmail: `${apiDomain}/verifyEmail/`, // 校验邮箱是否被注册
    },
    // 登录相关
    login: {
      into: `${apiDomain}/login/into`, // 登录
      getAccessToken: `${apiDomain}/getAccessToken`, // 获取访问token
      sendActiveEmail: `${apiDomain}/sendActiveEmail`, // 发送激活链接
    },
  },
};

module.exports = apiConfig;
