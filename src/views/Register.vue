<template>
    <div class="register-all">
        <div class="register-from">
            <div class="register-title">
                <svg class="register-icon" aria-hidden="true">
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
                <el-form-item label="真实姓名">
                    <el-input placeholder="真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input placeholder="身份证号"></el-input>
                </el-form-item>
                <el-button style="width: 100%; margin-bottom: 10px" type="danger">注册</el-button>
                <el-button style="width: 100%; margin-left: 0" @click="toLogin" type="primary">已注册？点此登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        methods: {
            toLogin() {
                this.$router.push({path: '/login'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .register-all {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        .register-from {
            width: 500px;
            border-radius: 20px;
            border: 1px solid #bbb;
            padding: 30px 50px;
        }
        .register-title {
            text-align: center;
        }
    }
    .register-icon {
        width: 100px;
        height: 100px;
    }
</style>