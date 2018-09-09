<template>

<div style="position: absolute"><slot /></div>

</template>

<script>
import DraggableController from '../ui/draggable';
import ResizableController from '../ui/resizable';

export default {
	data() {
		return {
			model: {
				x: 0,
				y: 0,
				width: 0,
				height: 0,
			},
			controller: {
				draggable: null,
				resizable: null
			},
		}
	},
	methods: {
		updataElement() {
			const { x, y, width, height } = this.model;
			const { style } = this.$el;

			style.left = x + 'px';
			style.top = y + 'px';
			style.width = width + 'px';
			style.height = height + 'px';
		},
		updateModel() {
			this.model = {
				x: this.$el.offsetLeft,
				y: this.$el.offsetTop,
				width: this.$el.offsetWidth,
				height: this.$el.offsetHeight,
			}

			this.$emit('input', this.model);
		}
	},
	mounted() {
		this.$el.addEventListener('vd-dragend', this.updateModel);
		this.$el.addEventListener('vd-resizeend', this.updateModel);

		if (this.draggable) {
			this.controller.draggable = new DraggableController(this.$el, {
				handled: this.handled,
				constraint: this.constraint,
				delay: this.delay,
				axis: this.axis,
				droppable: this.droppable,
				dataFactory: () => {
					return this.data;
				},
			});
		}

		if (this.resizable) {
			this.controller.resizable = new ResizableController(this.$el, {
				constraint: this.constraint,
				direction: this.direction
			});
		}

		if (this.value) {
			const { x, y, width, height } = this.value;

			this.model = { x, y, width, height };
		}
		
		this.updataElement();
		this.updateModel();
	},
	watch: {
		model: {
			handler({ x, y, height, width }) {
				this.$el.style.left = x + 'px';
				this.$el.style.top = y + 'px';
			},
			deep: true
		},
		value({
			x = this.model.x,
			y = this.model.y,
			width = this.model.width,
			height = this.model.height
		} = {}) {
			this.model.x = x;
			this.model.y = y;
			this.model.width = width;
			this.model.height = height;

			this.updataElement();
		},
		resizable(enabled, origin) {
			if (enabled === origin) {
				return;
			}

			if (enabled) {
				this.controller.resizable = new ResizableController(this.$el, {});
			} else {
				this.controller.resizable.destroy();
				this.controller.resizable = null;
			}
		},
		draggable(enabled, origin) {
			if (enabled === origin) {
				return;
			}

			if (enabled) {
				this.controller.draggable = new DraggableController(this.$el, {});
			} else {
				this.controller.draggable.destroy();
				this.controller.draggable = null;
			}
		},
		constraint(value) {
			if (this.draggable) {
				this.controller.draggable.setOption('constraint', value);
			}

			if (this.resizable) {
				this.controller.resizable.setOption('constraint', value);
			}
		},
		axis(value) {
			if (this.draggable) {
				this.controller.draggable.setOption('axis', value);
			}
		},
		handled(value) {
			if (this.draggable) {
				this.controller.draggable.setOption('handled', value);
			}
		},
		droppable(value) {
			if (this.draggable) {
				this.controller.draggable.setOption('droppable', value);
			}
		},
		delay(value) {
			if (this.draggable) {
				this.controller.draggable.setOption('delay', value);
			}
		},
		direction: {
			handler(value) {
				if (this.resizable) {
					const controller = this.controller.resizable;
					controller.setOption('direction', value);
					controller.updateHandle();
				}
			},
			deep: true
		}
	},
	props: {
		resizable: { default: false, type: Boolean },
		draggable: { default: false, type: Boolean },
		
		constraint: { default: false, type: Boolean },
		axis: { default: null },
		handled: { default: false, type: Boolean },
		droppable: { default: false, type: Boolean },
		delay: { default: 50, type: Number },
		direction: {
			type: Array,
			default() {
				return [1, 1, 1, 1];
			}
		},
		data: {
			default() {
				return {};
			},
			type: Object
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
	}
}
</script>

