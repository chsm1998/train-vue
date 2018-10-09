<template>
    <el-row>
        <el-col :offset="7" :span="7" class="search">
            <el-autocomplete @select="handleSelect" v-model="search" :select-when-unmatched="true" :value-key="myKey" :fetch-suggestions="querySearch"
                             prefix-icon="el-icon-search" :placeholder=placeholder clearable>
                <template slot="append">
                    <el-button @click="handleSelect" icon="el-icon-search">搜索</el-button>
                </template>
            </el-autocomplete>
        </el-col>
        <el-col v-if="isAddBtn" :offset="6" :span="4" class="add">
            <el-button @click="showAdd" type="primary" icon="el-icon-circle-plus">添加{{name}}</el-button>
        </el-col>
        <add-dialog @success="success" v-if="isAddBtn" @close="showClose" :url="clickUrl" :labels="labels" :title="name" :show="show"></add-dialog>
    </el-row>
</template>

<script>
    import addDialog from './addDialog'

    export default {
        name: "search",
        /**
         * searchUrl：el-autocomplete的fetch-suggestions回调url
         * myKey：搜索属性的key
         * isAddBtn： 是否显示添加按钮
         * clickUrl： 添加表单提交url
         * name: 模块名称
         * labels: table中的labels
         */
        props: ['placeholder', 'searchUrl', 'myKey', 'isAddBtn', 'clickUrl', 'name', 'labels'],
        data() {
            return {
                // 搜索框的值
                search: '',
                // 添加按钮的显示与隐藏
                show: false,
            }
        },
        methods: {
            // fetch-suggestions回调
            querySearch(queryString, cb) {
                this.axios.get(this.searchUrl + '?' + this.myKey + '=' + queryString)
                    .then(res => {
                        if (res.data.status === 200) {
                            cb(res.data.data)
                        }
                    })
            },
            // 搜索事件回调，交由父组件处理，最终会由table处理
            handleSelect() {
                this.$emit('search', this.search)
            },
            showAdd() {
                this.show = true
            },
            showClose() {
                this.show = false
            },
            // 添加成功回调，刷新表格数据
            success() {
                this.$emit('refresh', Math.random())
            }
        },
        components: {
            addDialog: addDialog,
        }
    }
</script>

<style scoped>

</style>