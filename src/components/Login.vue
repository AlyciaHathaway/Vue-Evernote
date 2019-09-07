<template>
	<div id="login">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<div class="main"></div>
					<div class="form">
                        <h3 @click="toggleForm">创建账户</h3>
						<h3 :class="{show: !isShowLogin}" @click="toggleForm">登录</h3>
                        <div :class="{show: !isShowLogin}" class="login">
                            <input type="text" @keyup.enter="submit" v-model="form.username" placeholder="请输入用户名" />
                            <input type="password" @keyup.enter="submit" v-model="form.password" placeholder="密码" />
                            <p :class="{error: form.isError}">{{form.notice}}</p>
                            <div class="button" v-if="!isShowLogin" @click="submit">创建账号</div>
                            <div class="button" v-if="isShowLogin" @click="submit">登录</div>
                        </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Auth from '@/apis/auth'
import Bus from '@/helpers/eventBus'

Auth.getInfo()
    .then(data => {
        console.log(data)
    })

export default {
	name: 'Login',
	data() {
		return {
			isShowLogin: true,
			form: {
				username: '',
				password: '',
				notice: '请输入用户名和密码',
				isError: false
			}
		}
	},
	methods: {
        toggleForm() {
            this.isShowLogin = !this.isShowLogin
            this.form = {
                username: '',
				password: '',
				notice: '请输入用户名和密码',
				isError: false
            }
        },
        getAPI() {
            let data = {
                username: this.form.username,
                password: this.form.password
            }
            if (this.isShowLogin) {
                return Auth.login(data)
            }else {
                return Auth.register(data)
            }
        },
		submit() {
			if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.form.username)) {
				this.form.isError = true
				this.form.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
				return
			}
			if (!/^.{6,16}$/.test(this.form.password)) {
				this.form.isError = true
				this.form.notice = '密码长度为6~16个字符'
				return
			}
            
            this.getAPI().then(data => {
                this.form.isError = false
                this.form.notice = ''
                Bus.$emit('userInfo', {username: this.form.username})
                this.$router.push({path: 'notebook'})
            }).catch(error => {
                this.form.isError = true
			    this.form.notice = error.msg
            })
		}
	}
}
</script>

<style lang="scss">
.modal-mask {
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	display: table;
	transition: opacity 0.3s ease;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	width: 800px;
	height: 500px;
	margin: 0px auto;
	background-color: #fff;
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;
	font-family: Helvetica, Arial, sans-serif;
	display: flex;

	.main {
		flex: 1;
		background: #36bc64 url('../assets/login.jpg') center center no-repeat;
		background-size: contain;
	}
	.form {
        position: relative;
		width: 270px;
		border-left: 1px solid #ccc;
        overflow: hidden;
		h3 {
            width: 100%;
			padding: 10px 20px;
            margin-top: -1px;
			font-weight: normal;
			font-size: 16px;
			border-top: 1px solid #eee;
			cursor: pointer;
            transition: all .3s;
			&:nth-of-type(2) {
				border-bottom: 1px solid #eee;
			}
            &.show {
                transform: translateY(193px);
            }
		}

		.login {
			padding: 0 20px;
			border-top: 1px solid #eee;
            height: 193px;
            overflow: hidden;
            transition: all .5s;
            &.show {
                transform: translateY(-43px);
            }
			input {
				display: block;
				width: 100%;
				height: 35px;
				line-height: 35px;
				padding: 0 6px;
				border-radius: 4px;
				border: 1px solid #ccc;
				outline: none;
				font-size: 14px;
				margin-top: 10px;
			}
			input:focus {
				border: 3px solid #9dcaf8;
			}

			p {
				font-size: 12px;
				margin-top: 10px;
				color: #444;
			}
			.error {
				color: red;
			}
            .button {
                background-color: #2bb964;
                height: 36px;
                line-height: 36px;
                text-align: center;
                font-weight: bold;
                color: #fff;
                border-radius: 4px;
                margin-top: 18px;
                cursor: pointer;
            }
		}
	}
}
</style>