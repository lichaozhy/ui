import Controller from './utils/controller';
import './utils/event';

const STATE = { IDLE: -1, READY: 0, MOVING: 1 };

function DefaultOptions() {
	return {
		handleRequired: false,
		constraint: null,
		delay: 50,
		threshold: 0,
		axis: null
	};
}

function DragEvent(typeName, offset) {
	return new CustomEvent(typeName, {
		bubbles: true,
		cancelable: true,
		detail: {
			offset
		}
	});
}

export default class DraggableController extends Controller {
	constructor(element) {
		super(element, DefaultOptions());

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

		this.$onMousedown = event => {
			if (this.$state !== STATE.IDLE) {
				return this.$cancel();
			}

			if (this.$options.handleRequired && !event.__VD_HANDLE__) {
				return;
			}
			
			event.stopPropagation();
			
			this.$state = STATE.READY;
			this.$timer = setTimeout(() => {
				this.$state = STATE.MOVING;
				this.$start(event);
			}, this.$options.delay);
		};

		this.$onMousemove = event => {
			clearSelection();

			event.stopPropagation();

			this.$move(event);
		};

		this.$onMouseup = event => {
			event.stopPropagation();

			if (this.$state === STATE.MOVING) {
				this.$end(event);
			}

			this.$cancel();
		}
		
		this.element.addEventListener('mousedown', this.$onMousedown);
		this.element.addEventListener('mouseup', this.$onMouseup);
	}

	get $offsetParent() {
		return this.element.offsetParent;
	}

	$getDestination() {
		return getElementFromPoint(this.position.pointer.present, this.element);
	}

	$start(event) {
		const { pointer, element } = this.position;
		const offset = element.origin = getElementOffsetPosition(this.element);

		pointer.origin = getPointerClientPosition(event);

		this.element.addEventListener('mousemove', this.$onMousemove);
		document.addEventListener('mousemove', this.$onMousemove);
		document.addEventListener('mouseup', this.$onMouseup);

		this.element.dispatchEvent(DragEvent('drag-start', offset));
	}

	$move(event) {
		const offset = this.$setOffsetFromEvent(event);

		this.element.dispatchEvent(DragEvent('drag-move', offset));
	}

	$end(event) {
		const offset = this.$setOffsetFromEvent(event);

		this.element.dispatchEvent(DragEvent('drag-end', offset));
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
		
		if (this.$options.axis !== 'y') {
			style.left = `${x}px`;
		}

		if (this.$options.axis !== 'x') {
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

		if (this.$options.constraint === 'parent') {
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
	style.display = 'none';
	const element = document.elementFromPoint(x, y) || null;
	style.display = '';

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