<template>
    <div class="main">

       会员中心
    </div>
</template>

<style src="./index.css" scoped></style>

<script>

    import mixins from '../../common/mixin';
    import Footer from '../../component/footer';

    export default {
        components: {
            'Footer': Footer
        },
        mixins: [mixins],
        data: () => ({

        }),
        created() {

        },
        methods: {
            // handleAddProblem: function () {
            //     this.$router.push({
            //         path: '/problem/index',
            //         query: {}
            //     });
            // }
        }
    }
</script>
