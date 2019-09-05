<template>
    <div id="sidebar">
        <div class="icons">
            <router-link to="/notedetail/1"><g-icon class="icon" name="notedetail"></g-icon></router-link>
            <router-link to="/notedetail/1"><g-icon class="icon" name="notebook"></g-icon></router-link>
            <router-link to="/notedetail/1"><g-icon class="icon" name="trash"></g-icon></router-link>
        </div>
        <div class="logout" @click="onLogout">
            <g-icon class="icon" name="logout"></g-icon>
        </div>
    </div>
</template>

<script>
import Icon from '@/components/icon'
export default {
    name: 'Sidebar',
    components: {
        'g-icon': Icon
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
    #sidebar {
        position: relative;
        width: 56px;
        text-align: center;
        background-color: #2c333c;
        .icons {
            margin-top: 16px;
            a {
                display: block;
                padding: 6px 0;
            }
            .router-link-active {
                background-color: #5e6266;
            }
            .icon {
                color: #fff;
            }
        }
        .logout {
            position: absolute;
            bottom: 20px;
            width: 100%;
            text-align: center;
            cursor: pointer;
        }
    }
</style>