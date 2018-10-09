<template>
    <div>
        <search @refresh="refresh" @search="searchChange" placeholder="请输入要搜索的站点名称" :click-url="addUrl" :labels="labels" :is-add-btn="true" :search-url="searchUrl" my-key="siteName" name="站点"></search>
        <my-table
                :labels="labels" :delete-url="deleteUrl"
                name="站点" :btn-group="btnGroup"
                :random="random"    :update-url="updateUrl"
                :getTableDataUrl="getTableDataUrl" :search-val="search" search-label="siteName">
        </my-table>
    </div>
</template>

<script>
    import search from '../../components/search'
    import myTable from '../../components/table'

    export default {
        name: "MaSite",
        data() {
            return {
                searchUrl: '/site/after/queryBySiteName',
                getTableDataUrl: '/site/after/queryPage',
                addUrl: '/site/after/add',
                deleteUrl: '/site/after/delete',
                updateUrl: '/site/after/update',
                search: '',
                random: 0,
                labels: [
                    {name: 'id', label: '站点id'},
                    {name: 'siteName', label: '站点名称'},
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