<template>
	<div class="detail" id="notebook">
		<note-sidebar @update:notes="value => noteList = value"></note-sidebar>
		<div class="note-detail">
			<div class="note-bar">
				<p>创建日期: {{currentNote.createdAtDate}}</p>
				<p>更新日期: {{currentNote.updatedAtDate}}</p>
				<p class="save">{{currentNote.statusText}}</p>
                <div class="operate">
                    <g-icon class="icon" name="trash"></g-icon>
                    <g-icon class="icon" name="fullscreen"></g-icon>
                </div>
			</div>
			<div class="note-title">
                <input type="text" v-model="currentNote.title" placeholder="请输入标题">
            </div>
            <div class="editor">
                <textarea v-show="true" :value="currentNote.content" placeholder="请输入内容，支持 Markdown 语法"></textarea>
                <div class="preview markdown-body" v-show="false"></div>
            </div>
		</div>
	</div>
</template>

<script>
import NoteSidebar from '@/components/NoteSidebar'
import Icon from '@/components/Icon'

export default {
	name: 'Notebook',
	components: {
		'g-icon': Icon,
		NoteSidebar
	},
	data() {
		return {
            currentNote: {},
            noteList: []
		}
	},
    created() {},
    beforeRouteUpdate(to, from, next) {
        this.currentNote = this.noteList.find(note => note.id === parseInt(to.query.noteID))
        next()
    }
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
		.note-detail-ct {
			height: 100%;
		}
		.note-empty {
			font-size: 40px;
			text-align: center;
			color: #ccc;
			margin-top: 100px;
		}
		.note-bar {
			display: flex;
            align-items: center;
			padding: 4px 20px;
			border-bottom: 1px solid #eee;
			p {
				font-size: 12px;
				color: #999;
				margin-right: 6px;
			}
            .operate {
                margin-left: auto;
                display: flex;
                align-items: center;
                .icon {
                    &:last-child {
                        margin-right: 20px;
                    }
                    margin-right: 10px;
                    font-size: 8px;
                    cursor: pointer;
                }
            }
			.save {
				margin-left: 4px;
				flex: 1;
			}
		}
		.note-title {
			input {
				display: inline-block;
				width: 100%;
				border: none;
				outline: none;
				font-size: 18px;
				padding: 10px 20px;
			}
		}
		.editor {
			position: relative;
			height: calc(100% - 70px);
			.preview,
			textarea {
				position: absolute;
				width: 100%;
				height: 100%;
				padding: 20px;
			}
			textarea {
				border: none;
				resize: none;
				outline: none;
				font-size: 14px;
				font-family: Monaco, courier, monospace;
			}
		}
	}
}
</style>