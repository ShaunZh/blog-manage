// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import axios from 'axios';
import { MessageBox, Message, Notification } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App';
import router from './router';
import appConfig from './config/appConfig';

require('@/assets/css/base.css');

Vue.config.productionTip = false;
// Vue.prototype.$ELEMENT = { size: 'small' };

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;

Vue.prototype.$appConfig = appConfig;

axios.defaults.headers = {
  'Content-Type': 'application/json',
};
// Add a request interceptor
axios.interceptors.request.use((config) => {
  // Do something before request is sent
  const token = localStorage.getItem('accessToken');
  if (token == undefined) {
    delete config.headers['x-access-token'];
  } else {
    config.headers['x-access-token'] = localStorage.getItem('accessToken');
  }
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  if (response.data.status === 406) {
    router.replace({name: 'Login'});
    return;
  }
  return response;
}, (error) => {
  // Do something with response error
  return Promise.reject(error);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
