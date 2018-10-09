<template>
    <el-container style="height: 700px; border: 1px solid #eee">
        <el-header style="text-align: right; font-size: 12px">
            <span v-if="manager != null">{{ manager.username }}</span>
            <el-dropdown @command="command">
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="exit">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-container>
            <el-aside width="200px" style="height: 640px;background-color: rgb(238, 241, 246)">
                <el-menu :router=true :unique-opened=true>
                    <el-menu-item index="/maUser">用户管理</el-menu-item>
                    <el-menu-item index="/maSite">站点管理</el-menu-item>
                    <el-menu-item index="/maTrainType">站点管理</el-menu-item>
                    <el-menu-item index="/category">列车管理</el-menu-item>
                    <el-menu-item index="/maOrder">订单管理</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main style="height: 640px">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "MaIndex",
        data() {
            return {
                manager: null,
            }
        },
        created() {
            this.getManager()
        },
        methods: {
            exit: function () {

            },
            getManager: function () {
                this.axios.get('/manager/after/getLogin')
                    .then(res => {
                        this.manager = res.data.data
                    })
            },
            command: function () {

            }
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
        padding-left: 0;
    }

    .el-aside {
        color: #333;
    }
</style>