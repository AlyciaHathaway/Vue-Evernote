<template>
	<div class="detail" id="notebooks">
		<header>
            <a class="button" href="#" @click.prevent="onCreate">新建笔记</a>
        </header>
        <main>
            <div class="layout">
                <h2>笔记列表({{notebookList.length}})</h2>
                <div class="notebook-list">
                    <router-link class="notebook" v-for="(notebook, index) in notebookList" :key="index" :to="`/notedetail/?notebookID=${notebook.id}`">
                        <div class="title">
                            <g-icon class="icon" name="notedetail"></g-icon>
                            <p>{{notebook.title}}</p>
                        </div>
                        <div class="operation">
                            <p>{{notebook.dateFormat}}</p>
                            <p @click.stop.prevent="onEdit(notebook)">编辑</p>
                            <p @click.stop.prevent="onDelete(notebook)">删除</p>
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
import { dateFormat } from '@/helpers/util'

export default {
    name: 'Notebooks',
    components: {
        'g-icon': icon
    },
	data() {
		return {
			notebookList: []
		}
	},
	created() {
        this.getnotebookList()
    },
    methods: {
        getnotebookList() {
            Notebook.getAll()
                .then(response => {
                    console.log(response)
                    this.notebookList = response.data
                })
        },
        onCreate() {
            this.$prompt('请输入标题', '创建笔记', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^.{1,30}$/,
                inputErrorMessage: '标题不能为空，且不超过30个字符'
            }).then(({ value }) => {
                return Notebook.addNote({title: value})
            }).then(response => {
                response.data.dateFormat = dateFormat(response.data.createdAt)
                this.notebookList.unshift(response.data)
                this.$message.success(response.msg)
            })
        },
        onEdit(notebook) {
            let title = ''
            this.$prompt('请重命名标题', '修改笔记', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValue: notebook.title,
                inputPattern: /^.{1,30}$/,
                inputErrorMessage: '标题不能为空，且不超过30个字符'
            }).then(({ value }) => {
                title = value
                return Notebook.updateNote(notebook.id, {title})
            }).then(response => {
                notebook.title = title
                this.$message.success(response.msg)
            })
        },
        onDelete(notebook) {
            this.$confirm('你确定要删除笔记吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return Notebook.deleteNote(notebook.id)
            }).then(response => {
                this.notebookList.splice(this.notebookList.indexOf(notebook), 1)
                this.$message.success(response.msg)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#notebooks {
	flex: 1;
    header {
        padding: 12px;
        border-bottom: 1px solid #ccc;
        .button {
            margin-left: 10px;
            padding: 4px 8px;
            font-size: 12px;
            background-color: #fff;
            color: #666;
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
            .notebook-list {
                margin-top: 10px;
                border-radius: 4px;
                font-size: 14px;
                font-weight: 500;
                color: #666;
                background-color: #fff;
                .notebook {
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