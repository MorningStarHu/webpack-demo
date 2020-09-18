import Vue from 'vue';
import ViewUI from 'view-design';
import App from './app.vue';
import { router } from './router/index';
import en from 'view-design/dist/locale/en-US';
import zh from 'view-design/dist/locale/zh-CN';
import store from './store/store';
import VueI18n from 'vue-i18n'
import './styles/index.less';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);
Vue.use(VueI18n)

// 国际化配置
// this.$i18n.locale 通过切换 locale 的值来实现语言切换
const lang = window.localStorage.getItem('lang');
const i18n = new VueI18n({
	locale: lang || 'zh-CN',
	messages: {
		'en-US': Object.assign(require('./config/lang/en'), en),
		'zh-CN': Object.assign(require('./config/lang/zh'), zh)
	}
});

new Vue({ // 创建 vue 实例
  // 提供一个在页面上已经存在的 DOM 元素作为 Vue 实例挂载目标
  el: '#app', 
  // 创建和挂载根实例
  router: router,
  // 
  store: store,
  i18n,
  // 声明了 html 中的内容
  render: h => h(App)
})