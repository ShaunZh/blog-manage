// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import { MessageBox, Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App';
import router from './router';


require('@/assets/css/base.css');

Vue.config.productionTip = false;
// Vue.prototype.$ELEMENT = { size: 'small' };

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
