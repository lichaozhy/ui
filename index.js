import './src/style.less';
import Draggable from './src/component/Draggable';
import Droppable from './src/component/Droppable';

export default function install(Vue) {
	Vue.component('VdUiDraggable', Draggable);
	Vue.component('VdUiDroppable', Droppable);
}