<template>
    <div>
        <search @refresh="refresh" @search="searchChange" placeholder="请输入要搜索的列车类型"
                :click-url="addUrl" :labels="labels" :is-add-btn="true"
                :search-url="searchUrl" my-key="trainType" name="类型"
                :batch="true" :batch-label="batchLabel">
        </search>
        <my-table
                :labels="labels" :delete-url="deleteUrl"
                name="类型" :btn-group="btnGroup"
                :random="random"    :update-url="updateUrl"
                :getTableDataUrl="getTableDataUrl" :search-val="search" search-label="trainType">
        </my-table>
    </div>
</template>

<script>
    import search from '../../components/search'
    import myTable from '../../components/table'

    export default {
        name: "MaTrainType",
        data() {
            return {
                searchUrl: '/trainType/after/queryByType',
                getTableDataUrl: '/trainType/after/queryPage',
                addUrl: '/trainType/after/addList',
                deleteUrl: '/trainType/after/delete',
                updateUrl: '/trainType/after/update',
                search: '',
                random: 0,
                batchLabel: [
                    {name: 'trainType', label: '列车类型'}
                ],
                labels: [
                    {name: 'id', label: '列车类型id'},
                    {name: 'trainType', label: '列车类型'},
                    {name: 'gmtCreate', label: '创建时间'},
                    {name: 'gmtModified', label: '修改时间'},
                ],
                obj: {

                },
                btnGroup: {
                    show: true,
                    update: true,
                    delete: true
                }
            }
        },
        methods: {
            searchChange(val) {
                this.search = val
            },
            refresh(val) {
                console.log(1)
                this.random = val
            }
        },
        components: {
            'search': search,
            'my-table': myTable,
        }
    }
</script>

<style scoped>

</style>