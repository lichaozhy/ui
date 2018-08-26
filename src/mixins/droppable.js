export default {
	inheritAttrs: false,
	mounted() {
		this.$el.classList.add('vd-ui-droppable');

		this.$el.addEventListener('dock-query-request', event => {
			event.stopPropagation();
			event.received = true;

			this.$emit('vd-dock-query', event);
		});

		this.$el.addEventListener('dock-request', event => {
			event.stopPropagation();
			event.received = true;

			this.$emit('vd-dock', event);
		});
	}
};