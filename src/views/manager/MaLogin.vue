<template>
    <div class="login-all">
        <div class="login-from">
            <div class="login-title">
                <svg class="login-icon" aria-hidden="true">
                    <use xlink:href="#icon-huoche"></use>
                </svg>
            </div>
            <el-form :model="form" ref="loginForm" :rules="rules" label-position="top" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input placeholder="用户名" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-button style="width: 100%; margin-bottom: 10px" @click="login('loginForm')" type="primary">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MaLogin",
        data() {
            return {
                loginUrl: '/manager/login',
                form: {
                    username: null,
                    password: null
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: ['change', 'blur'] },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: ['change', 'blur'] },
                    ]
                }
            }
        },
        methods: {
            loginMethod(v) {
                this.$router.push({ path: '/maIndex' });
            },
            login(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$myPost(this.loginUrl, this.loginMethod, this.form)
                    } else {
                        this.$myMessage('部分内容填写不规范，请完善后再试', 'error')
                    }
                })
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