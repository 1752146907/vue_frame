<template>
    <div class="main">

        <img src="./image/author.jpeg" alt="头像"/>
        首页

        <Footer :active="0" />
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
