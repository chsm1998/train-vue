<template>
    <div class="login-all">
        <div class="login-from">
            <div class="login-title">
                <svg class="login-icon" aria-hidden="true">
                    <use xlink:href="#icon-huoche"></use>
                </svg>
            </div>
            <el-form label-position="top" label-width="80px">
                <el-form-item label="用户名">
                    <el-input placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input placeholder="密码"></el-input>
                </el-form-item>
                <el-button style="width: 100%; margin-bottom: 10px" type="primary">登录</el-button>
                <el-button style="width: 100%; margin-left: 0" @click="toRegister" type="danger">还未注册？点此注册</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        methods: {
            toRegister() {
                this.$router.push({path: '/register'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login-all {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        .login-from {
            width: 500px;
            border-radius: 20px;
            border: 1px solid #bbb;
            padding: 30px 50px;
        }
        .login-title {
            text-align: center;
        }
    }
    .login-icon {
        width: 100px;
        height: 100px;
    }
</style>