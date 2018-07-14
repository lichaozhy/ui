import Vue from 'vue';
import App from './src/App';
import DesktopUI from '../';

Vue.use(DesktopUI);

const app = new Vue(App);

app.$mount('#app');