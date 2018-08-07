import './src/style.less';
import Draggable from './src/component/Draggable';
import Droppable from './src/component/Droppable';

export default function install(Vue) {
	Vue.component('SppUiDraggable', Draggable);
	Vue.component('SppUiDroppable', Droppable);
}