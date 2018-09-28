<template>
    <div class="register-all">
        <div class="register-from">
            <div class="register-title">
                <svg class="register-icon" aria-hidden="true">
                    <use xlink:href="#icon-huoche"></use>
                </svg>
            </div>
            <el-form :model="form" status-icon ref="form" :rules="rules" label-position="top" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input placeholder="用户名" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="name">
                    <el-input placeholder="真实姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="idCard">
                    <el-input placeholder="身份证号" v-model="form.idCard"></el-input>
                </el-form-item>
                <el-button style="width: 100%; margin-bottom: 10px" type="danger" @click="register('form')">注册</el-button>
                <el-button style="width: 100%; margin-left: 0" @click="toLogin" type="primary">已注册？点此登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            let checkUsername = (rule, value, callback) => {
                let params = {
                    username: value
                }
                this.axios.get(this.checkUsernameUrl, {
                    params: params
                }).then(res => {
                    if (res.data.status === 200) {
                        callback()
                    } else {
                        callback(new Error(res.data.msg))
                    }
                })
            };
            return {
                checkUsernameUrl: '/user/checkUsername',
                registerUrl: '/user/register',
                form: {
                    username: null,
                    password: null,
                    idCard: null,
                    name: null
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: ['change', 'blur'] },
                        { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: ['change', 'blur'] },
                        { validator: checkUsername, trigger: ['change', 'blur'] }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: ['change', 'blur'] },
                        { min: 8, max: 12, message: '长度在 8 到 12 个字符', trigger: ['change', 'blur'] }
                    ],
                    idCard: [
                        { required: true, message: '请输入身份证号', trigger: ['change', 'blur'] },
                        { pattern: '(^\\d{15}$)|(^\\d{18}$|^\\d{17}x$|^\\d{17}X$)' , message: '请输入正确的身份证号码', trigger: ['change', 'blur'] }
                    ],
                    name: [
                        { required: true, message: '请输入您的真实姓名', trigger: ['change', 'blur'] },
                        { pattern: '^[\u2E80-\u9FFF]{2,4}$' , message: '请输入您正确的真实姓名', trigger: ['change', 'blur'] }
                    ]
                }
            }
        },
        methods: {
            toLogin() {
                this.$router.push({path: '/login'})
            },
            toIndex() {
                this.$router.push({path: '/'})
            },
            registerMethod(v) {
                this.$root.$data.user = v.data.data
                this.toIndex()
            },
            register(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$myPut(this.registerUrl, this.registerMethod, this.form)
                    } else {
                        this.$myMessage('部分内容填写不规范，请完善后再试', 'error')
                    }
                })
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