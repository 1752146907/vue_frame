<template>
    <div>
        <van-tabbar v-model="active" @change="handleTabbar">
            <van-tabbar-item icon="wap-home"
                             url="/home/index">首页</van-tabbar-item>
            <van-tabbar-item icon="chat"
                             info="3"
                             url="/chat/index">咨询</van-tabbar-item>
            <van-tabbar-item icon="contact"
                             url="/my/index">我的</van-tabbar-item>
        </van-tabbar>
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