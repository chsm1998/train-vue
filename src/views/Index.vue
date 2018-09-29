<template>
    <div class="index-all">
        <div class="head">
            <div class="w login-group">
                <div class="login">
                    <template v-if="$root.$data.user == null">
                        <router-link to="login">登录</router-link>
                        <router-link to="register">注册</router-link>
                    </template>
                    <template v-else>
                        <a href="#">{{$root.$data.user.name}}</a>
                        <a href="#" @click="exitLogin">退出登录</a>
                    </template>
                </div>
                <a href="#" class="login">我的订单</a>
                <router-link to="maIndex" target="_blank">后台管理</router-link>
            </div>
        </div>
        <div class="logo">
            <div class="w logo-all">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-huoche"></use>
                </svg>
                <div class="title">
                    TWO_TRAIN
                </div>
            </div>
        </div>
        <div class="index-content">
            <el-form label-position="top" label-width="80px">
                <el-form-item label="出发城市">
                    <el-input placeholder="出发城市"></el-input>
                </el-form-item>
                <el-form-item label="到达城市">
                    <el-input placeholder="到达城市"></el-input>
                </el-form-item>
                <el-form-item label="出发日期">
                    <el-input placeholder="出发日期"></el-input>
                </el-form-item>
                <el-button style="width: 100%" type="warning" icon="el-icon-search">查询</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                getUserUrl: '/user/getLoginUser',
                exitLoginUrl: '/user/exitLogin',
            }
        },
        created() {
            this.getUser()
        },
        methods: {
            getUser() {
                this.axios.get(this.getUserUrl)
                    .then(res => {
                        if (res.data.status === 200) {
                            this.$root.$data.user = res.data.data
                        }
                    })
            },
            exitLogin() {
                this.$myGet(this.exitLoginUrl)
                this.$root.$data.user = null
                return false
            }
        }
    }
</script>

<style lang="scss" scoped>
    $head-height: 30px;
    $font-size: 12px;
    $all-width: 1000px;
    $bgc: #f3f5f7;
    $main-color: #f39b03;
    $border-color: #bbb;

    .w {
        width: $all-width;
        margin: 0 auto;
    }

    a {
        color: #777;
        text-decoration: none;
    }

    .index-all {
        background-color: $bgc;
        height: 100vh;
    }

    .icon {
        width: 100px;
        height: 100px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

    .head {
        font-size: $font-size;
        height: $head-height;
        background-color: $bgc;
        line-height: $head-height;
        border-bottom: 1px solid $border-color;
    }

    .logo {
        background-color: #fff;
        .logo-all {
            display: flex;
            justify-content: center;
            align-items: center;
            .title {
                font-style: italic;
                font-size: 30px;
                font-weight: bold;
                color: #666;
                text-shadow: -5px 5px 0 rgba(0,0,0,.1);
            }
        }
    }

    .login-group {
        display: flex;
        justify-content: flex-end;
        a {
            margin-right: 20px;
        }
        a:hover {
            color: $main-color;
        }
    }

    .index-content {
        width: 500px;
        background-color: #fff;
        padding: 20px 40px;
        margin: 50px auto 0;
        border-radius: 20px;
        border: 1px solid $border-color;
    }
</style>