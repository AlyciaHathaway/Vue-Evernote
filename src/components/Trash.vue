<template>
	<div id="trash">
		<h1>notebookID: {{$route.query.notebookID}}</h1>
	</div>
</template>

<script>
export default {
	name: 'Trash',
	data() {
		return {
			message: '回收站'
		}
	},
	created() {}
}
</script>