<template>
	<div class="detail" id="notebook">
		<header>
            <a class="button" href="#" @click.prevent="onCreate">新建笔记</a>
        </header>
        <main>
            <div class="layout">
                <h2>笔记列表({{noteList.length}})</h2>
                <div class="note-list">
                    <router-link class="note" v-for="(note, index) in noteList" :key="index" to="/notedetail/1">
                        <div class="title">
                            <g-icon class="icon" name="notedetail"></g-icon>
                            <p>{{note.title}}</p>
                        </div>
                        <div class="operation">
                            <p @click.stop.prevent="onEdit(note)">编辑</p>
                            <p @click.stop.prevent="onDelete(note)">删除</p>
                            <p>3天前</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </main>
	</div>
</template>

<script>
import icon from '@/components/Icon'
import Notebook from '@/apis/notebook'

export default {
    name: 'Notebook',
    components: {
        'g-icon': icon
    },
	data() {
		return {
			noteList: []
		}
	},
	created() {
        this.getNoteList()
    },
    methods: {
        getNoteList() {
            Notebook.getAll()
                .then(response => {
                    console.log(response)
                    this.noteList = response.data
                })
        },
        onCreate() {
            let title = window.prompt('创建第一条笔记')
            if (title.trim() === '') {
                alert('笔记标题不能为空')
                return
            }else {
                Notebook.addNote({
                    title
                }).then(response => {
                    this.noteList.unshift(response.data)
                })
            }
        },
        onEdit(note) {
            let title = window.prompt('修改标题', note.title)
            Notebook.updateNote(note.id, {title})
                .then(response => {
                    alert(response.msg)
                    note.title = title
                })
        },
        onDelete(note) {
            let isConfirm = window.confirm('你确定要删除吗？')
            if (isConfirm) {
                Notebook.deleteNote(note.id)
                    .then(response => {
                        this.noteList.splice(this.noteList.indexOf(note), 1)
                        alert(response.msg)
                    })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#notebook {
	flex: 1;
    header {
        padding: 12px;
        border-bottom: 1px solid #ccc;
        .button {
            margin-left: 10px;
            padding: 4px 8px;
            border-radius: 4px;
            box-shadow: 0 0 2px 0 #ccc;
            font-size: 12px;
            background-color: #fff;
            color: #666;
            cursor: pointer;
        }
    }
    main {
        padding: 30px 40px;
        .layout {
            max-width: 966px;
            margin: 0 auto;
            h2 {
                font-size: 16px;
                color: #000;
            }
            .note-list {
                margin-top: 10px;
                border-radius: 4px;
                font-size: 14px;
                font-weight: 500;
                color: #666;
                background-color: #fff;
                .note {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 14px;
                    border-bottom: 1px solid #ebebeb;
                    font-size: 12px;
                    cursor: pointer;
                    &:hover {
                        background-color: #f7fafd;
                    }
                    .title {
                        display: flex;
                        align-items: center;
                        font-weight: 500;
                        .icon {
                            width: 1.5em;
                            height: 1.5em;
                            margin-right: 4px;
                        }
                    }
                    .operation {
                        display: flex;
                        align-items: center;
                        color: #b3c0c8;
                        p {
                            margin-left: 10px;
                        }
                    }
                }
                
            }
        }
    }
}
</style>