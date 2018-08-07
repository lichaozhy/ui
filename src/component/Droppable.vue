<template>
	<div class="vd-ui-droppable"
		@dock-query-request.stop="respondDockQuery($event)"
		@dock-request.stop="tryDock($event)">
		<slot />
	</div>
</template>

<script>
export default {
	data() {
		return {
			isBusy: false
		}
	},
	props: {
		check: {
			type: Function,
			default: () => false
		}
	},
	methods: {
		respondDockQuery(event) {
			event.received = true;

			this.$emit('vd-dock-query', event);
		},
		tryDock(event) {
			event.received = true;

			this.$emit('vd-dock', event);
		}
	}
}
</script>
