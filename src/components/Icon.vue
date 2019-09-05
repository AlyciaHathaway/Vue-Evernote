<template>
	<svg class="g-icon">
		<use :xlink:href="`#i-${name}`"></use>
	</svg>
</template>

<script>
	import '@/assets/svg'
	export default {
		name: 'GuluIcon',
		props: ['name']
	}
</script>

<style lang="scss" scoped>
	.g-icon {
		width: 2em;
		height: 2em;
	}
</style>