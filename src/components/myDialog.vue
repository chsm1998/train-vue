<template>
    <el-dialog :before-close="handleClose" :title="title + '信息'" :visible.sync="show" :center="true">
        <el-form v-if="item != null" inline class="demo-table-expand">
            <el-form-item v-for="v in labels" :label="v.label">
                <span>{{ item[v.name] }}</span>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    export default {
        name: "myDialog",
        // item：数据信息 其他属性同addDialog
        props: ['title', 'labels', 'item', 'show'],
        methods: {
            // 自实现dialog关闭，使用原生关闭方法将改变prop导致控制台报警告
            handleClose(done) {
                this.$emit('close')
            }
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