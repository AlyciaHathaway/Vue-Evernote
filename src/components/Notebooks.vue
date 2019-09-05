<template>
    <div id="notebooks">
        <h1>{{message}}</h1>
        <ul>
            <li><router-link to="/notedetail/1">笔记本1</router-link></li>
            <li><router-link to="/notedetail/2">笔记本2</router-link></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Notebooks',
    data() {
        return {
            message: '笔记本列表'
        }
    }
}
</script>

<style lang="scss" scoped>
    #notebooks {
        h1 {
            color: red;
        }
    }
</style>