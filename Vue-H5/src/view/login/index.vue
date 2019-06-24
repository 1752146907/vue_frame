<template>
    <div>登陆</div>
</template>

<style src="./index.css" scoped></style>

<script>

    import mixins from '../../common/mixin';

    export default {
        components: {},
        mixins: [mixins],
        data: () => ({}),
        created() {

        },
        methods: {
            handleDetail: function () {
                this.$router.push({
                    path: '/my/detail',
                    query: {}
                });
            },
            handleAdd: function () {
                this.$router.push({
                    path: '/archives/add',
                    query: {}
                });
            }
        }
    }
</script>
