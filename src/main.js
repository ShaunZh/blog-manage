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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
