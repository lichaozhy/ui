<template>
	<div class="vd-ui-draggable"
		:class="{
			active: state === 1
		}"
		:style="{
			left: `${offset.now.x}px`,
			top: `${offset.now.y}px`
		}"
		@vd-docking-response=""
		@vd-docked-response=""
		@mousedown="onMousedown($event)"
		@mousemove="onMousemove($event)"
		@mouseup="onMouseup($event)">
		
		<slot />
	</div>
</template>

<script>
const STATE = {
	IDLE: -1,
	READY: 0,
	MOVING: 1,
};

function createDragEvent() {

}

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
		}
	},
	methods: {
		revert() {

		},
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
			
			this.move(event);

			const query = {
				accepted: null
			};

			// element.dispatchEvent('docking-query');
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
			this.pointer.start.x = event.clientX;
			this.pointer.start.y = event.clientY;
			this.offset.last.x = this.offset.now.x;
			this.offset.last.y = this.offset.now.y;

			this.state = STATE.MOVING;

			this.$emit('vd-drag-start');
		},
		move(event) {
			this.offset.now.x = this.offset.last.x + event.clientX - this.pointer.start.x,
			this.offset.now.y = this.offset.last.y + event.clientY - this.pointer.start.y

			this.$emit('vd-drag-move');
		},
		end() {
			this.cancel();
			
			this.$emit('vd-drag-end');
		}
	},
	data() {
		return {
			delayTimer: null,
			isAccepted: false,
			state: STATE.IDLE,
			offset: {
				last: {
					x: 0,
					y: 0
				},
				now: {
					x: 0,
					y: 0
				}
			},
			pointer: {
				start: {
					x: 0,
					y: 0
				},
				over: null
			}
		};
	}
}
</script>
