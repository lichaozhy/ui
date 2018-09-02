import DraggableController from './draggable';
import DroppableController from './droppable';
import ResizableController from './resizable';

export class VirtualDesktopUI {
	constructor(element) {
		this.$element = element;

		this.draggableController = new DraggableController(this);
		this.droppableController = new DroppableController(this);
		this.resizableController = new ResizableController(this);
	}

	get size() {

	}

	get offset() {

	}
}