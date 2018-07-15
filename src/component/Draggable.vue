<template>
	<div class="vd-ui-draggable"
		:class="{
			active: state === 1
		}"
		:style="{
			position: isHandle ? 'static' : 'relative',
			left: `${offset.x}px`,
			top: `${offset.y}px`
		}"
		@mousedown="onMousedown($event)"
		@mousemove="onMousemove($event)"
		@mouseup="onMouseup($event)">
		
		<slot />
	</div>
</template>

<script>
import { STATE, createDockQuery } from '../utils';

export default {
	props: {
		disabled: {
			default: false,
			type: Boolean
		},
		docked: {
			default: false,
			type: Boolean
		},
		delay: {
			default: 100,
			type: Number
		},
		isHandle: {
			default: false,
			type: Boolean
		},
		value: {
			default() {
				return  {
					x: 0,
					y: 0
				};
			},
			type: Object
		}
	},
	methods: {
		cancel() {
			clearTimeout(this.delayTimer);
			this.delayTimer = null;
			this.state = STATE.IDLE;
		},
		onMousedown(event) {
			if (this.disabled) {
				return;
			}

			if (this.state !== STATE.IDLE) {
				this.revert();
			}

			this.state = STATE.READY;

			this.delayTimer = setTimeout(() => this.start(event), this.delay);
		},
		onMousemove(event) {
			if (this.state !== STATE.MOVING) {
				return;
			}

			this.move(event)
		},
		onMouseup(event) {
			if (this.state === STATE.READY) {
				return this.cancel();
			}

			if (this.state !== STATE.MOVING) {
				return;
			}

			this.end(event);
		},
		start(event) {
			window.getSelection().removeAllRanges();

			this.pointer.start.x = event.clientX;
			this.pointer.start.y = event.clientY;
			this.last.x = this.offset.x - 0;
			this.last.y = this.offset.y - 0;

			this.state = STATE.MOVING;

			this.$emit('vd-drag-start', this.offset);
			this.$emit('input', this.offset);
		},
		move(event) {
			this.setOffset({
				x: this.last.x - 0 + event.clientX - this.pointer.start.x,
				y: this.last.y - 0 + event.clientY - this.pointer.start.y
			});

			this.setOver(event.clientX, event.clientY);

			this.requestDockingQuery();

			this.$emit('vd-drag-move', this.offset);
			this.$emit('input', this.offset);
		},
		end() {
			this.cancel();
			this.throttle = null;
			
			this.$emit('vd-drag-end', this.offset);
			this.$emit('input', this.offset);
		},
		setOffset({ x, y }) {
			this.offset.x = x;
			this.offset.y = y;
		},
		setOver(x, y) {
			const { style } = this.$el;

			style.display = 'none';
			this.over = document.elementFromPoint(x, y) || null;
			style.display = '';
		},
		requestDockingQuery() {
			if (this.over === null) {
				return;
			}

			const query = {
				accepted: null
			};

			this.over.dispatchEvent(createDockQuery());
		}
	},
	data() {
		return {
			delayTimer: null,
			isAccepted: false,
			state: STATE.IDLE,
			last: {
				x: 0,
				y: 0
			},
			offset: {
				x: 0,
				y: 0
			},
			pointer: {
				start: {
					x: 0,
					y: 0
				}
			},
			over: null
		};
	}
}
</script>
