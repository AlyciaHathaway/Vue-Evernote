<template>
	<div id="note-detail">
		<h1>notebookID: {{$route.query.notebookID}}</h1>
        <h1>pageID: {{$route.query.pageID}}</h1>
	</div>
</template>

<script>
export default {
	name: 'NoteDetail',
	data() {
		return {
			message: '笔记详情页'
		}
	},
	created() {}
}
</script>

<style lang="scss" scoped>
#note-detail {
	h1 {
		color: rgb(191, 191, 199);
	}
}
</style>