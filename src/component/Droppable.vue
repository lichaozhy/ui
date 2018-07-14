<template>
	<div class="vd-ui-droppable"
		@docking-query="onQuery()">
		<slot />
	</div>
</template>

<script>
export default {
	methods: {
		onQuery() {
			const query = {
				accept: false
			};

			this.$emit('vd-docking-query', query);
		},
		onDocked() {
			const data = {};

			this.$emit('vd-docked', data);
		}
	}
}
</script>
