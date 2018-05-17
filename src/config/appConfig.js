const apiDomain = 'http://127.0.0.1:3000';

const apiConfig = {
  api: {
    // 用户相关
    users: {
      register: apiDomain + '/users/', // 方法为POST
      get: apiDomain + '/users/', // 获取指定用户，方法为get
      verifyEmail: apiDomain + '/verifyEmail/',
    },
  },
};

module.exports = apiConfig;
