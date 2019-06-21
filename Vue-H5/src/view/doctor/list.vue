<template>
    <div class="main">
        <div class="header-label">
            <div class="header-left" @click="handleIsShowOption">全国
                <span class="triangle_border_down"></span>
            </div>
            <div class="header-right" @click="handleIsShowOption">全部
                <span class="triangle_border_down rotate-180"></span>
            </div>
            <div class="header-label-option" v-show="isShow">
                <div class="header-label-option-left">
                    <div class="header-label-option-left-item-active">全国</div>
                    <div class="header-label-option-left-item">上海</div>
                    <div class="header-label-option-left-item">广东</div>
                    <div class="header-label-option-left-item">北京</div>
                    <div class="header-label-option-left-item">其他</div>
                    <div class="header-label-option-left-item">广东</div>
                    <div class="header-label-option-left-item">北京</div>
                    <div class="header-label-option-left-item">其他</div>
                </div>
                <div class="header-label-option-right">
                    <div class="header-label-option-right-item">全部</div>
                    <div class="header-label-option-right-item">儿科</div>
                    <div class="header-label-option-right-item">妇科</div>
                    <div class="header-label-option-right-item">保健科</div>
                </div>
            </div>
        </div>
        <div class="overlay"
             @click="handleClose"
             v-show="isShow"></div>
        <div class='body-content'>
            <div class="item-list">
                <div class="item"
                     @click="handleDetail">
                    <div class="item-left">
                        <img class="item-img"
                               src="http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg?imageView/1/w/1000/h/1000/q/80" />
                    </div>
                    <div class="item-right">
                        <div class="item-right-content">
                            <div class="item-right-content-top">
                                <span class="name">小钟</span>
                                <span class="department">吃货</span>
                                <span class="job">剁手大师</span>
                            </div>
                            <div class="hospital">
                                <span class="hospital-title">专业单身20年</span>
                            </div>
                            <div class="speciality">
                                <span class="speciality-desc">擅长：玩游戏</span>
                            </div>
                            <div class="label-cell">
                                <span class="label">大懒虫</span>
                                <span class="label">大懒虫</span>
                            </div>
                        </div>
                        <div class="item-right-charge">
                            <span class="charge-price">¥0.01</span>
                            <span class="pay-num">1002人购买</span>
                        </div>
                    </div>
                </div>
                <div class="item"
                     @click="handleDetail">
                    <div class="item-left">
                        <img class="item-img"
                             src="http://s.amazeui.org/media/i/demos/bw-2014-06-19.jpg?imageView/1/w/1000/h/1000/q/80" />
                    </div>
                    <div class="item-right">
                        <div class="item-right-content">
                            <div class="item-right-content-top">
                                <span class="name">某钟</span>
                                <span class="department">吃货</span>
                                <span class="job">剁手大师</span>
                            </div>
                            <div class="hospital">
                                <span class="hospital-title">专业单身20年</span>
                            </div>
                            <div class="speciality">
                                <span class="speciality-desc">擅长：玩游戏</span>
                            </div>
                            <div class="label-cell">
                                <span class="label">大懒虫</span>
                                <span class="label">大懒虫</span>
                            </div>
                        </div>
                        <div class="item-right-charge">
                            <span class="charge-price">¥0.01</span>
                            <span class="pay-num">1002人购买</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="./list.css" scoped></style>

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
