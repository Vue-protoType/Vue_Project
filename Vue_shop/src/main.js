// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import store from './store/main'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import VueI18n from 'vue-i18n'
import LazyLoad from 'vue-lazyload'
import {Message} from 'element-ui'

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.prototype.$message = Message;
Vue.use(LazyLoad,{
  loading:'../static/svg/loading-bars.svg'
});
/* eslint-disable no-new */
const i18n = new VueI18n({
  locale:'zh',
  messages:{
    'zh': require('./assets/lang/zh'),
    'en': require('./assets/lang/en')
  }
});
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
});
