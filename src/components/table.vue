<template>
    <div>
        <el-row>
            <el-table :data="tableData" max-height="400" style="width: 100%">
                <el-table-column v-for="v in labels" align="center" :prop="v.name" :label="v.label">
                </el-table-column>
                <el-table-column width="200px" fixed="right" label="操作">
                    <template slot-scope="item">
                        <el-button-group>
                            <el-button v-if="btnGroup.show" size="mini" :title="'查看' + name" @click="showItem(item.row)" icon="el-icon-search"></el-button>
                            <el-button v-if="btnGroup.update" size="mini" :title="'修改' + name" @click="updateItem(item.row)" type="primary"
                                       icon="el-icon-edit"></el-button>
                            <el-button v-if="btnGroup.delete" size="mini" :title="'删除' + name" @click="deleteItem(item.row)" type="danger"
                                       icon="el-icon-delete"></el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="currPage" :page-sizes="pageSizes"
                               :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-row>
        <my-dialog @close="showClose" :labels="labels" :title="name" :item="item" :show="show"></my-dialog>
        <update-dialog @success="getTableData" @close="updateShowClose" :url="updateUrl" :labels="labels" :title="name" :item="item" :show="updateShow"></update-dialog>
    </div>
</template>

<script>
    import myDialog from './myDialog'
    import updateDialog from './updateDialog'

    export default {
        name: "my-table",
        props: ['name', 'labels', 'btnGroup', 'getTableDataUrl', 'searchVal', 'searchLabel', 'random', 'deleteUrl', 'updateUrl'],
        data() {
            return {
                pageSizes: [5, 10, 15, 20],
                currPage: 1,
                pageSize: 5,
                total: 0,
                tableData: null,
                show: false,
                updateShow: false,
                item: null,
            }
        },
        created() {
            this.getTableData()
        },
        watch: {
            searchVal: function (newVal, oldVal) {
                this.currPage = 1
                this.getTableData()
            },
            random: function (newVal, oldVal) {
                this.getTableData()
            }
        },
        methods: {
            showItem(v) {
                this.show = true
                this.item = v
            },
            showClose() {
                this.show = false
            },
            updateShowClose() {
                this.updateShow = false
            },
            updateItem(v) {
                this.updateShow = true
                this.item = v
            },
            deleteItem(v) {
                let params = {
                    params: {
                        id: v.id
                    }
                }
                this.$myDelete(this.deleteUrl, this.getTableData, params)
            },
            getMethod(v) {
                this.tableData = v.data.data.records
                this.total = v.data.data.total
            },
            getTableData() {
                let params = {
                    myPage: {
                        currPage: this.currPage,
                        pageSize: this.pageSize
                    }
                }
                params[this.searchLabel] = this.searchVal
                this.$myPost(this.getTableDataUrl, this.getMethod, params, false)
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.getTableData()
            },
            handleCurrentChange(val) {
                this.currPage = val
                this.getTableData()
            }
        },
        components: {
            myDialog: myDialog,
            updateDialog: updateDialog
        }
    }
</script>

<style lang="scss" scoped>
    .block {
        display: flex;
        justify-content: center;
    }
</style>