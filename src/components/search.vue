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
            <el-button type="primary" icon="el-icon-circle-plus">添加商品</el-button>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "search",
        props: ['placeholder', 'searchUrl', 'myKey', 'isAddBtn', 'clickUrl', 'pageSize'],
        data() {
            return {
                search: '',
                tableData: null,
            }
        },
        methods: {
            querySearch(queryString, cb) {
                this.axios.get(this.searchUrl + '?username=' + queryString)
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
                // let params = {
                //     user: {
                //         username: this.search
                //     },
                //     myPage: {
                //         myPage: {
                //             currPage: 1,
                //             pageSize: this.pageSize
                //         }
                //     }
                // }
                // this.axios.get(this.clickUrl, this.getMethod, params)
            }
        }
    }
</script>

<style scoped>

</style>