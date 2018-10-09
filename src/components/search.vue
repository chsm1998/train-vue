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
        props: ['placeholder', 'searchUrl', 'myKey', 'isAddBtn', 'clickUrl', 'pageSize', 'name', 'labels'],
        data() {
            return {
                search: '',
                tableData: null,
                show: false,
            }
        },
        methods: {
            querySearch(queryString, cb) {
                this.axios.get(this.searchUrl + '?' + this.myKey + '=' + queryString)
                    .then(res => {
                        if (res.data.status === 200) {
                            cb(res.data.data)
                        }
                    })
            },
            getMethod(v) {
                this.tableData = v.data.data
            },
            handleSelect() {
                this.$emit('search', this.search)
            },
            showAdd() {
                this.show = true
            },
            showClose() {
                this.show = false
            },
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