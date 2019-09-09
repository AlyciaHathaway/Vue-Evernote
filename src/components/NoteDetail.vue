<template>
    <div class="detail" id="notebook">
        <note-sidebar></note-sidebar>
        <div class="note-detail">
            <h1>notebookID: {{$route.query.notebookID}}</h1>
            <h1>pageID: {{$route.query.pageID}}</h1>
        </div>
    </div>
</template>

<script>
import NoteSidebar from '@/components/NoteSidebar'

export default {
    name: 'Notebook',
    components: {
        NoteSidebar
    },
	data() {
		return {
			message: '笔记详情页'
		}
	},
	created() {}
}
</script>

<style lang="scss" scoped>
#notebook {
    display: flex;
    align-items: stretch;
    background-color: #fff;
    flex: 1;
    .note-detail {
        display: flex;
        flex: 1;
        flex-direction: column;
    }
}
</style>