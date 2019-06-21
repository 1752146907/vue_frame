<template>
    <div>
        脚步组件
    </div>
</template>

<style>
    .van-tabbar-item--active{
        color: #b20004 !important;
    }
</style>

<script>

    export default {
        components: {

        },
        props: {
            active: {
                type: Number,
                required: true
            }
        },
        data: () => ({

        }),
        created () {

        },
        methods: {
            handleTabbar: function () {
                // if(this.active == 0){
                //     this.$router.push({
                //         path: '/home/index/'
                //     });
                // }
                // if(this.active == 1){
                //     this.$router.push({
                //         path: '/chat/index/'
                //     });
                // }
                // if(this.active == 2){
                //     this.$router.push({
                //         path: '/my/index/'
                //     });
                // }
            }
        }
    }
</script>