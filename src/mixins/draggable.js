const STATE = { IDLE: -1, READY: 0, MOVING: 1 };

class VdDraggableController {
	constructor (element, {
		onStart, onMove, onEnd
	}, {
		handleRequired
	}) {
		this.$element = element;
		this.$offsetParent = element.offsetParent;

		this.state = STATE.IDLE;
		this.delayTimerId = null;

		this.position = {
			pointer: {
				origin: {},
				present: {},
			},
			element: {
				origin: {}
			}
		};

		element.addEventListener('mousedown', event => {
			if (handleRequired && !event.__VD_HANDLE__) {
				return;
			}

			if (this.state !== STATE.IDLE) {
				return this.cancel();
			}
			
			this.state = STATE.READY;

			this.delayTimerId = setTimeout(() => {
				clearSelection();

				const { pointer, element } = this.position;

				pointer.origin = getPointerClientPosition(event);
				const offset = element.origin = getElementOffsetPosition(this.$element);
				this.state = STATE.MOVING;
				
				onStart(offset, this);

				document.addEventListener('mousemove', move);
			}, 200);
		});

		element.addEventListener('mouseup', event => {
			this.cancel();

			onEnd(setOffset(event), this);
			document.removeEventListener('mousemove', move);
		});

		const setOffset = event => {
			const originOffset = computeElementOffset({
				pointerOrigin: this.position.pointer.origin,
				elementOrigin: this.position.element.origin,
				pointerPresent: this.position.pointer.present =
					getPointerClientPosition(event)
			});

			const offset = constraintFilter({
				originOffset,
				parentElement: this.$offsetParent,
				element: this.$element
			});

			this.setStyle(offset);

			return offset;
		};

		const move = event => {
			onMove(setOffset(event), this);
		};
	}

	setStyle(offset) {
		const { style } = this.$element;

		style.left = `${offset.x}px`;
		style.top = `${offset.y}px`;
	}

	cancel() {
		clearTimeout(this.delayTimer);
		this.delayTimer = null;
		this.state = STATE.IDLE;
	}
}

export default {
	inheritAttrs: false,
	props: {
		vdDragData: {
			default() {
				return {};
			},
			type: Object
		},
		vdDragDisabled: {
			default: false,
			type: Boolean
		},
		vdDragDelay: {
			default: 50,
			type: Number
		},
		vdDragConstraint: {
			default: null,
			type: String
		},
		vdHandleRequired: {
			default: false,
			type: Boolean
		},
		value: {
			type: Object,
			default() {
				return  { x: 0, y: 0 };
			},
		}
	},
	watch: {
		value: {
			handler(offset) {
				this.$vdDrag.setStyle(offset);
			},
			deep: true,
		}
	},
	mounted() {
		this.$el.classList.add('vd-ui-draggable');

		this.$vdDrag = new VdDraggableController(this.$el, {
			onStart: (offset) => {
				this.$emit('vd-drag-start', offset);
				this.$emit('input', offset);
			},
			onMove: (offset, controller) => {
				const destination = 
					getElementFromPoint(controller.position.pointer.present, controller.$element);

				const {
					received,
					response
				} = request('dock-query-request', this.vdDragData, destination);

				if (received) {
					this.$emit('vd-dock-query-respond', response);
				}
				
				this.$emit('vd-drag-move', offset);
				this.$emit('input', offset);
			},
			onEnd: (offset, controller) => {
				const destination = 
					getElementFromPoint(controller.position.pointer.present, controller.$element);
				
				const {
					received,
					response
				} = request('dock-request', this.vdDragData, destination);
				
				if (received) {
					this.$emit('vd-dock-respond', response);
				}
				
				this.$emit('vd-drag-end', offset);
				this.$emit('input', offset);
			}
		}, {
			handleRequired: this.vdHandleRequired
		});
	}
};

import { createDockQuery } from '../utils';

function request(typeName, data, destination) {
	const event = createDockQuery(typeName, data);

	event.received = false;
	event.response = {};

	destination.dispatchEvent(event);

	return event;
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