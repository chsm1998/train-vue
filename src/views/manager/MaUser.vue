<template>
    <div>
        <search placeholder="请输入要搜索的用户名" :is-add-btn="false" :search-url="searchUrl" my-key="username"></search>
    </div>
</template>

<script>
    import search from '../../components/search'

    export default {
        name: "MaUser",
        data() {
            return {
                searchUrl: '/user/after/queryByUsername'
            }
        },
        components: {
            'search': search
        }
    }
</script>

<style scoped>

</style>