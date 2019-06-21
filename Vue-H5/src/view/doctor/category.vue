<template>
    <div class="main">
        <div class="title">按科室找医生</div>
        <van-row>
            <van-col span="8"
                     v-for="item in 6"
                     :key="item">
                <div class="category-item"
                     @click="handleDetail">
                    <img class="category-item-img"
                         src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2532657003,833546719&fm=26&gp=0.jpg"
                         alt="" />
                    科室{{item}}
                </div>
            </van-col>
        </van-row>
    </div>
</template>

<style src="./category.css" scoped></style>

<script>

    import mixins from '../../common/mixin';

    export default {
        components: {},
        mixins: [mixins],
        data: () => ({
            active: 1,
            isShow: false
        }),
        created() {

        },
        methods: {
            handleIsShowOption: function () {
                this.isShow = true;
            },
            handleClose: function () {
                this.isShow = false;
            },
            handleDetail: function () {
                this.$router.push({
                    path: '/doctor/detail',
                    query: {}
                });
            },
            handleDel() {
                console.log("00000");
            }
        }
    }
</script>