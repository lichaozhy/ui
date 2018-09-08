import handle from './src/directive/handle';
import VdUi from './src/component/VdUi.vue';

export default function vdUiCore(Vue) {
	Vue.directive('vdHandle', handle);
	Vue.component('vdUi', VdUi);
}