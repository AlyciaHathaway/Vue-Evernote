<template>
	<div id="app">
		<sidebar></sidebar>
		<router-view></router-view>
	</div>
</template>

<script>
import sidebar from '@/components/Sidebar.vue'
import Auth from '@/apis/auth'

export default {
	name: 'App',
	components: {
		sidebar
	},
	created() {
        window.addEventListener('hashchange', () => {
            this.checkRouterAuth()
        })
	},
	methods: {
		checkRouterAuth() {
			Auth.getInfo().then(response => {
				if (!response.isLogin) {
					let { path } = this.$router.history.current
					if (path !== '/login') {
						this.$router.push({ path: '/login' })
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

html,
body,
#app {
	height: 100%;
}

body {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background-color: #eee;
	#app {
		display: flex;
		align-items: stretch;
		a {
			text-decoration: none;
			color: #444;
		}
		ul,
		li {
			list-style: none;
		}
	}
}
</style>
