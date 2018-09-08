import Controller from './utils/controller';
import './utils/event';

const STATE = { IDLE: -1, READY: 0, MOVING: 1 };
let dragover = document;

function noOp() {
	return;
}

function DefaultOptions() {
	return {
		handled: false,
		constraint: false,
		delay: 50,
		threshold: 0,
		axis: null,
		dataFactory: noOp,
		droppable: false
	};
}

function VdDragEvent(typeName, data, mouseEvent, element) {
	return Object.assign(new CustomEvent(typeName, {
		bubbles: true,
		cancelable: true,
		detail: {
			data,
			left: element.offsetLeft,
			top: element.offsetTop,
		}
	}), {
		clientX: mouseEvent.clientX,
		clientY: mouseEvent.clientY,
		getData() {
			return this.detail.data;
		}
	});
}

export default class DraggableController extends Controller {
	constructor(element, options = {}) {
		super(element, DefaultOptions());
		this.initOptions(options);

		this.position = {
			pointer: {
				origin: { x: 0, y: 0 },
				present: { x: 0, y: 0 }
			},
			element: {
				origin: { x: 0, y: 0 }
			}
		};
		
		this.$timer = null;
		this.$state = STATE.IDLE;
		this.$dataFactory = this.getOption('dataFactory');

		this.$onMousedown = event => {
			if (this.$state !== STATE.IDLE) {
				return this.$cancel();
			}

			if (this.getOption('handled') && !event.__VD_HANDLE__) {
				return;
			}
			
			event.stopPropagation();
			
			this.$state = STATE.READY;
			this.$timer = setTimeout(() => {
				this.$state = STATE.MOVING;
				this.$start(event);
			}, this.getOption('delay'));
		};

		this.$onMousemove = event => {
			clearSelection();

			event.stopPropagation();

			this.$move(event);
		};

		this.$onMouseup = event => {
			// event.stopPropagation();

			if (this.$state === STATE.MOVING) {
				this.$end(event);
			}

			this.$cancel();
		};
		
		this.element.addEventListener('mousedown', this.$onMousedown);
		this.element.addEventListener('mouseup', this.$onMouseup);
	}

	get $offsetParent() {
		return this.element.offsetParent;
	}

	$dispatch(typeName, element, mouseEvent) {
		const dragEvent = VdDragEvent(
			typeName,
			this.$dataFactory(this),
			mouseEvent,
			element
		);

		element.dispatchEvent(dragEvent);
	}

	$updateDragoverElement(event) {
		const newDragover = getElementFromPoint(
			this.position.pointer.present,
			this.element
		) || document;

		if (newDragover === dragover) {
			this.$dispatch('vd-dragover', dragover, event);
		} else {
			this.$dispatch('vd-dragleave', dragover, event);
			this.$dispatch('vd-dragenter', newDragover, event);

			dragover = newDragover;
		}
	}

	$start(event) {
		const { pointer, element } = this.position;
		element.origin = getElementOffsetPosition(this.element);

		pointer.origin = getPointerClientPosition(event);
		this.element.style.zIndex = Number.MAX_SAFE_INTEGER;

		this.element.addEventListener('mousemove', this.$onMousemove);
		document.addEventListener('mousemove', this.$onMousemove);
		document.addEventListener('mouseup', this.$onMouseup);

		this.$dispatch('vd-dragstart', this.element, event);
	}

	$move(event) {
		this.$setOffsetFromEvent(event);

		if (this.getOption('droppable')) {
			this.$updateDragoverElement(event);
		}

		this.$dispatch('vd-drag', this.element, event);
	}

	$end(event) {
		this.element.style.zIndex = 0;
		this.$setOffsetFromEvent(event);

		this.$dispatch('vd-dragend', this.element, event);

		if (this.getOption('droppable')) {
			this.$dispatch('vd-drop', dragover, event);
		}

		dragover = document;
	}

	$cancel() {
		clearTimeout(this.$timer);
		this.$timer = null;
		
		this.element.removeEventListener('mousemove', this.$onMousemove);
		document.removeEventListener('mousemove', this.$onMousemove);
		document.removeEventListener('mouseup', this.$onMouseup);
		
		this.$state = STATE.IDLE;
	}

	get() {
		const {
			offsetTop,
			offsetLeft
		} = this.element;

		return {
			x: offsetLeft,
			y: offsetTop
		};
	}

	set({ x, y }) {
		const style = this.element.style;
		
		if (this.getOption('axis') !== 'y') {
			style.left = `${x}px`;
		}

		if (this.getOption('axis') !== 'x') {
			style.top = `${y}px`;
		}

		return this.get();
	}

	$setOffsetFromEvent(event) {
		let offset;
		const originOffset = offset = computeElementOffset({
			pointerOrigin: this.position.pointer.origin,
			pointerPresent: this.position.pointer.present = getPointerClientPosition(event),
			elementOrigin: this.position.element.origin
		});

		if (this.getOption('constraint')) {
			offset = constraintFilter({
				originOffset,
				parentElement: this.$offsetParent,
				element: this.element
			});
		}

		return this.set(offset);
	}

	destroy() {
		this.$cancel();
		this.element.removeEventListener('mousedown', this.$onMousedown);
		this.element.removeEventListener('mouseup', this.$onMouseup);
	}

}

function clearSelection() {
	window.getSelection().removeAllRanges();
}

function getElementFromPoint({ x, y }, { style }) {
	style.visibility = 'hidden';
	const element = document.elementFromPoint(x, y) || null;
	style.visibility = 'visible';

	return element;
}

function getPointerClientPosition({
	clientX, clientY
}) {
	return { x: clientX, y: clientY };
}

function getElementOffsetPosition({
	offsetTop, offsetLeft
}) {
	return { x: offsetLeft, y: offsetTop };
}

function constraintFilter({
	originOffset: { x, y },
	element,
	parentElement,
}) {
	const maxX = parentElement.offsetWidth - element.offsetWidth;
	const maxY = parentElement.offsetHeight - element.offsetHeight;

	return {
		x: Math.min(Math.max(x, 0), maxX),
		y: Math.min(Math.max(y, 0), maxY),
	};
}

function computeElementOffset({
	pointerOrigin,
	pointerPresent,
	elementOrigin,
}) {
	return {
		x: elementOrigin.x + pointerPresent.x - pointerOrigin.x,
		y: elementOrigin.y + pointerPresent.y - pointerOrigin.y,
	};
}