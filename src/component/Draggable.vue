<template>
	<div class="vd-ui-draggable"
		:class="{
			active: state === 1
		}"
		:style="{
			position: isHandle ? 'static' : 'absolute',
			left: `${offset.x}px`,
			top: `${offset.y}px`
		}"
		:disabled="disabled"
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
		data: {
			default() {
				return {};
			},
			type: Object
		},
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
		},
		constraint: {
			default: null,
			type: String
		}
	},
	computed: {
		maxY() {
			return this.$offsetParent.offsetHeight - this.$el.offsetHeight;
		},
		maxX() {
			return this.$offsetParent.offsetWidth - this.$el.offsetWidth;
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
				this.cancel();
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
			this.setPointerClient(event);
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
			this.setPointerClient(event);
			
			this.setOffset({
				x: this.last.x - 0 + event.clientX - this.pointer.start.x,
				y: this.last.y - 0 + event.clientY - this.pointer.start.y
			});

			this.request('dock-query-request');
			this.$emit('vd-drag-move', this.offset);
			this.$emit('input', this.offset);
		},
		end(event) {
			this.cancel();
			this.throttle = null;
			
			this.request('dock-request')
			this.$emit('vd-drag-end', this.offset);
			this.$emit('input', this.offset);
		},
		setOffset({ x, y }) {
			if (this.constraint === 'parent') {
				x = Math.max(x, 0);
				x = Math.min(x, this.maxX);
				y = Math.max(y, 0);
				y = Math.min(y, this.maxY);
			}

			this.offset.x = x;
			this.offset.y = y;
		},
		getOver() {
			const { style } = this.$el;
			const { x, y } = this.pointer.client;

			style.display = 'none';
			const over = document.elementFromPoint(x, y) || null;
			style.display = '';

			return over;
		},
		setPointerClient(event) {
			this.pointer.client.x = event.clientX;
			this.pointer.client.y = event.clientY;
		},
		request(typeName) {
			const event = createDockQuery(typeName, this.data);

			this.getOver().dispatchEvent(event);

			return event.response;
		}
	},
	data() {
		return {
			droppable: null,
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
				},
				client: {
					x: 0,
					y: 0
				}
			},
		};
	},
	mounted() {
		this.$offsetParent = this.$el.offsetParent;

		console.log(this.$offsetParent);
	}
}
</script>
