<template>
    <div id="trash">
        <h1>{{message}}</h1>
    </div>
</template>

<script>
import Bus from '@/helpers/eventBus'
export default {
    name: 'Trash',
    data() {
        return {
            message: '回收站'
        }
    },
    created() {
        Bus.$emit('checkRouterAuth')
    }
}
</script>