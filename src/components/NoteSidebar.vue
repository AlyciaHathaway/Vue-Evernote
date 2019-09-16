<template>
	<div id="note-sidebar">
		<span class="button add-note" @click="addNote">添加笔记</span>
		<el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
			<span class="el-dropdown-link">
				{{currentNotebook.title}}
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item
					v-for="(notebook, index) in notebookList"
					:key="index"
					:command="notebook.id"
				>{{notebook.title}}</el-dropdown-item>
				<el-dropdown-item command="trash" divided>回收站</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>

		<div class="menu">
			<p>更新时间</p>
			<p>标题</p>
		</div>

		<ul class="notes">
			<li v-for="(note, index) in noteList" :key="index">
				<router-link :to="`/notedetail?notebookID=${currentNotebook.id}&noteID=${note.id}`">
					<span class="date">{{note.updatedAtDate}}</span>
					<span class="title">{{note.title}}</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
import Notebook from '@/apis/notebook'
import Note from '@/apis/notedetail'
import Bus from '@/helpers/eventBus'

export default {
    name: 'NoteSidebar',
    created() {
        this.getNotebookList()
    },
	data() {
		return {
			notebookList: [],
			noteList: [],
            currentNotebook: {}
		}
	},
	methods: {
        getNotebookList() {
            Notebook.getAll()
                .then(response => {
                    this.notebookList = response.data
                    let currentNotebookID = parseInt(this.$route.query.notebookID)
                    this.updateCurrentNotebook(currentNotebookID)
                    this.getNoteList(currentNotebookID)
                })
        },
        getNoteList(notebookID) {
            Note.getAll({notebookID})
                .then(response => {
                    this.noteList = response.data
                    this.$emit('update:notes', this.noteList)
                    Bus.$emit('update:notes', this.noteList)
                })
        },
        updateCurrentNotebook(id) {
            this.currentNotebook = this.notebookList.find(notebook => notebook.id === id)
                || this.notebookList[0] || {title: '我的笔记本'}
        },
		handleCommand(notebookID) {
            if (notebookID !== 'trash') {
                this.$router.push({
                    path: '/notedetail',
                    query: {notebookID}
                })
                this.updateCurrentNotebook(notebookID)
                this.getNoteList(notebookID)
            }else {
                this.$router.push({
                    path: '/trash'
                })
            }
        },
        addNote() {
            Note.addNote({
                notebookID: this.currentNotebook.id
            }).then(response => {
                this.noteList.unshift(response.data)
            })
        }
	}
}
</script>

<style lang="scss" scoped>
#note-sidebar {
	position: relative;
	width: 290px;
	border-right: 1px solid #ccc;
	background-color: #eee;
	.add-note {
		position: absolute;
		top: 8px;
		right: 5px;
		z-index: 1;
        &.button {
            margin-left: 10px;
            padding: 4px 8px;
            font-size: 12px;
            background-color: #fff;
            color: #666;
        }
	}
	.notebook-title {
		display: block;
		font-size: 18px;
		font-weight: 400;
		color: #333;
		height: 45px;
		line-height: 45px;
		text-align: center;
		border-bottom: 1px solid #ccc;
		background-color: #f7f7f7;
	}
	.menu {
		display: flex;
		p {
			font-size: 12px;
			padding: 2px 10px;
			flex: 1;
			border-bottom: 1px solid #ccc;
			&:first-child {
				border-right: 1px solid #ccc;
			}
		}
	}
	.notes {
		li {
			&:nth-child(odd) {
				background-color: #fdfdfd;
			}
			.router-link-exact-active {
				border: 1px solid #81c0f3;
				border-radius: 3px;
			}
			a {
				display: flex;
				padding: 3px 0;
				font-size: 12px;
				border: 2px solid transparent;
			}
			span {
				padding: 0 10px;
				flex: 1;
			}
		}
	}
}
</style>