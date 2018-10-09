<template>
    <el-dialog :before-close="handleClose" :title="'添加' + title + '信息'" :visible.sync="show" :center="true">
        <el-form :model="formData" status-icon ref="formData" label-width="100px">
            <el-form-item v-for="v in titles" :key="v.name" :label="v.label" :prop="v.name">
                <el-input v-if="!batch" v-model="formData[v.name]"></el-input>
                <el-input v-else v-model="formData.list[0][v.name]"></el-input>
            </el-form-item>
            <template v-if="batch" v-for="i in len">
                <el-form-item v-for="v in batchLabel" :label="v.label">
                    <el-input v-model="formData.list[i][v.name]"></el-input>
                </el-form-item>
            </template>
            <el-form-item v-if="batch" label="新增数量">
                <el-input-number :min="0" v-model="num"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('formData')">添加</el-button>
                <el-button @click="resetForm('formData')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    export default {
        name: "addDialog",
        /**
         * title: 模块名称
         * labels：同table.vue
         * show: 控制dialog的显示与隐藏
         * url: 表单提交的url
         * batch: 开启批量更新
         * batchLabel: 批量更新key
         */
        props: ['title', 'labels', 'show', 'url', 'batch', 'batchLabel'],
        data() {
            return {
                // 需要过滤的字段
                filterList: ['id', 'gmtCreate', 'gmtModified'],
                // 过滤完成的字段
                titles: [],
                // 表单数据
                formData: {},
                // 新增数量
                num: 0,
                // 新增长度与num保持一致但在num后渲染，若不与num分开将会导致还没watch就开始渲染导致渲染失败
                len: 0
            }
        },
        created() {
            // 过滤无用属性
            this.filterLabels()
            // 判断是可以批量提交
            if (this.batch) {
                this.formData.list = [{}]
            }
        },
        watch: {
            num(newVal, oldVal) {
                this.updateLen(newVal)
            }
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
            updateLen(newVal) {
                // 获取真实数量
                let len = newVal - this.formData.list.length + 1
                if (len > 0) {
                    // 新增列表
                    for (let i = 0; i < len; i++) {
                        this.formData.list.push({})
                    }
                } else {
                    // 删除列表
                    for (let i = 0; i < Math.abs(len); i++) {
                        this.formData.list.pop()
                    }
                }
                // 更新长度
                this.len = newVal
            },
            resetFormData() {
                this.formData = {}
            },
            addMethod() {
                this.updateLen(0)
                this.$emit('close')
                this.$emit('success')
                this.formData = {}
                if (this.batch) {
                    this.formData.list = [{}]
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$myPost(this.url, this.addMethod, this.formData.list)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }
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