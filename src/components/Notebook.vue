<template>
	<div class="detail" id="notebook">
		<header>
            <a href="#" class="button">新建笔记</a>
        </header>
        <main>
            <div class="layout">
                <h2>笔记列表(10)</h2>
                <div class="note-list">
                    <a href="#" class="note">
                        <div class="title">
                            <g-icon class="icon" name="notedetail"></g-icon>
                            <p>标题</p>
                        </div>
                        <div class="operation">
                            <p>编辑</p>
                            <p>删除</p>
                            <p>3天前</p>
                        </div>
                    </a>
                </div>
            </div>
        </main>
	</div>
</template>

<script>
import icon from '@/components/Icon'
import Auth from '@/apis/auth'

export default {
    name: 'Notebook',
    components: {
        'g-icon': icon
    },
	data() {
		return {
			message: '笔记本列表'
		}
	},
	created() {}
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