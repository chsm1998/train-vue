<template>
    <el-dialog :before-close="handleClose" :title="'修改' + title + '信息'" :visible.sync="show" :center="true">
        <el-form v-if="item != null" :model="formData" status-icon ref="formData" label-width="100px">
            <el-form-item v-for="v in titles" :label="v.label" :prop="v.name">
                <el-input v-model="formData[v.name]"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('formData')">修改</el-button>
                <el-button @click="resetForm('formData')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    export default {
        name: "updateDialog",
        // 同addDialog和myDialog
        props: ['title', 'labels', 'item', 'show', 'url'],
        data() {
            return {
                filterList: ['id', 'gmtCreate', 'gmtModified'],
                titles: [],
                formData: {},
            }
        },
        watch: {
            // 将数据与组件data绑定，子组件不应改变prop
            item(newVal, oldVal) {
                this.formData = newVal
            }
        },
        created() {
            this.filterLabels()
        },
        methods: {
            // 自实现dialog关闭，使用原生关闭方法将改变prop导致控制台报警告
            handleClose(done) {
                this.$emit('close')
            },
            filterLabels() {
                this.labels.forEach(v => {
                    if (this.filterList.indexOf(v.name) === -1) {
                        this.titles.push(v)
                    }
                })
            },
            updateMethod() {
                this.$emit('close')
                this.$emit('success')
                this.formData = {}
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.formData.gmtCreate = null
                        this.formData.gmtModified = null
                        this.$myPut(this.url, this.updateMethod, this.formData)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
    }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>