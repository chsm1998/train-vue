<template>
    <div>
        <search @search="searchChange" placeholder="请输入要搜索的用户名" :is-add-btn="false" :search-url="searchUrl" my-key="username"></search>
        <my-table
                :labels="labels"
                name="用户" :btn-group="btnGroup"
                :getTableDataUrl="getTableDataUrl" :search-val="search">
        </my-table>
    </div>
</template>

<script>
    import search from '../../components/search'
    import myTable from '../../components/table'

    export default {
        name: "MaUser",
        data() {
            return {
                searchUrl: '/user/after/queryByUsername',
                getTableDataUrl: '/user/after/queryPage',
                search: '',
                labels: [
                    {name: 'id', label: '用户id'},
                    {name: 'username', label: '用户名'},
                    {name: 'name', label: '真实姓名'},
                    {name: 'idCard', label: '身份证号'}
                ],
                btnGroup: {
                    show: true,
                    update: false,
                    delete: false
                }
            }
        },
        methods: {
            searchChange(val) {
                this.search = val
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