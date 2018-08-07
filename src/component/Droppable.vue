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
			this.$emit('vd-dock-query', event.detail);

			event.response = {
				accepted: this.check(event.detail)
			};
		},
		tryDock({ detail }) {
			if (this.check(detail)) {
				this.$emit('vd-dock', detail);
			}
		}
	}
}
</script>
