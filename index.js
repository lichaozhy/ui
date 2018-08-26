import './src/style.less';
import draggable from './src/mixins/draggable';
import droppable from './src/mixins/droppable';
import handle from './src/directive/handle';

export function vdUiCore(Vue) {
	Vue.directive('vdHandle', handle);
}

export const vdDraggable = draggable;
export const vdDroppable = droppable;