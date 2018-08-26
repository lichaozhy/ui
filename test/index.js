import Vue from 'vue';
import App from './src/App';
import { vdUiCore } from '../';

Vue.use(vdUiCore);

const app = new Vue(App);

app.$mount('#app');