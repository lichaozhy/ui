<template>
	<div class="vd-ui-droppable"
		@dock-query="onQuery()">
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

			console.log(111)

			this.$emit('vd-docking-query', query);
		},
		onDocked() {
			const data = {};

			this.$emit('vd-docked', data);
		}
	}
}
</script>
