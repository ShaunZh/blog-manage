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
    // 笔记本
    notebooks: {
      list: `${apiDomain}/author/notebooks`, // 获取笔记本列表
      add: `${apiDomain}/author/notebooks`, // 添加笔记本
      update: `${apiDomain}/author/notebooks`, // 更新笔记本
      remove: `${apiDomain}/author/notebooks`, // 删除笔记本
    },
    // 笔记
    notes: {
      list: `${apiDomain}/author/notes`, // 获取文章列表 get方法
      get: `${apiDomain}/author/notes`, // 获取文章详情 get方法 + 文章ID
      add: `${apiDomain}/author/notes`, // 添加文章 post方法
      autoSave: `${apiDomain}/author/notes/autoSave`, // 自动保存文章
      update: `${apiDomain}/author/notes`, // 更新文章，put方法
    },
  },
};

module.exports = apiConfig;
