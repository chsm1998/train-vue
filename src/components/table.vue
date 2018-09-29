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
    </div>
</template>

<script>
    import myDialog from './myDialog'

    export default {
        name: "my-table",
        props: ['name', 'labels', 'btnGroup', 'getTableDataUrl', 'searchVal'],
        data() {
            return {
                pageSizes: [5, 10, 15, 20],
                currPage: 1,
                pageSize: 5,
                total: 0,
                tableData: null,
                show: false,
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
            updateItem() {

            },
            deleteItem() {

            },
            getMethod(v) {
                this.tableData = v.data.data.records
                this.total = v.data.data.total
            },
            getTableData() {
                let params = {
                    username: this.searchVal,
                    myPage: {
                        currPage: this.currPage,
                        pageSize: this.pageSize
                    }
                }
                this.$myPost(this.getTableDataUrl, this.getMethod, params)
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
            myDialog: myDialog
        }
    }
</script>

<style lang="scss" scoped>
    .block {
        display: flex;
        justify-content: center;
    }
</style>